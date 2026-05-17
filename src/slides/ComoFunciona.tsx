import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const steps = [
  { id: 'START', label: 'Início Operacional', color: 'bg-white' },
  { id: 'BLACK', label: 'Vendas e Equipe', color: 'bg-brand-red' },
  { id: 'GOLD', label: 'Líder de Rede', color: 'bg-brand-red' },
  { id: 'PLATINUM', label: 'Gestão Regional', color: 'bg-white' },
  { id: 'DIAMANTE', label: 'Sócio Estratégico', color: 'bg-brand-red' },
];

export default function ComoFunciona() {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h3 className="font-display text-silver italic tracking-wider mb-2">FLUXO OPERACIONAL</h3>
        <h2 className="font-display text-6xl md:text-8xl italic">LINHA DE <span className="red-text">EVOLUÇÃO</span></h2>
      </div>

      <div className="relative py-12 px-12 glass-card border-dashed border-brand-red/30 bg-brand-red/[0.02]">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-24 right-24 h-[1px] bg-brand-red/20 -translate-y-1/2 hidden md:block z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="relative group flex flex-col items-center z-10"
            >
              {/* Node */}
              <div className={cn(
                "px-4 py-3 rounded-xl border transition-all text-center min-w-[120px]",
                (i === 2 || i === 1 || i === 4) ? "bg-brand-red border-brand-red text-white shadow-[0_0_15px_rgba(227,27,35,0.3)] shadow-brand-red/20" : 
                "bg-surface border-brand-red/40 text-brand-red shadow-lg"
              )}>
                <span className={cn(
                   "block text-[8px] font-bold uppercase tracking-widest",
                   (i === 2 || i === 1 || i === 4) ? "text-white/60" : "text-brand-red/60"
                )}>LEVEL {String(i + 1).padStart(2, '0')}</span>
                <p className="font-display text-base font-black tracking-tighter uppercase">{step.id}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="glass-card p-6 border-l-4 border-l-white">
          <p className="text-xs text-white/40 mb-2 uppercase font-display">Fase 1</p>
          <p className="font-body text-sm">Entrada no sistema e validação de vendas diretas.</p>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-brand-red">
          <p className="text-xs text-brand-red/40 mb-2 uppercase font-display">Fase 2</p>
          <p className="font-body text-sm">Formação de equipe e expansão da rede de afiliados.</p>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-silver">
          <p className="text-xs text-silver/40 mb-2 uppercase font-display">Fase 3</p>
          <p className="font-body text-sm">Gestão regional e participação plena nos lucros.</p>
        </div>
      </div>
    </div>
  );
}
