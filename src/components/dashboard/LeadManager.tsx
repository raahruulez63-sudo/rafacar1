import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEliteClub } from '../../context/EliteClubContext';
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  CheckCircle, 
  Phone, 
  Instagram, 
  Facebook, 
  Smartphone, 
  Target, 
  Sparkles, 
  History, 
  Send, 
  X 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function LeadManager() {
  const { leads, addLead, validateLead, updateLeadStage, addLeadNote } = useEliteClub();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Manual' as Lead['source'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    await addLead(formData);
    setFormData({ name: '', email: '', phone: '', source: 'Manual' });
    setIsAdding(false);
  };

  const handleAddNote = async () => {
    if (!selectedLead || !newNote.trim()) return;
    await addLeadNote(selectedLead.id, newNote);
    setNewNote('');
  };

  const getAiSuggestions = async () => {
    if (!selectedLead) return;
    setLoadingAi(true);
    setAiSuggestions([]);
    try {
      const lastNote = selectedLead.notes?.length > 0 ? selectedLead.notes[selectedLead.notes.length - 1].text : '';
      const response = await fetch('/api/suggest-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadName: selectedLead.name,
          stage: selectedLead.stage || 'Novo',
          lastNote: lastNote,
          context: `Lead vindo do ${selectedLead.source}`
        })
      });
      const data = await response.json();
      setAiSuggestions(data.suggested || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const getSourceIcon = (source: Lead['source']) => {
    switch (source) {
      case 'WhatsApp': return <Phone size={14} className="text-green-500" />;
      case 'Instagram': return <Instagram size={14} className="text-pink-500" />;
      case 'Facebook': return <Facebook size={14} className="text-blue-500" />;
      default: return <Smartphone size={14} className="text-white/40" />;
    }
  };

  const currentLead = leads.find(l => l.id === selectedLead?.id) || selectedLead;

  return (
    <div className="flex gap-8 min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={cn("space-y-8 transition-all duration-500", currentLead ? "w-full lg:w-1/2 hidden lg:block" : "w-full")}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-2 text-white">GERENCIAR <span className="red-text">LEADS</span></h2>
            <p className="text-xs sm:text-sm font-body text-white/40 italic">CRM básico para organização e conversão de rede.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-6 py-3 bg-brand-red text-white font-display text-sm tracking-widest hover:bg-brand-red-dark transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <UserPlus size={18} />
            {isAdding ? 'CANCELAR' : 'NOVO LEAD'}
          </button>
        </div>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 border-brand-red/30 bg-brand-red/5 max-w-2xl"
          >
            <h4 className="font-display text-xl mb-6 tracking-widest uppercase">Cadastro de Lead</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest">Nome Completo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors"
                  placeholder="Ex: Roberto Silva"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest">Telefone</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest">Fonte do Lead</label>
                <select 
                  value={formData.source}
                  onChange={e => setFormData({...formData, source: e.target.value as Lead['source']})}
                  className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors appearance-none"
                >
                  <option value="Manual">Cadastro Manual</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook Marketplace</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-widest">Email (Opcional)</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors"
                  placeholder="contato@exemplo.com"
                />
              </div>
              <div className="md:col-span-2 pt-4">
                 <button className="w-full py-4 bg-brand-red text-white font-display text-lg tracking-[0.2em] hover:bg-brand-red-dark transition-all shadow-lg shadow-brand-red/20">
                    REGISTRAR LEAD (+10 PTS)
                 </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-4">
             <Search size={18} className="text-white/20" />
             <input 
               type="text" 
               placeholder="Buscar leads por nome ou status..." 
               className="bg-transparent border-none outline-none text-sm w-full font-body text-white"
             />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-white/10 text-[10px] text-white/50 uppercase tracking-widest">
                  <th className="px-6 py-4 font-normal">Identificação</th>
                  <th className="px-6 py-4 font-normal">Funil</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                  <th className="px-6 py-4 font-normal text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead, i) => (
                  <tr 
                    key={i} 
                    onClick={() => setSelectedLead(lead)}
                    className={cn(
                      "group hover:bg-white/[0.02] transition-colors cursor-pointer",
                      currentLead?.id === lead.id && "bg-brand-red/5 border-l-2 border-brand-red"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getSourceIcon(lead.source)}
                        <div>
                          <p className="text-sm font-semibold text-white">{lead.name}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-display">{lead.source}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-white/70 font-display italic">{lead.stage || 'Novo'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        lead.status === 'Pendente' ? "bg-white/5 text-white/40 border border-white/10" :
                        lead.status === 'Validado' ? "bg-brand-red/10 text-brand-red border border-brand-red/20" :
                        "bg-silver/10 text-silver border border-silver/20"
                      )}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                         {lead.status === 'Pendente' && (
                           <button 
                             onClick={(e) => { e.stopPropagation(); validateLead(lead.id); }}
                             className="p-2 hover:bg-brand-red/20 text-brand-red rounded-lg transition-colors border border-transparent hover:border-brand-red/30"
                             title="Validar Lead"
                           >
                             <CheckCircle size={16} />
                           </button>
                         )}
                         <MoreHorizontal size={16} className="text-white/20" />
                      </div>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-white/20 italic">
                      Nenhum lead cadastrado ainda. Comece agora para acumular pontos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CRM Detail Panel */}
      <AnimatePresence>
        {currentLead && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="w-full lg:w-1/2 glass-card flex flex-col h-full border-brand-red/20 bg-matte-black"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20">
                  {getSourceIcon(currentLead.source)}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white italic">{currentLead.name}</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{currentLead.source} — {currentLead.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-white/10 rounded-full text-white/40 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {/* Funnel Stage */}
              <div className="space-y-4">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-display flex items-center gap-2">
                  <Target size={12} /> Fase do Funil
                </p>
                <div className="grid grid-cols-5 gap-1">
                  {(['Novo', 'Contatado', 'Negociando', 'Fechado', 'Perdido'] as Lead['stage'][]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateLeadStage(currentLead.id, s)}
                      className={cn(
                        "py-2 text-[10px] font-display uppercase tracking-tighter border transition-all",
                        currentLead.stage === s 
                          ? "bg-brand-red text-white border-brand-red" 
                          : "bg-white/5 text-white/20 border-white/10 hover:bg-white/10"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Assistant Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-brand-red font-display uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={12} /> Assistente de Vendas IA
                  </p>
                  <button 
                    onClick={getAiSuggestions}
                    disabled={loadingAi}
                    className="text-[10px] font-display text-white/40 hover:text-brand-red transition-colors underline underline-offset-4"
                  >
                    {loadingAi ? 'GERANDO...' : 'REGERAR SUGESTÕES'}
                  </button>
                </div>

                <div className="space-y-3">
                  {aiSuggestions.length > 0 ? (
                    aiSuggestions.map((suggestion, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl group hover:border-brand-red/30 transition-all cursor-pointer relative overflow-hidden"
                        onClick={() => {
                          const whatsappUrl = `https://wa.me/${currentLead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(suggestion)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                         <p className="text-xs text-white/80 italic font-body leading-relaxed mb-3">"{suggestion}"</p>
                         <div className="flex items-center justify-between">
                           <span className="text-[8px] text-white/30 uppercase tracking-widest">
                             {i === 0 ? 'Consultiva' : i === 1 ? 'Urgência' : 'Quebra de Objeção'}
                           </span>
                           <button className="flex items-center gap-1.5 text-[10px] font-display text-brand-red opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold italic">
                             ENVIAR WA <Send size={10} />
                           </button>
                         </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-8 border border-dashed border-white/10 rounded-xl text-center space-y-4">
                      <p className="text-[10px] text-white/20 uppercase tracking-widest">Obtenha sugestões treinadas para converter</p>
                      <button 
                        onClick={getAiSuggestions}
                        disabled={loadingAi}
                        className="px-6 py-3 bg-white/5 hover:bg-brand-red text-white text-xs font-display tracking-widest transition-all rounded-lg"
                      >
                        {loadingAi ? 'ANALISANDO LEAD...' : 'GERAR SUGESTÕES DE RESPOSTA'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes Timeline */}
              <div className="space-y-6">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-display flex items-center gap-2">
                  <History size={12} /> Linha do Tempo / Notas
                </p>
                
                <div className="space-y-6">
                  {currentLead.notes?.map((note, i) => (
                    <div key={note.id} className="relative pl-4 border-l border-white/10 pb-6 last:pb-0">
                      <div className="absolute top-0 -left-[4.5px] w-2 h-2 rounded-full bg-brand-red" />
                      <div className="space-y-1">
                        <p className="text-xs text-white/80 font-body">{note.text}</p>
                        <p className="text-[9px] text-white/20 font-display uppercase tracking-widest">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-4">
                    <textarea 
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      placeholder="Adicionar observação..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-brand-red/50 outline-none h-20 resize-none font-body"
                    />
                    <button 
                      onClick={handleAddNote}
                      className="aspect-square w-12 bg-brand-red flex items-center justify-center rounded-xl hover:bg-brand-red-dark transition-all text-white"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/10 bg-white/5">
               <div className="grid grid-cols-2 gap-4">
                 <a 
                   href={`https://wa.me/${currentLead.phone.replace(/\D/g, '')}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 py-4 bg-brand-red text-white font-display text-xs tracking-widest hover:bg-brand-red-dark transition-all rounded-xl italic font-bold"
                 >
                   <Phone size={14} /> WHATSAPP
                 </a>
                 <button className="flex items-center justify-center gap-2 py-4 glass-card text-white font-display text-xs tracking-widest hover:bg-white/10 transition-all rounded-xl italic font-bold border-white/10">
                   <Target size={14} /> AGENDAR VISITA
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
