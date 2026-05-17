import React from 'react';
import { motion } from 'motion/react';
import { useEliteClub, POINT_VALUES } from '../../context/EliteClubContext';
import { useAuth } from '../../context/AuthContext';
import { Trophy, Target, Zap, TrendingUp, Users, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function OnboardingDashboard() {
  const { profile } = useAuth();
  const { leads, testDrives, creditRequests, sales } = useEliteClub();

  const points = profile?.points || 0;
  const rank = profile?.rank || 'START';

  const stats = {
    points,
    rank,
    leadsCount: leads.length,
    testDrivesCount: testDrives.filter(td => td.status === 'Concluído').length,
    creditsApprovedCount: creditRequests.filter(cr => cr.status === 'Aprovado').length,
    salesCount: sales.length,
  };

  const nextRankPoints = rank === 'START' ? 1000 : rank === 'BLACK' ? 3000 : rank === 'GOLD' ? 7000 : rank === 'PLATINUM' ? 15000 : 30000;
  const progressPercent = Math.min((points / nextRankPoints) * 100, 100);

  const recentActivity = [
    ...leads.map(l => ({ type: 'Lead', label: l.name, time: l.createdAt, pts: POINT_VALUES.LEAD_VALIDO })),
    ...testDrives.filter(td => td.status === 'Concluído').map(td => ({ type: 'Test Drive', label: td.carModel, time: Date.now(), pts: POINT_VALUES.TEST_DRIVE })),
    ...creditRequests.filter(cr => cr.status === 'Aprovado').map(cr => ({ type: 'Crédito', label: 'Aprovado', time: cr.submittedAt, pts: POINT_VALUES.CREDITO_APROVADO })),
  ].sort((a, b) => b.time - a.time).slice(0, 5);

  const chartData = [
    { name: 'Leads', value: stats.leadsCount, total: 20 },
    { name: 'Tests', value: stats.testDrivesCount, total: 10 },
    { name: 'Créditos', value: stats.creditsApprovedCount, total: 5 },
    { name: 'Vendas', value: stats.salesCount, total: 3 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Stat Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-brand-red bg-brand-red/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Trophy size={60} className="text-brand-red" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-display text-brand-red uppercase tracking-[0.2em] mb-1">Pontuação Total</p>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white">{stats.points.toLocaleString()} <span className="text-xs sm:text-sm text-white/40">PTS</span></h3>
            <div className="mt-4 flex items-center gap-2">
               <Zap size={14} className="text-brand-red" />
               <p className="text-[10px] sm:text-xs font-body text-white/40 italic leading-tight">Faltam {(nextRankPoints - stats.points).toLocaleString()} pts para o Próximo Nível</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-silver bg-silver/5">
          <p className="text-[10px] font-display text-silver uppercase tracking-[0.2em] mb-1">Status Atual</p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white italic leading-tight">{stats.rank} <br className="sm:hidden" /> <span className="text-[10px] sm:text-xs text-white/40 not-italic uppercase tracking-widest">(LEVEL {stats.rank === 'START' ? '01' : '02'})</span></h3>
          <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-brand-red"
               initial={{ width: 0 }}
               animate={{ width: `${progressPercent}%` }}
               transition={{ duration: 1, ease: "easeOut" }}
             />
          </div>
        </div>

        <div className="glass-card p-6">
          <p className="text-[10px] font-display text-white/40 uppercase tracking-[0.2em] mb-1">Ações Pendentes</p>
          <div className="flex items-end gap-2">
            <h3 className="text-5xl font-display text-white">03</h3>
            <p className="text-xs text-brand-red font-body mb-2 uppercase tracking-tighter">Tasks de Onboarding</p>
          </div>
          <p className="text-[10px] text-white/20 mt-3 uppercase tracking-widest">Aumente sua conversão em 12%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-display text-2xl tracking-widest uppercase">Performance Mensal</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-red" />
                <span className="text-[10px] text-white/40 uppercase font-display">Meta Elite</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={12}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    fontFamily="Bebas Neue"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ backgroundColor: '#121212', border: '1px solid #262626', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#E31B23' : '#C0C0C0'} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Ranking / Activity */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-brand-red/30">
            <h4 className="font-display text-xl tracking-widest uppercase mb-6 flex items-center gap-2">
               <Star size={18} className="text-brand-red" />
               Ranking Local
            </h4>
            <div className="space-y-4">
               {[
                 { name: "Você", pts: stats.points, rank: stats.rank, me: true },
                 { name: "Marcos Silva", pts: 890, rank: "START", me: false },
                 { name: "Ana Beatriz", pts: 720, rank: "START", me: false },
                 { name: "Rodolfo Klinsman", pts: 450, rank: "START", me: false },
               ].map((user, i) => (
                 <div key={i} className={cn(
                   "flex items-center justify-between p-3 rounded-lg border transition-all",
                   user.me ? "bg-brand-red/10 border-brand-red shadow-[0_0_15px_rgba(227,27,35,0.1)]" : "bg-white/5 border-transparent"
                 )}>
                   <div className="flex items-center gap-3">
                     <span className="font-display text-xs text-white/40">{i + 1}º</span>
                     <p className="text-xs font-semibold">{user.name}</p>
                   </div>
                   <p className="font-display text-xs text-brand-red">{user.pts} PTS</p>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-2 text-[10px] font-display uppercase tracking-[0.3em] border border-white/10 text-white/40 hover:text-white transition-colors">
              Ver Ranking Geral
            </button>
          </div>

          <div className="glass-card p-6">
            <h4 className="font-display text-xl tracking-widest uppercase mb-6">Atividade Recente</h4>
            <div className="space-y-4">
               {recentActivity.length > 0 ? recentActivity.map((act, i) => (
                 <div key={i} className="flex gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                       <Zap size={14} className="text-brand-red" />
                    </div>
                    <div className="flex-1">
                       <p className="text-xs font-semibold">{act.type}: {act.label}</p>
                       <p className="text-[10px] text-white/30 uppercase">Ganhou {act.pts} PTS</p>
                    </div>
                 </div>
               )) : (
                 <p className="text-xs text-white/20 italic">Nenhuma atividade recente</p>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
