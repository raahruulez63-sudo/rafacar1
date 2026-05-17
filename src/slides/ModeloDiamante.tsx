import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Wallet, PieChart as PieIcon, Shield } from 'lucide-react';

export default function ModeloDiamante() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-10">
        <div>
          <h3 className="font-display text-brand-red italic tracking-wider mb-2">TOPO DA PIRÂMIDE</h3>
          <h2 className="font-display text-6xl md:text-8xl mb-6 italic">SÓCIO <span className="red-text">DIAMANTE</span></h2>
          <p className="text-white/60 font-body text-lg leading-relaxed">
            Investimento direto em estoque e participação total no resultado líquido da RafaCar Motors.
          </p>
        </div>

        <div className="space-y-4">
          {[
            "Investimento em estoque próprio",
            "Participação nos lucros reais",
            "Divisão 50/50 do lucro líquido",
            "BÔNUS: 1% de toda produção da equipe",
            "Participação em decisões estratégicas"
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="flex items-center gap-4"
            >
              <div className="w-6 h-6 rounded-lg bg-brand-red/20 flex items-center justify-center text-brand-red">
                <Shield size={14} />
              </div>
              <span className="font-body text-white/80">{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-8 bg-brand-red/5 border-brand-red/30">
          <p className="text-xs font-display text-brand-red mb-4 tracking-widest uppercase font-bold">Exemplo de Operação</p>
          <div className="flex items-center justify-between gap-4">
            <div className="text-center">
              <p className="text-[10px] text-white/30 uppercase mb-1">Venda</p>
              <p className="font-display text-2xl italic">R$ 100k</p>
            </div>
            <ArrowRight className="text-white/20" />
            <div className="text-center">
              <p className="text-[10px] text-white/30 uppercase mb-1">Lucro</p>
              <p className="font-display text-2xl text-silver italic font-bold">R$ 12k</p>
            </div>
            <ArrowRight className="text-white/20" />
            <div className="text-center">
              <p className="text-[10px] text-brand-red/40 uppercase mb-1">Diamante</p>
              <p className="font-display text-3xl red-text italic">R$ 6k</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-brand-red/5 blur-[120px] rounded-full" />
        <div className="glass-card p-12 relative flex flex-col items-center gap-8 justify-center min-h-[500px]">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center shadow-[0_0_50px_rgba(227,27,35,0.4)]">
            <Wallet size={40} className="text-white" />
          </div>
          
          <div className="text-center space-y-2">
            <h4 className="font-display text-4xl italic">50% EQUITY</h4>
            <p className="text-xs font-body text-white/40 uppercase tracking-[0.3em]">Dividendo Líquido Semestral</p>
          </div>

          <div className="w-full h-[1px] bg-white/10" />

          <div className="grid grid-cols-2 gap-12 w-full">
            <div className="space-y-1">
              <p className="text-[10px] text-white/30 uppercase font-display">Investidor</p>
              <p className="font-display text-2xl text-brand-red italic">R$ 6.000</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-white/30 uppercase font-display">RafaCar</p>
              <p className="font-display text-2xl text-white italic">R$ 6.000</p>
            </div>
          </div>

          <div className="absolute bottom-6 text-[10px] font-display tracking-[0.2em] text-white/20 animate-pulse uppercase">
            MODELO SOCIETÁRIO PREMIUM
          </div>
        </div>
      </div>
    </div>
  );
}
