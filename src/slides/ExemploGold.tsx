import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Vendas Próprias', value: 7000, color: '#E31B23' },
  { name: 'Bônus de Equipe', value: 3097, color: '#B0B0B0' },
];

export default function ExemploGold() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div>
          <h3 className="font-display text-brand-red italic tracking-wider mb-2">SIMULAÇÃO FINANCEIRA</h3>
          <h2 className="font-display text-6xl md:text-8xl italic">META: <span className="text-white">GOLD</span></h2>
          <p className="text-white/60 font-body text-xl">
            O primeiro grande marco da liderança executiva.
          </p>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 flex justify-between items-center bg-brand-red/5 border-brand-red/30">
            <div>
              <p className="font-display text-brand-red tracking-widest text-xs mb-1 font-bold">PRODUÇÃO DIRETA</p>
              <h4 className="font-display text-2xl italic tracking-tight underline decoration-brand-red underline-offset-4">👑 GOLD → 7 vendas</h4>
            </div>
            <p className="font-display text-3xl italic">R$ 7.000</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 border-white/10">
              <p className="font-display text-white/40 tracking-widest text-[10px] mb-1">TIME BLACK</p>
              <h4 className="font-display text-lg mb-1 leading-none italic">3 Vendas</h4>
              <p className="font-display text-brand-red font-bold">R$ 3.000</p>
            </div>
            <div className="glass-card p-6 border-white/10">
              <p className="font-display text-white/40 tracking-widest text-[10px] mb-1">TIME START</p>
              <h4 className="font-display text-lg mb-1 leading-none italic">9 Vendas</h4>
              <p className="font-display text-white">R$ 6.300</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-body text-white/30 uppercase mb-2">Bônus de Liderança (19%)</p>
              <p className="font-display text-white text-xl">+ R$ 3.097</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-display text-brand-red tracking-[0.2em] mb-1 uppercase font-bold">Ganho Final</p>
              <p className="font-display text-5xl red-text italic">R$ 10.097</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative aspect-square glass-card flex flex-col items-center justify-center p-8">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={10}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#121212', border: '1px solid #E31B23', borderRadius: '8px' }}
              itemStyle={{ color: '#E31B23', fontFamily: 'Poppins', fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] font-display tracking-[0.3em] text-white/30 uppercase">Total</p>
          <p className="text-4xl font-display text-white italic">R$ 10k+</p>
        </div>

        <div className="flex gap-8 mt-4">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-display tracking-widest text-white/40 uppercase">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
