import React from 'react';
import { motion } from 'motion/react';
import { Target, MessageSquare, Megaphone, Smartphone, Cpu, Box, Rocket } from 'lucide-react';

const resources = [
  { 
    title: 'Tráfego Pago', 
    desc: 'Investimento pesado em anúncios no Meta Ads e Google Ads para trazer interessados qualificados 24h por dia.',
    icon: Megaphone,
    color: 'bg-blue-500'
  },
  { 
    title: 'Anúncios Criativos', 
    desc: 'Peças publicitárias de alto impacto visual e copywriting persuasivo testadas para converter.',
    icon: Target,
    color: 'bg-brand-red'
  },
  { 
    title: 'Captura de Leads', 
    desc: 'LPDs (Landing Pages de Diferenciação) e integrações diretas que garantem dados precisos dos clientes.',
    icon: Smartphone,
    color: 'bg-green-500'
  },
  { 
    title: 'CRM Inteligente', 
    desc: 'Gestão completa do funil de vendas com lembretes, histórico e automação de mensagens.',
    icon: Cpu,
    color: 'bg-purple-500'
  },
  { 
    title: 'Distribuição Inteligente', 
    desc: 'Algoritmo que direciona o lead certo para o vendedor com melhor performance na região.',
    icon: Box,
    color: 'bg-orange-500'
  },
  { 
    title: 'App RafaCar Elite', 
    desc: 'Versão mobile completa para Android disponível via APK. Acesse de qualquer lugar com as notificações ativas.',
    icon: Rocket,
    color: 'bg-brand-red'
  }
];

export default function ResourceCenter() {
  return (
    <div className="space-y-12">
       <div>
        <h3 className="font-display text-4xl uppercase text-white mb-2 underline decoration-brand-red decoration-4 transition-all tracking-tighter">O QUE <span className="red-text">FORNECEMOS</span></h3>
        <p className="text-xs text-white/40 tracking-widest uppercase">Tecnologia e estratégia a serviço do seu resultado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-12 relative overflow-hidden bg-brand-red/5 border-brand-red/20 group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Rocket size={120} />
          </div>
          
          <div className="max-w-md relative z-10">
            <h4 className="font-display text-5xl text-white italic mb-6 leading-none">MAESTRIA EM <span className="red-text font-black">RESULTADOS</span></h4>
            <p className="text-sm text-white/60 leading-relaxed mb-8 font-body">
              Na RafaCar, você não é apenas um vendedor. Você é um gestor de negócios alimentado pela melhor infraestrutura do mercado automotivo. Reduzimos seu custo de aquisição e aumentamos sua conversão através de processos validados.
            </p>
            <div className="flex gap-4">
              <div className="px-6 py-2 bg-white/10 rounded-full text-[10px] text-white uppercase tracking-widest border border-white/10">ESCABILIDADE</div>
              <div className="px-6 py-2 bg-white/10 rounded-full text-[10px] text-white uppercase tracking-widest border border-white/10">TECNOLOGIA</div>
            </div>
          </div>
        </div>

        {resources.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 border-white/5 hover:border-brand-red/30 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color}/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform mb-6 border border-white/5 shadow-xl`}>
              <item.icon size={26} />
            </div>
            <h5 className="font-display text-2xl text-white italic mb-4">{item.title}</h5>
            <p className="text-sm text-white/40 leading-relaxed font-body">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-10 rounded-3xl bg-white text-matte-black flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-2">
            <h4 className="font-display text-3xl font-black uppercase tracking-tighter italic">Quer escalar sua autoridade?</h4>
            <p className="text-sm font-medium opacity-60">Fale com nosso time de tráfego para campanhas personalizadas na sua região.</p>
         </div>
         <button className="px-10 py-5 bg-brand-red text-white font-display text-sm tracking-[0.2em] font-black uppercase hover:bg-black transition-all rounded-full shadow-2xl">
            SOLICITAR CONSULTORIA
         </button>
      </div>
    </div>
  );
}
