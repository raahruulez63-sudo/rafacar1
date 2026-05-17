import React from 'react';
import { motion } from 'motion/react';
import { Flame, Zap, Crown, Diamond, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const levels = [
  { rank: "DIAMANTE", role: "Sócio Estratégico", goal: "Participação patrimonial", icon: ShieldCheck, color: "text-silver", bg: "bg-silver/20", border: "border-silver" },
  { rank: "PLATINUM", role: "Gerente Regional", goal: "Gestão territorial", icon: Diamond, color: "text-white", bg: "bg-white/20", border: "border-white" },
  { rank: "GOLD", role: "Líder de Rede", goal: "Expansão estrutural", icon: Crown, color: "text-brand-red", bg: "bg-brand-red/20", border: "border-brand-red" },
  { rank: "BLACK", role: "Líder Operacional", goal: "Formação de mini equipe", icon: Zap, color: "text-brand-red", bg: "bg-brand-red/20", border: "border-brand-red" },
  { rank: "START", role: "Afiliado", goal: "Início operacional", icon: Flame, color: "text-white", bg: "bg-white/20", border: "border-white" },
];

export default function Hierarquia() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div>
          <h3 className="font-display text-white/40 italic tracking-wider mb-2">HIERARQUIA OFICIAL</h3>
          <h2 className="font-display text-6xl mb-4 italic">ESTRUTURA DE <span className="red-text">LIDERANÇA</span></h2>
          <p className="text-white/50 font-body">
            Uma progressão clara onde cada nível desbloqueia novas responsabilidades e maiores fatias do lucro operacional.
          </p>
        </div>

        <div className="space-y-3">
          {levels.map((level, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 - (i * 0.15) }}
              className={cn(
                "glass-card p-4 flex items-center justify-between border-l-4 transition-all hover:translate-x-2",
                level.border === 'border-silver' ? 'border-l-silver' : 'border-l-brand-red'
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  level.rank === 'DIAMANTE' ? 'badge-glow-silver' : 
                  (level.rank === 'GOLD' || level.rank === 'BLACK') ? 'badge-glow-red' : 'bg-white/20'
                )} />
                <div>
                  <h4 className="font-display text-xl leading-none mb-1 italic">{level.rank}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{level.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/30 uppercase tracking-tighter mb-1">Objetivo</p>
                <p className="font-display text-xs text-brand-red/80 font-bold">{level.goal}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-12">
        {levels.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className={cn(
              "h-16 flex items-center justify-center rounded-xl border border-white/10 glass-card transition-all hover:scale-105",
              i === 0 ? "w-1/3 border-silver/40 shadow-lg shadow-silver/10" : 
              i === 1 ? "w-1/2" : 
              (i === 2 || i === 3) ? "w-2/3 border-brand-red/40 shadow-lg shadow-brand-red/10" : 
              "w-full"
            )}
          >
            <span className={cn(
              "font-display tracking-[0.2em] text-lg italic font-bold",
              (i === 2 || i === 3) ? "text-brand-red" : "text-white/80"
            )}>
              {level.rank}
            </span>
          </motion.div>
        ))}
        <div className="mt-4 text-[10px] font-display tracking-[0.5em] text-white/20 uppercase">
          Fluxo de Ascensão Executiva
        </div>
      </div>
    </div>
  );
}
