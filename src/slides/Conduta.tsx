import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const dos = [
  "Ética em todos os níveis",
  "Transparência nas vendas",
  "Crescimento meritocrático",
  "Liderança pelo exemplo",
  "Expansão organizada"
];

const donts = [
  "Spam ou abordagens invasivas",
  "Leads falsos ou manipulados",
  "Corretagem interna",
  "Promessas irreais de ganho",
  "Danos à marca RafaCar"
];

export default function Conduta() {
  return (
    <div className="space-y-12 h-content">
      <div className="text-center space-y-4">
        <h3 className="font-display text-white/40 italic tracking-wider">COMPLIANCE E REGRAS</h3>
        <h2 className="font-display text-6xl md:text-8xl italic">CÓDIGO DE <span className="red-text">ÉTICA ELITE</span></h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-10 border-l-4 border-l-brand-red bg-brand-red/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <CheckCircle2 className="text-brand-red" size={32} />
            <h4 className="font-display text-3xl tracking-widest italic">VALORES OFICIAIS</h4>
          </div>
          <ul className="space-y-6">
            {dos.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span className="font-body text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-10 border-l-4 border-l-silver bg-silver/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <XCircle className="text-silver" size={32} />
            <h4 className="font-display text-3xl tracking-widest italic">PROIBIÇÕES</h4>
          </div>
          <ul className="space-y-6">
            {donts.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-silver" />
                <span className="font-body text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 text-white/30 text-xs font-display tracking-[0.2em] font-light">
        <AlertTriangle size={14} className="text-brand-red/50" />
        O DESCUMPRIMENTO ACARRETA EXCLUSÃO IMEDIATA DO CLUBE
      </div>
    </div>
  );
}
