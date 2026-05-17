import React from 'react';
import { motion } from 'motion/react';
import { Target, Search, CheckCircle, UserPlus, Star } from 'lucide-react';
import { cn } from '../lib/utils';

const actions = [
  { action: "Venda concluída", points: 100, icon: CheckCircle, color: "text-brand-red" },
  { action: "Novo afiliado", points: 50, icon: UserPlus, color: "text-silver" },
  { action: "Crédito aprovado", points: 40, icon: Target, color: "text-white" },
  { action: "Test drive", points: 25, icon: Star, color: "text-brand-red" },
  { action: "Lead válido", points: 10, icon: Search, color: "text-white" },
];

export default function SistemaPontos() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div>
          <h3 className="font-display text-brand-red italic tracking-wider mb-2">GAMIFICAÇÃO E PERFORMANCE</h3>
          <h2 className="font-display text-6xl md:text-8xl italic">SISTEMA DE <span className="text-white">PONTOS</span></h2>
          <p className="text-white/60 font-body text-xl">
            Cada ação conta. Transforme seu esforço diário em progresso de ranking e bônus exclusivos.
          </p>
        </div>

        <div className="glass-card p-8 border-brand-red/20 bg-brand-red/5 flex items-center gap-6">
          <div className="p-4 rounded-xl bg-brand-red text-white">
            <Star size={32} />
          </div>
          <div>
            <h4 className="font-display text-2xl italic">RANKING ELITE</h4>
            <p className="text-sm font-body text-white/50">Top 3 regionais recebem bônus trimestrais em dinheiro e prêmios de luxo.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {actions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="glass-card p-5 flex items-center justify-between group hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={cn("p-2 rounded-lg bg-white/5", item.color)}>
                <item.icon size={20} />
              </div>
              <span className="font-display text-xl tracking-wider italic font-bold">{item.action}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-white/10" />
              <span className={cn("font-display text-2xl", item.color)}>+{item.points} <span className="text-[10px] text-white/40 uppercase">PTS</span></span>
            </div>
          </motion.div>
        ))}
        
        <div className="mt-8 pt-8 flex justify-between items-center opacity-30">
          <p className="text-[10px] font-display tracking-[0.5em] uppercase">RafaCar Elite Gamification Engine</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white"/>)}
          </div>
        </div>
      </div>
    </div>
  );
}
