import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useEliteClub } from '../../context/EliteClubContext';
import { Instagram, Facebook, Smartphone, Phone, Save, Link2, Share2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function UserSettings() {
  const { profile } = useAuth();
  const { updateProfile } = useEliteClub();
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: profile?.phone || '',
    instagram: profile?.socialConnections?.instagram || '',
    facebook: profile?.socialConnections?.facebook || '',
    whatsapp: profile?.socialConnections?.whatsapp || ''
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      phone: formData.phone,
      socialConnections: {
        instagram: formData.instagram,
        facebook: formData.facebook,
        whatsapp: formData.whatsapp
      }
    });
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h3 className="font-display text-4xl uppercase text-white mb-2 underline decoration-brand-red decoration-4 transition-all tracking-tighter">MINHA <span className="red-text">CONTA</span></h3>
        <p className="text-xs text-white/40 tracking-widest uppercase">Gerencie sua presença e integrações de leads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-8 border-white/5 flex flex-col items-center text-center">
             <div className="w-24 h-24 rounded-full bg-brand-red flex items-center justify-center font-display text-4xl text-white italic font-black mb-4 border-4 border-white/5">
                {profile?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
             </div>
             <h4 className="text-xl font-display text-white italic">{profile?.name}</h4>
             <p className="text-[10px] text-brand-red uppercase tracking-widest mb-4">{profile?.rank}</p>
             <div className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] text-white/40 uppercase tracking-widest">
                ID: {profile?.uid.slice(0, 8)}
             </div>
          </div>
          
          <div className="glass-card p-6 border-white/5 space-y-4">
            <h5 className="text-[10px] text-white/20 uppercase tracking-widest flex items-center gap-2">
               <Link2 size={12} /> Link de Afiliado
            </h5>
            <div className="p-3 bg-matte-black border border-white/5 rounded-lg text-[10px] text-brand-red truncate font-mono">
               rafacar.elite/invite/{profile?.uid.slice(0,6)}
            </div>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] uppercase font-display tracking-widest transition-all">
               COPIAR LINK
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <form onSubmit={handleSave} className="glass-card p-10 border-white/5 space-y-8">
            <div className="space-y-6">
              <h5 className="font-display text-xl text-white italic flex items-center gap-3">
                <Smartphone size={20} className="text-brand-red" /> Dados de Contato
              </h5>
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest">Telefone Principal (WhatsApp)</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <input 
                    type="tel" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-brand-red outline-none transition-all"
                    placeholder="(00) 0 0000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="font-display text-xl text-white italic flex items-center gap-3">
                <Share2 size={20} className="text-brand-red" /> Redes Sociais
              </h5>
              <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest">Vincule suas redes para que novos contatos capturados via links sociais sejam atribuídos automaticamente à sua origem.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Instagram size={12} /> Instagram
                  </label>
                  <input 
                    type="text" 
                    value={formData.instagram} 
                    onChange={e => setFormData({...formData, instagram: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-xl p-4 text-sm text-white focus:border-brand-red outline-none transition-all"
                    placeholder="@seuusuario"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Facebook size={12} /> Facebook
                  </label>
                  <input 
                    type="text" 
                    value={formData.facebook} 
                    onChange={e => setFormData({...formData, facebook: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-xl p-4 text-sm text-white focus:border-brand-red outline-none transition-all"
                    placeholder="fb.com/seuperfil"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSaving}
              className={cn(
                "w-full py-4 bg-brand-red text-white font-display text-sm tracking-[0.2em] font-black uppercase hover:bg-brand-red-dark transition-all rounded-xl flex items-center justify-center gap-3",
                isSaving && "opacity-50 cursor-not-allowed"
              )}
            >
              <Save size={18} /> {isSaving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
            </button>
          </form>
          
          <div className="p-8 rounded-2xl bg-brand-red/5 border border-brand-red/10">
            <h5 className="font-display text-lg text-white italic mb-2">Importante</h5>
            <p className="text-xs text-white/40 leading-relaxed">
              Ao vincular suas redes sociais, nosso sistema gera pixels e links rastreáveis únicos para você. Leads vindos dessas origens aparecerão com a marcação correspondente em seu Gerenciador de Leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
