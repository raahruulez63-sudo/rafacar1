import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import cron from "node-cron";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory cache for inventory to ensure immediate availability and resilience
let cachedInventory: any[] = [];

// Helper to scrape a single site (Generic pattern)
async function scrapeSite(url: string, selectors: any) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    $(selectors.container).each((i, el) => {
      if (i > 20) return; // Limit per site to avoid massive data in memory
      
      const title = $(el).find(selectors.title).text().trim();
      let priceText = $(el).find(selectors.price).text().trim().replace(/[^0-9]/g, '');
      const price = parseInt(priceText) || 0;
      const image = $(el).find(selectors.image).attr('src') || $(el).find(selectors.image).attr('data-src');
      const year = $(el).find(selectors.year).text().trim();
      const km = $(el).find(selectors.km).text().trim();
      const brand = title.split(' ')[0];

      if (title && price > 0) {
        results.push({
          id: Buffer.from(title + price).toString('base64').slice(0, 12),
          title,
          price: price + 2000, // markup added as requested
          image: image?.startsWith('http') ? image : new URL(image || '', url).href,
          brand,
          year,
          km,
          updatedAt: Date.now()
        });
      }
    });
    return results;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}

async function refreshInventory() {
  console.log("Starting daily inventory sync...");
  const sites = [
    {
      url: "https://malentachiveiculos.com.br/Veiculos",
      selectors: {
        container: ".card-veiculo",
        title: ".titulo-veiculo",
        price: ".preco-veiculo",
        image: "img",
        year: ".ano-veiculo",
        km: ".km-veiculo"
      }
    },
    {
      url: "https://www.veiculosviaauto.com.br/Anuncio/Busca",
      selectors: {
        container: ".card",
        title: ".card-title",
        price: ".card-price",
        image: "img.card-img-top",
        year: ".card-text span:first",
        km: ".card-text span:last"
      }
    },
    {
      url: "https://www.quintamarchaveiculos.com.br/Veiculos",
      selectors: {
        container: ".veiculo-item",
        title: ".veiculo-titulo",
        price: ".veiculo-valor",
        image: "img",
        year: ".veiculo-ano",
        km: ".veiculo-km"
      }
    },
    {
      url: "https://mugcar.com.br/Veiculos",
      selectors: {
        container: ".box-item",
        title: ".title",
        price: ".price",
        image: ".img-responsive",
        year: ".year",
        km: ".km"
      }
    }
  ];

  let totalInventory: any[] = [];
  for (const site of sites) {
    const siteData = await scrapeSite(site.url, site.selectors);
    totalInventory = [...totalInventory, ...siteData];
  }

  if (totalInventory.length > 0) {
    cachedInventory = totalInventory;
    console.log(`Sync complete! Total vehicles: ${cachedInventory.length}`);
  }
}

// Schedule: 12:00 AM Daily
cron.schedule('0 0 * * *', () => {
  refreshInventory();
});

// Run immediate sync on start
refreshInventory();

// Gemini AI setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API: Suggest responses for a lead
app.post("/api/suggest-responses", async (req, res) => {
  const { leadName, context, lastNote, stage } = req.body;

  try {
    const prompt = `Você é um assistente de vendas de alto nível da RafaCar Motors. 
    Seu objetivo é ajudar o vendedor a converter um lead chamado ${leadName}.
    
    Contexto do Lead: ${context || 'Novo lead do programa Elite'}
    Fase atual do funil: ${stage}
    Última observação: ${lastNote || 'Nenhuma'}
    
    Gere 3 alternativas de resposta curtas e persuasivas (máximo 300 caracteres cada) para o WhatsApp:
    1. Amigável e consultiva.
    2. Focada em urgência/escassez.
    3. Treinada para quebrar objeção (foque em segurança e valor patrimonial).
    
    Retorne apenas um objeto JSON com as chaves "suggested": string[].`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const text = result.text;
    res.json(JSON.parse(text || '{"suggested": []}'));
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Falha ao gerar sugestões da IA" });
  }
});

// Webhook simulation for FB/IG/WA Leads (Internal placeholder)
app.post("/api/webhooks/leads", async (req, res) => {
  console.log("Receiving lead via webhook:", req.body);
  // This would typically save to Firestore
  res.json({ status: "success", message: "Webhook received" });
});

// Inventory Scraper Endpoint
app.get("/api/inventory", async (req, res) => {
  try {
    // If cache is empty, trigger a quick refresh (though startServer already triggers one)
    if (cachedInventory.length === 0) {
      await refreshInventory();
    }
    
    res.json(cachedInventory);
  } catch (error) {
    console.error("Endpoint Error:", error);
    res.status(500).json({ error: "Falha ao disponibilizar estoque" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
