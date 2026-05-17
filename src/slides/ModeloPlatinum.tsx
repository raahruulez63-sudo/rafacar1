import React from 'react';
import { motion } from 'motion/react';
import { Globe, MapPin, BarChart3, Rocket } from 'lucide-react';

const blocks = [
  { icon: Globe, title: "Administração", desc: "Supervisão total de regiões geográficas exclusivas." },
  { icon: BarChart3, title: "Supervisão", desc: "Gestão de performance de múltiplos líderes Gold e Black." },
  { icon: Rocket, title: "Expansão", desc: "Abertura de novas operações e recrutamento de elite." },
  { icon: MapPin, title: "Territorial", desc: "Domínio de praça e logística de treinamentos locais." },
];

export default function ModeloPlatinum() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h3 className="font-display text-silver italic tracking-wider mb-2">GESTÃO TERRITORIAL</h3>
        <h2 className="font-display text-6xl md:text-8xl mb-6 italic">MODELO REGIONAL <span className="text-white">PLATINUM</span></h2>
        <p className="text-white/60 font-body text-xl">
          A transição do líder de vendas para o executivo de território. 
          Escala massiva através de governança regional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blocks.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="glass-card p-8 border-white/5 hover:border-silver/40 transition-colors"
          >
            <div className="mb-6 p-4 w-fit rounded-xl bg-silver/10 text-silver">
              <item.icon size={28} />
            </div>
            <h4 className="font-display text-2xl mb-2 tracking-widest italic">{item.title}</h4>
            <p className="text-sm font-body text-white/40 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-10 bg-gradient-to-r from-silver/10 to-transparent border-silver/30">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h5 className="font-display text-2xl mb-4 italic">RECEITA E <span className="text-silver">RESIDUAL</span></h5>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass-card flex items-center justify-center font-display text-2xl text-silver italic font-bold">5%</div>
                <p className="font-body text-white/70">Sobre o faturamento bruto de toda a região administrada.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass-card flex items-center justify-center font-display text-2xl text-brand-red italic font-bold">1%</div>
                <p className="font-body text-white/70 italic text-brand-red font-bold">Bônus Executivo Vitalício sobre novos Platinum formados.</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-display text-white/30 tracking-[0.4em] uppercase mb-2">Foco Platinum</p>
            <p className="text-5xl font-display text-white leading-tight italic">QUEM FORMA LÍDERES, <br/><span className="text-silver">CRIA REGIÕES.</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
