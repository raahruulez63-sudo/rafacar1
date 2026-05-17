import React from 'react';
import { motion } from 'motion/react';
import { Car, Network, UserPlus, Map, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';

const items = [
  { icon: Car, label: "Vendas", color: "text-white" },
  { icon: UserPlus, label: "Liderança", color: "text-brand-red" },
  { icon: Map, label: "Expansão", color: "text-silver" },
  { icon: Network, label: "Gestão Regional", color: "text-white" },
  { icon: Wallet, label: "Investimento", color: "text-brand-red" },
];

export default function OQueE() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div>
          <h3 className="font-display text-brand-red italic tracking-wider mb-2">MODELO DE NEGÓCIO</h3>
          <h2 className="font-display text-5xl md:text-7xl mb-6 italic">O QUE É O <span className="text-white">RAFACAR ELITE CLUB</span></h2>
          <p className="text-white/60 font-body text-lg leading-relaxed">
            Um ecossistema completo de meritocracia focado no mercado automotivo premium, 
            onde o crescimento é estruturado através de equipe, treinamento e gestão estratégica.
          </p>
        </div>

        <ul className="space-y-4">
          {["Vendas automotivas", "Crescimento em rede", "Formação de líderes", "Expansão regional", "Participação patrimonial"].map((text, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="flex items-center gap-4 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red group-hover:scale-150 transition-transform" />
              <span className="text-xl font-body text-white/80">{text}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="relative aspect-square flex items-center justify-center">
        {/* Central Logo */}
        <div className="w-32 h-32 glass-card rounded-full flex items-center justify-center z-10 border-brand-red/40 shadow-[0_0_50px_rgba(227,27,35,0.2)]">
          <span className="font-display text-4xl text-brand-red italic font-bold">R</span>
        </div>

        {/* Circular Items */}
        {items.map((item, i) => {
          const angle = (i * 72) - 90;
          const radius = "140px"; // Adjust for spacing
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              style={{
                position: 'absolute',
                transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`
              }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "w-16 h-16 glass-card rounded-full flex items-center justify-center group-hover:border-brand-red/60 transition-all group-hover:shadow-[0_0_20px_rgba(227,27,35,0.3)]",
                item.color
              )}>
                <item.icon size={24} />
              </div>
              <span className="text-[10px] font-display tracking-widest text-white/60 group-hover:text-brand-red">{item.label}</span>
            </motion.div>
          );
        })}

        {/* Connector Rings */}
        <div className="absolute inset-4 rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-brand-red/10" />
      </div>
    </div>
  );
}
