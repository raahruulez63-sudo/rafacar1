import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Mês 1', commission: 2100, label: '3 Vendas (START)' },
  { month: 'Mês 2', commission: 5500, label: 'Equipe Iniciada (BLACK)' },
  { month: 'Mês 3', commission: 10097, label: 'Gestão Gold (GOLD)' },
  { month: 'Mês 4', commission: 18500, label: 'Expansão Regional (PLATINUM)' },
  { month: 'Mês 5', commission: 28000, label: 'Maturação Patrimonial' },
];

export default function ExemploCrescimento() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-12">
        <div>
          <h3 className="font-display text-brand-red italic tracking-wider mb-2">HISTÓRICO DE SUCESSO</h3>
          <h2 className="font-display text-6xl mb-6 italic">EVOLUÇÃO DO <span className="text-white">AFILIADO</span></h2>
          <p className="text-white/60 font-body leading-relaxed">
            Uma jornada de 90 a 120 dias focada na mudança de nível. 
            Do operacional básico à participação nos lucros da empresa.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { month: "1", role: "BLACK", desc: "3 vendas pessoais — Transição para Líder Operacional" },
            { month: "2", role: "GOLD", desc: "10 vendas equipe — Expansão Estrutural Iniciada" },
            { month: "3", role: "PLATINUM", desc: "Formação Territorial — Gestão de Novos Líderes" },
            { month: "4+", role: "DIAMANTE", desc: "Sócio Estratégico — Dividendos e Equity" }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex items-center gap-6 group"
            >
              <div className="w-12 h-12 glass-card flex items-center justify-center font-display text-xl text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all font-bold italic">
                {step.month}
              </div>
              <div>
                <p className="text-[10px] font-display text-brand-red tracking-widest uppercase mb-1 font-bold">Mês {step.month} — {step.role}</p>
                <p className="font-body text-white/80">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-[450px] glass-card p-10 relative">
        <div className="absolute top-6 left-10">
          <p className="font-display text-2xl red-text italic">R$ 28k+</p>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Potencial Mensal / 120 dias</p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 60, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#ffffff20" 
              fontSize={10} 
              axisLine={false}
              tickLine={false}
              fontFamily="Bebas Neue"
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-card p-4 border-brand-red shadow-2xl">
                      <p className="font-display text-brand-red mb-1 font-bold">{payload[0].payload.month}</p>
                      <p className="text-xl font-display text-white italic">R$ {payload[0].value?.toLocaleString()}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{payload[0].payload.label}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="commission" 
              stroke="#E31B23" 
              strokeWidth={3} 
              dot={{ fill: '#E31B23', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, stroke: '#121212', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
