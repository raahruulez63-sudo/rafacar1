import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, TrendingUp, Users, Target, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const commissions = [
  { level: "START", type: "Fixo/Venda", value: "R$ 700", icon: Target, color: "text-white" },
  { level: "BLACK", type: "Fixo/Venda", value: "R$ 1.000", icon: Zap, color: "text-brand-red" },
  { level: "GOLD", type: "Equipe", value: "10% a 19%", icon: Users, color: "text-brand-red" },
  { level: "PLATINUM", type: "Regional", value: "5% Total", icon: TrendingUp, color: "text-white" },
];

export default function SistemaComissoes() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="font-display text-silver italic tracking-wider mb-2">FINTECH DASHBOARD</h3>
          <h2 className="font-display text-6xl md:text-8xl italic">SISTEMA DE <span className="red-text">COMISSÕES</span></h2>
        </div>
        <div className="glass-card px-6 py-4 border-brand-red/30">
          <p className="text-[10px] font-display tracking-[0.2em] text-brand-red uppercase mb-1">Destaque Diamante</p>
          <p className="text-3xl font-display text-white italic">50% LUCRO <span className="text-white/40 text-sm">+ 1% EQUIPE</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commissions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="glass-card p-8 flex flex-col items-center text-center group hover:border-brand-red/40 transition-all cursor-default"
          >
            <div className={cn("mb-6 p-4 rounded-full bg-white/5", item.color)}>
              <item.icon size={32} />
            </div>
            <h4 className="font-display text-2xl tracking-widest mb-1 italic">{item.level}</h4>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-body mb-4">{item.type}</p>
            <div className="h-px w-8 bg-white/10 mb-4" />
            <p className="text-3xl font-display text-white group-hover:text-brand-red transition-colors">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUp size={120} className="text-brand-red" />
        </div>
        <div className="relative z-10 grid md:grid-cols-3 gap-12">
          <div className="space-y-2">
            <h5 className="font-display text-brand-red tracking-widest italic font-bold">TRANSPARÊNCIA</h5>
            <p className="text-sm font-body text-white/50">Pagamentos processados via dashboard próprio com auditoria real de vendas.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-display text-brand-red tracking-widest italic font-bold">ESCALABILIDADE</h5>
            <p className="text-sm font-body text-white/50">Ganhos ilimitados baseados na performance de recrutamento e treinamento.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-display text-brand-red tracking-widest italic font-bold">MÉRITO</h5>
            <p className="text-sm font-body text-white/50">Diferenciais de comissão que beneficiam quem forma novos líderes de sucesso.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
