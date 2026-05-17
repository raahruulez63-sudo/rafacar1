import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Zap, CreditCard, Users, Search, Wallet, Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';

const creditLines = [
  { 
    title: 'FGTS Reais', 
    desc: 'Utilize sua antecipação do saque-aniversário para dar entrada ou quitar parcelas. Aprovação em minutos.',
    icon: Wallet,
    badges: ['SAQUE-ANIVERSÁRIO', 'RÁPIDO']
  },
  { 
    title: 'Conta de LUZ', 
    desc: 'Empréstimos descontados diretamente na sua fatura de energia. Ideal para pequenas entradas.',
    icon: Lightbulb,
    badges: ['SEM BUROCRACIA', 'CONTA DE LUZ']
  },
  { 
    title: 'Consórcio Contemplado', 
    desc: 'Acesso a cartas já sorteadas. Retire o veículo em no máximo 3 dias úteis após a transferência.',
    icon: Zap,
    badges: ['3 DIAS', 'PRONTA ENTREGA'],
    highlight: true
  },
  { 
    title: 'Carta Digital 30%', 
    desc: 'Consórcio com contemplação de 30% do valor do crédito e opção para venda da carta quando contemplar.',
    icon: CreditCard,
    badges: ['OPÇÃO DE REVENDA', '30% CREDIT']
  },
  { 
    title: 'Crédito em 18x', 
    desc: 'Parcelamento integral via cartão de crédito em até 18x com as melhores taxas do mercado.',
    icon: CreditCard,
    badges: ['18X SEM JUROS*', 'IMEDIATO']
  },
  { 
    title: 'Multi-Oportunidades', 
    desc: 'Financiamento com mais de 18 oportunidades de conseguir um crédito através de diversos bancos parceiros.',
    icon: Landmark,
    badges: ['18+ BANCOS', 'TAXA ELITE']
  },
  { 
    title: 'Score Baixo & Sem Entrada', 
    desc: 'Linhas específicas para perfis com score comprometido, focadas em ativos e garantias reais.',
    icon: Users,
    badges: ['SCORE BAIXO', 'ZERO ENTRADA'],
    danger: true
  }
];

export default function CreditLines() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="font-display text-4xl uppercase text-white mb-2 underline decoration-brand-red decoration-4 transition-all tracking-tighter">LINHAS DE <span className="red-text">CRÉDITO</span></h3>
        <p className="text-xs text-white/40 tracking-widest uppercase">Soluções financeiras exclusivas para cada perfil de cliente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 glass-card border-white/5 relative overflow-hidden transition-all duration-500 hover:border-brand-red/30",
              line.highlight && "bg-brand-red/10 border-brand-red/30",
              line.danger && "border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/40"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
              line.highlight ? "bg-brand-red text-white" : 
              line.danger ? "bg-yellow-500/10 text-yellow-500" : "bg-white/5 text-white/40"
            )}>
              <line.icon size={26} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {line.badges.map((badge, bi) => (
                <span key={bi} className={cn(
                  "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                  line.highlight ? "bg-white/20 text-white" : "bg-white/10 text-white/40"
                )}>
                  {badge}
                </span>
              ))}
            </div>

            <h4 className="font-display text-2xl text-white italic mb-4 leading-tight">{line.title}</h4>
            <p className="text-sm text-white/40 font-body leading-relaxed mb-8">{line.desc}</p>

            <button className={cn(
              "w-full py-3 text-[10px] uppercase font-display tracking-widest italic font-black transition-all rounded-lg",
              line.highlight ? "bg-white text-brand-red hover:bg-brand-red hover:text-white" : 
              line.danger ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-matte-black" :
              "bg-white/5 text-white hover:bg-brand-red"
            )}>
              SOLICITAR CONSULTA
            </button>

            {line.highlight && (
               <div className="absolute top-0 right-0 p-4">
                <Zap size={16} className="text-brand-red animate-pulse" />
               </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-12 border-brand-red/20 bg-brand-red/5 flex flex-col md:flex-row items-center gap-12 group">
        <div className="w-24 h-24 rounded-3xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 group-hover:rotate-12 transition-transform duration-500">
          <Search size={48} />
        </div>
        <div className="space-y-4">
          <h4 className="font-display text-4xl text-white italic leading-none">NÃO ACHOU O QUE <span className="red-text">BUSCAVA?</span></h4>
          <p className="text-sm text-white/60 leading-relaxed font-body">Consulte nosso time de analistas para casos ultra-específicos. Temos parcerias com mais de 18 instituições financeiras para garantir a aprovação do seu lead.</p>
        </div>
        <button className="px-10 py-4 bg-brand-red text-white font-display text-sm tracking-widest font-black uppercase hover:scale-105 transition-all shadow-xl shadow-brand-red/20 ml-auto whitespace-nowrap">
          CHAMAR ANALISTA
        </button>
      </div>
    </div>
  );
}
