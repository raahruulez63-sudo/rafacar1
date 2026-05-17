import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { UserProfile } from '../../types';
import { Users, ChevronRight, User as UserIcon, Share2, Award } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export default function NetworkView() {
  const { profile } = useAuth();
  const [team, setTeam] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!profile) return;
      
      // Fetch all users that were referred by this user
      // To see the "chain", we can look for users whose networkPath contains this profile.uid
      const q = query(collection(db, 'users'), where('referredBy', '==', profile.uid));
      const snap = await getDocs(q);
      setTeam(snap.docs.map(d => d.data() as UserProfile));
      setLoading(false);
    };

    fetchTeam();
  }, [profile]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-2 italic">LINHA <span className="red-text">EVOLUTIVA</span></h2>
          <p className="text-sm font-body text-white/40 italic">Acompanhe o crescimento da sua equipe e a expansão do seu legado.</p>
        </div>
        <div className="glass-card px-6 py-3 bg-brand-red/5 border-brand-red/20 flex items-center gap-4">
           <div className="text-right">
              <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none mb-1">Membros Ativos</p>
              <p className="font-display text-2xl text-brand-red leading-none">{team.length.toString().padStart(2, '0')}</p>
           </div>
           <Users size={32} className="text-brand-red opacity-50" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-silver bg-silver/5">
             <h4 className="font-display text-xl uppercase mb-4 flex items-center gap-2">
                < Award size={18} className="text-silver" />
                Seu Status Elite
             </h4>
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-display">Rank Atual</p>
                   <p className="font-display text-2xl text-white italic">{profile?.rank}</p>
                </div>
                <div className="flex justify-between items-end">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-display">Pontos Totais</p>
                   <p className="font-display text-2xl text-brand-red">{profile?.points}</p>
                </div>
             </div>
          </div>

          <div className="glass-card p-6">
             <h4 className="font-display text-lg uppercase mb-4 tracking-widest">Seu Link de Convite</h4>
             <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl">
                <code className="text-xs text-white/60 truncate flex-1 leading-none pt-1">
                   rafacar.elite/invite/{profile?.uid}
                </code>
                <button className="p-2 hover:bg-brand-red/20 text-brand-red transition-colors">
                   <Share2 size={16} />
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card overflow-hidden">
           <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <h4 className="font-display text-xl uppercase tracking-widest italic">Cadeia de Filiados (Nível 01)</h4>
           </div>
           <div className="divide-y divide-white/5">
              {loading ? (
                <div className="p-12 text-center text-white/20 uppercase tracking-widest text-xs animate-pulse font-display">Carregando Rede...</div>
              ) : team.length > 0 ? team.map((member, i) => (
                <motion.div 
                  key={member.uid}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-all cursor-pointer"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                         <UserIcon size={20} className="text-white/20" />
                         <div className={cn(
                           "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-matte-black shadow-lg",
                           member.rank === 'DIAMANTE' ? 'badge-glow-silver shadow-silver/40' : 
                           member.rank === 'BLACK' ? 'badge-glow-red' : 'bg-white/20'
                         )} />
                      </div>
                      <div>
                         <h5 className="font-display text-lg uppercase tracking-tight group-hover:text-brand-red transition-colors italic">{member.name}</h5>
                         <p className="text-[10px] text-white/30 uppercase tracking-widest">{member.rank} • Desde {new Date(member.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                         <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Performance</p>
                         <p className="font-display text-lg text-white leading-none">{member.points} PTS</p>
                      </div>
                      <ChevronRight size={20} className="text-white/10 group-hover:text-brand-red transition-colors" />
                   </div>
                </motion.div>
              )) : (
                <div className="p-12 text-center space-y-4">
                  <p className="text-sm text-white/20 italic">Sua rede ainda está vazia.</p>
                  <p className="text-[10px] text-brand-red uppercase tracking-[0.2em]">Cadastre novos leads e transforme-os em afiliados para gerar pontos de rede.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
