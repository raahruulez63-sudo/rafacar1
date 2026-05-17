import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useEliteClub } from '../../context/EliteClubContext';
import { PlayCircle, CheckCircle, Clock, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';

const lessons = [
  { id: 'sc-1', category: 'scripts', title: 'Scripts de Alta Conversão', desc: 'Como abordar o lead para não perder o timing.', duration: '5 min' },
  { id: 'tv-1', category: 'treinamento de vendas', title: 'A Psicologia da Venda', desc: 'Entenda os gatilhos mentais do comprador de carro.', duration: '12 min' },
  { id: 'fe-1', category: 'fechamento', title: 'Técnicas de Fechamento Elite', desc: 'Acelerando a decisão sem parecer agressivo.', duration: '8 min' },
  { id: 'fi-1', category: 'financiamento', title: 'Dominando as Financeiras', desc: 'Como aprovar o que os outros reprovam.', duration: '15 min' },
  { id: 'in-1', category: 'Instagram', title: 'Instagram Automotivo', desc: 'Crie um perfil que gera autoridade e confiança.', duration: '10 min' },
  { id: 'wa-1', category: 'WhatsApp', title: 'WhatsApp Business Expert', desc: 'Automatize funções e venda pelo status.', duration: '7 min' },
  { id: 'ca-1', category: 'captação de clientes', title: 'Onde Nasce o Lead?', desc: 'Estratégias de prospecção ativa e passiva.', duration: '9 min' },
  { id: 'al-1', category: 'anúncios locais', title: 'Ads para Localidades Próximas', desc: 'Tráfego pago focado na sua região.', duration: '14 min' },
  { id: 'au-1', category: 'autoridade', title: 'Construindo seu Nome no Mercado', desc: 'Seja a referência de carros na sua cidade.', duration: '11 min' },
];

export default function University() {
  const { profile } = useAuth();
  const { completeLesson } = useEliteClub();
  
  const progress = profile?.universityProgress || [];
  const completedCount = progress.length;
  const totalCount = lessons.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h3 className="font-display text-4xl uppercase text-white mb-2 underline decoration-brand-red decoration-4 transition-all">UNIVERSIDADE <span className="red-text">RAFACAR</span></h3>
          <p className="text-xs text-white/40 tracking-widest uppercase">Evolução constante. O conhecimento precede a riqueza.</p>
        </div>
        
        <div className="glass-card p-6 min-w-[280px] border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Trophy size={60} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Seu Progresso</p>
            <p className="text-xs font-bold text-brand-red">{percentComplete}%</p>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-red"
              initial={{ width: 0 }}
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[10px] text-white/20 mt-3 text-right">{completedCount} de {totalCount} módulos concluídos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, i) => {
          const isCompleted = progress.includes(lesson.id);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden",
                isCompleted 
                  ? "bg-brand-red/5 border-brand-red/30" 
                  : "bg-white/5 border-white/10 hover:border-brand-red/50"
              )}
              onClick={() => completeLesson(lesson.id)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "p-3 rounded-xl transition-colors",
                  isCompleted ? "bg-brand-red text-white" : "bg-white/5 text-white/40 group-hover:bg-brand-red/10 group-hover:text-brand-red"
                )}>
                  {isCompleted ? <CheckCircle size={20} /> : <PlayCircle size={20} />}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/20 uppercase font-display tracking-widest">
                  <Clock size={12} /> {lesson.duration}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-brand-red uppercase font-display tracking-widest mb-2 opacity-60">{lesson.category}</p>
                <h4 className="font-display text-xl text-white mb-2 leading-tight italic">{lesson.title}</h4>
                <p className="text-xs text-white/40 line-clamp-2">{lesson.desc}</p>
              </div>

              {/* Progress bar subtle */}
              {isCompleted && (
                 <div className="absolute bottom-0 left-0 h-[3px] w-full bg-brand-red" />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 p-8 glass-card border-brand-red/20 bg-brand-red/5 flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red shrink-0">
          <GraduationCap size={32} />
        </div>
        <div>
          <h4 className="font-display text-2xl text-white italic mb-2">Certificações Elite</h4>
          <p className="text-sm text-white/60 leading-relaxed">Conclua todos os módulos da Universidade RafaCar para desbloquear seu selo de **Vendedor Elite** e aumentar sua visibilidade na Rede.</p>
        </div>
        <button className="px-8 py-3 bg-white text-matte-black font-display text-xs tracking-widest font-black uppercase hover:bg-brand-red hover:text-white transition-all ml-auto shrink-0">
          DETALHES DO SELO
        </button>
      </div>
    </div>
  );
}

import { GraduationCap } from 'lucide-react';
