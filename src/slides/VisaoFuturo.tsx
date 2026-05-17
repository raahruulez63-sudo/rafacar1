import React from 'react';
import { motion } from 'motion/react';
import { Users, LayoutGrid, Map, TrendingUp } from 'lucide-react';

const goals = [
  { label: "Líderes", icon: Users },
  { label: "Executivos", icon: TrendingUp },
  { label: "Gestores", icon: Map },
  { label: "Sócios", icon: LayoutGrid },
];

export default function VisaoFuturo() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-16 py-12">
      <div className="space-y-6">
        <h3 className="font-display text-brand-red italic tracking-widest">O CAMINHO À FRENTE</h3>
        <h2 className="font-display text-6xl md:text-9xl tracking-tight italic">VISÃO DE <span className="red-text">FUTURO</span></h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
        {goals.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center group-hover:bg-brand-red transition-all text-white group-hover:text-white shadow-2xl">
              <item.icon size={32} />
            </div>
            <p className="font-display text-xl tracking-[0.2em] uppercase text-white/60 group-hover:text-brand-red font-bold">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 max-w-2xl px-6">
        <p className="font-body text-xl text-white/40 italic leading-relaxed">
          “O RafaCar Elite Club não é sobre vender carros, <br className="hidden md:block" /> 
          é sobre construir o maior ecossistema de liderança regional do país.”
        </p>
        <div className="h-px w-24 bg-brand-red/30 mx-auto mt-8" />
        <h4 className="font-display text-3xl red-text uppercase mt-4 italic font-bold">
          QUEM FORMA LÍDERES, CRIA REGIÕES.
        </h4>
      </div>
    </div>
  );
}
