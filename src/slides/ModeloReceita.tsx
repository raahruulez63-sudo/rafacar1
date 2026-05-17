import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Venda Direta', value: 35, color: '#FFFFFF' },
  { name: 'Financiamento', value: 25, color: '#E31B23' },
  { name: 'Equipe', value: 45, color: '#B0B0B0' },
  { name: 'Sócio/Patrim.', value: 60, color: '#E31B23' },
];

export default function ModeloReceita() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div>
          <h3 className="font-display text-brand-red italic tracking-wider mb-2">PROJEÇÃO E GERAÇÃO</h3>
          <h2 className="font-display text-6xl mb-4 italic">MODELO DE <span className="text-white">RECEITA</span></h2>
          <p className="text-white/50 font-body">
            Entenda como o capital é gerado desde a operação básica até a maturidade patrimonial.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-6">
            <h4 className="font-display text-brand-red text-lg mb-2 italic">Principal</h4>
            <ul className="text-xs text-white/60 space-y-2 uppercase tracking-wider font-display">
              <li>• Venda de Veículos</li>
              <li>• Financiamentos</li>
              <li>• Intermediações</li>
              <li>• Expansão da Rede</li>
            </ul>
          </div>
          <div className="glass-card p-6 bg-brand-red/5 border-brand-red/20">
            <h4 className="font-display text-white text-lg mb-2 italic">Secundária</h4>
            <ul className="text-xs text-brand-red/60 space-y-2 uppercase tracking-wider font-display">
              <li>• Bônus de Liderança</li>
              <li>• Participação Regional</li>
              <li>• Participação de Lucro</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-[400px] glass-card p-8 group">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff40" 
              fontSize={10} 
              tick={{ fill: '#ffffff40' }}
              axisLine={false}
              tickLine={false}
              fontFamily="Bebas Neue"
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ backgroundColor: '#121212', border: '1px solid #E31B23', borderRadius: '8px' }}
              itemStyle={{ color: '#E31B23', fontFamily: 'Poppins', fontSize: '12px' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-display">Comparativo de Potencial de Lucro por Nível</p>
        </div>
      </div>
    </div>
  );
}
