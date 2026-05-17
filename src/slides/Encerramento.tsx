import React from 'react';
import { motion } from 'motion/react';
import { Phone, Instagram, MapPin, ArrowRight } from 'lucide-react';

export default function Encerramento() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-12">
        <div className="space-y-2">
          <h1 className="font-display text-7xl md:text-9xl mb-2 italic">OBRIGADO</h1>
          <h2 className="font-display text-4xl red-text italic">RAFACAR ELITE CLUB</h2>
        </div>

        <p className="font-body text-xl text-white/50 leading-relaxed italic">
          “Quem investe agora, constrói o legado de amanhã. 
          Seja bem-vindo ao próximo nível do mercado automotivo.”
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-brand-red text-white font-display text-xl tracking-widest hover:bg-white hover:text-brand-red transition-all flex items-center gap-3 italic font-bold">
            COMEÇAR AGORA <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 glass-card text-brand-red font-display text-xl tracking-widest hover:bg-brand-red/10 transition-all font-bold italic">
            FALAR COM GERENTE
          </button>
        </div>
      </div>

      <div className="glass-card p-12 space-y-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-red/10 blur-[80px] rounded-full" />
        
        <h3 className="font-display text-3xl tracking-widest border-b border-white/10 pb-4 italic">CONTATOS DIRETOS</h3>
        
        <div className="space-y-8">
          <a href="#" className="flex items-center gap-6 group">
            <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] font-display text-white/30 uppercase tracking-widest mb-1">WhatsApp Oficial</p>
              <p className="text-2xl font-display text-white group-hover:text-brand-red transition-colors italic">Solicitar Link</p>
            </div>
          </a>

          <a href="#" className="flex items-center gap-6 group">
            <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-silver group-hover:scale-110 transition-transform">
              <Instagram size={24} />
            </div>
            <div>
              <p className="text-[10px] font-display text-white/30 uppercase tracking-widest mb-1">Instagram</p>
              <p className="text-2xl font-display text-white group-hover:text-brand-red transition-colors italic">@RafaCarMotors</p>
            </div>
          </a>

          <a href="#" className="flex items-center gap-6 group">
            <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] font-display text-white/30 uppercase tracking-widest mb-1">Unidade Sede</p>
              <p className="text-2xl font-display text-white group-hover:text-brand-red transition-colors italic">RafaCar Motors</p>
            </div>
          </a>
        </div>

        <div className="pt-10 flex border-t border-white/10 items-center justify-between">
          <p className="text-[10px] font-display uppercase tracking-widest text-white/20">Elite Club © 2026</p>
          <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-brand-red/40" />
             <div className="w-2 h-2 rounded-full bg-white/10" />
             <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
