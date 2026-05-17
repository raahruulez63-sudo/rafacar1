import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Car, Zap, DollarSign, Key, Repeat, ArrowRight, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Vehicle } from '../../types';

const BRANDS = ['Fiat', 'Volkswagen', 'Chevrolet', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'Renault', 'Jeep', 'BMW', 'Mercedes'];

export default function InventoryView() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [tab, setTab] = useState<'inventory' | 'consign' | 'refinance' | 'referral'>('inventory');
  const [lastSync, setLastSync] = useState<number | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setVehicles(data);
      if (data.length > 0) {
        setLastSync(data[0].updatedAt);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'Todas' || v.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="space-y-12">
      {/* Header Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-white/5 pb-4">
        {[
          { id: 'inventory', label: 'Veículos COM garantia', icon: Car },
          { id: 'consign', label: 'Consignação', icon: DollarSign },
          { id: 'refinance', label: 'Refinanciamento', icon: Repeat },
          { id: 'referral', label: 'Indique e Ganhe', icon: Key }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              "px-6 py-3 rounded-xl font-display text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 border",
              tab === t.id 
                ? "bg-brand-red text-white border-brand-red" 
                : "bg-white/5 text-white/40 border-transparent hover:border-white/10 hover:bg-white/10"
            )}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'inventory' && (
        <div className="space-y-8">
          {/* Main Banner */}
          <div className="p-8 rounded-3xl bg-brand-red text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
              <Zap size={120} />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="font-display text-4xl sm:text-5xl font-black uppercase italic leading-none mb-4">
                VENDEMOS SEU VEÍCULO EM 7 DIAS <span className="text-black/50">OU COMPRAMOS PELO VALOR COMBINADO</span>
              </h3>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest">
                Infraestrutura completa RafaCar para liquidez imediata.
              </p>
              {lastSync && (
                <p className="text-[10px] mt-4 opacity-40 uppercase tracking-widest font-mono">
                  Sincronizado em: {new Date(lastSync).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Pesquise por modelo ou nome..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-brand-red outline-none transition-all placeholder:text-white/20"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <select 
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white appearance-none outline-none focus:border-brand-red transition-all"
              >
                <option value="Todas" className="bg-matte-black">Todas as Marcas</option>
                {BRANDS.map(b => (
                  <option key={b} value={b} className="bg-matte-black">{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
              <p className="font-display text-xs text-white/40 uppercase tracking-widest">Sincronizando Estoque Multi-Lojas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card group overflow-hidden border-white/5 hover:border-brand-red/30 transition-all flex flex-col"
                >
                  <div className="aspect-[4/3] bg-matte-black overflow-hidden relative">
                    <img 
                      src={v.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80'} 
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-brand-red/90 text-white text-[10px] font-black uppercase italic rounded-md">
                      COM GARANTIA
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-4">
                      <p className="text-[10px] text-brand-red font-display uppercase tracking-widest mb-1">{v.brand || 'MULTI-MARCAS'}</p>
                      <h4 className="font-display text-lg text-white italic leading-tight mb-2 group-hover:text-brand-red transition-colors">{v.title}</h4>
                      <div className="flex gap-3 text-[10px] text-white/30 uppercase tracking-widest font-body">
                        <span>{v.year || '--/--'}</span>
                        <span>•</span>
                        <span>{v.km || '--'} KM</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Preço Elite</p>
                        <p className="text-xl font-display text-white italic font-black">R$ {v.price.toLocaleString()}</p>
                      </div>
                      <button className="p-3 bg-white/5 hover:bg-brand-red text-white rounded-xl transition-all group-hover:shadow-[0_0_15px_rgba(227,27,35,0.2)]">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Repasse info */}
          <div className="p-8 glass-card border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h5 className="font-display text-2xl text-white italic">OPÇÕES DE <span className="red-text">REPASSE</span>?</h5>
              <p className="text-sm text-white/40">Consulte um especialista de vendas RafaCar para condições exclusivas de repasse.</p>
            </div>
            <button className="px-8 py-3 bg-white text-matte-black font-display text-[10px] tracking-widest font-black uppercase hover:bg-brand-red hover:text-white transition-all flex items-center gap-2 rounded-full">
              <Phone size={14} /> FALAR COM ESPECIALISTA
            </button>
          </div>
        </div>
      )}

      {tab === 'consign' && (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
           <div className="text-center space-y-4">
              <h3 className="font-display text-5xl text-white italic uppercase leading-none">Venda seu carro no <span className="red-text">Método Consignação</span></h3>
              <p className="text-white/40 max-w-2xl mx-auto">Deixe seu carro com quem entende. Usamos nossa estrutura de marketing e universidade de vendas para vender seu veículo rápido e pelo melhor preço.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Vistoria 360', desc: 'Avaliamos 250 pontos do seu veículo para garantir procedência.' },
                { title: 'Tráfego Elite', desc: 'Investimos R$ 2.000 em anúncios exclusivos para o seu carro.' },
                { title: 'Crédito Garantido', desc: 'Facilitamos a compra para o novo dono com nossas linhas de crédito.' }
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 border-white/5">
                   <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                      {i + 1}
                   </div>
                   <h4 className="font-display text-xl text-white mb-4 italic">{item.title}</h4>
                   <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-brand-red/5 border border-brand-red/20 p-8 rounded-3xl flex flex-col items-center gap-6 text-center">
              <h4 className="font-display text-2xl text-white">Pronto para começar?</h4>
              <button className="px-12 py-4 bg-brand-red text-white font-display text-sm tracking-widest font-black uppercase hover:scale-105 transition-all shadow-xl shadow-brand-red/20">
                QUERO CONSIGNAR MEU CARRO
              </button>
           </div>
        </div>
      )}

      {tab === 'refinance' && (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
           <div className="text-center space-y-4">
              <h3 className="font-display text-5xl text-white italic uppercase leading-none">Refinancie seu <span className="red-text">Veículo</span></h3>
              <p className="text-white/40 max-w-2xl mx-auto">Transforme seu patrimônio em capital de giro ou investimento com as menores taxas do mercado RafaCar Elite.</p>
           </div>

           <div className="glass-card p-12 border-white/5 bg-matte-black/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Repeat size={100} />
              </div>
              <div className="max-w-lg space-y-8">
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-[10px] text-white">✓</div>
                       <p className="text-sm text-white/80">Crédito de até 90% do valor da FIPE</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-[10px] text-white">✓</div>
                       <p className="text-sm text-white/80">Taxas a partir de 1.19% ao mês</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-[10px] text-white">✓</div>
                       <p className="text-sm text-white/80">Dinheiro na conta em até 24 horas</p>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-white text-matte-black font-display text-sm tracking-widest font-black uppercase hover:bg-brand-red hover:text-white transition-all">
                    SIMULAR AGORA
                 </button>
              </div>
           </div>
        </div>
      )}

      {tab === 'referral' && (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
           <div className="text-center space-y-4">
              <h3 className="font-display text-6xl text-white italic uppercase font-black tracking-tighter">R$ 1.000 <span className="red-text">NA CHAVE</span></h3>
              <p className="text-xl text-white/60 font-display italic">Indique alguém que queira vender seu veículo e ganhe R$ 1.000!</p>
           </div>

           <div className="p-12 rounded-3xl border-2 border-dashed border-brand-red/30 bg-brand-red/5 flex flex-col items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-brand-red flex items-center justify-center text-white">
                 <Key size={48} />
              </div>
              <div className="text-center space-y-4">
                 <p className="text-sm text-white/40 uppercase tracking-[0.3em]">Como funciona?</p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                    <div className="space-y-2">
                       <p className="text-brand-red font-display text-2xl italic">01.</p>
                       <p className="text-sm text-white font-medium">Envie o contato de quem quer vender o carro.</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-brand-red font-display text-2xl italic">02.</p>
                       <p className="text-sm text-white font-medium">Nossa equipe faz a avaliação e consignação.</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-brand-red font-display text-2xl italic">03.</p>
                       <p className="text-sm text-white font-medium">O carro é vendido e você recebe R$ 1.000 na hora.</p>
                    </div>
                 </div>
              </div>
              <button className="px-12 py-5 bg-brand-red text-white font-display text-sm tracking-[0.2em] font-black uppercase hover:scale-105 transition-all shadow-2xl shadow-brand-red/30">
                 INDICAR CONTATO AGORA
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
