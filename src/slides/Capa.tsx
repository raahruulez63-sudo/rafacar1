import React from 'react';
import { motion } from 'motion/react';

export default function Capa() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-brand-red/20 blur-2xl rounded-full opacity-50" />
        <h1 className="relative font-display text-7xl md:text-9xl tracking-[0.05em] leading-none mb-2 italic">
          RAFACAR <span className="red-text">ELITE</span> CLUB
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-display text-xl md:text-2xl tracking-[0.3em] text-white/60 uppercase"
      >
        Programa Oficial de Afiliados, Liderança e Expansão
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-display text-xs text-brand-red uppercase tracking-[0.4em]"
      >
        Resinifique sua vida
      </motion.p>

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-md"
      >
        <p className="italic font-body text-white/40 text-lg">
          “Quem constrói equipe, constrói patrimônio.”
        </p>
      </motion.div>

      {/* Decorative Cars (Abstract) */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1544636331-e268592033c2?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-cover object-center grayscale" 
          alt="Premium Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/80 to-transparent" />
      </div>
    </div>
  );
}
