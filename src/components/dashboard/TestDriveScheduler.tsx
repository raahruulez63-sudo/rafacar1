import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useEliteClub } from '../../context/EliteClubContext';
import { Calendar, Clock, Car, CheckSquare, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TestDriveScheduler() {
  const { leads, testDrives, scheduleTestDrive, completeTestDrive } = useEliteClub();
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    leadId: '',
    carModel: '',
    scheduledAt: '',
  });

  const validLeads = leads.filter(l => l.status === 'Validado');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.leadId || !formData.carModel || !formData.scheduledAt) return;
    await scheduleTestDrive({
      leadId: formData.leadId,
      carModel: formData.carModel,
      scheduledAt: new Date(formData.scheduledAt).getTime(),
    });
    setFormData({ leadId: '', carModel: '', scheduledAt: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-2">TEST <span className="red-text">DRIVES</span></h2>
          <p className="text-sm font-body text-white/40 italic">O momento decisivo. Agende e acompanhe as demonstrações de veículos.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          disabled={validLeads.length === 0}
          className={cn(
            "px-6 py-3 font-display text-sm tracking-widest transition-all flex items-center justify-center gap-2",
            validLeads.length === 0 ? "bg-white/5 text-white/20 cursor-not-allowed border border-white/5" : "bg-brand-red text-white hover:bg-white hover:text-black shadow-lg shadow-brand-red/20 rounded-xl"
          )}
        >
          <Plus size={18} />
          {isAdding ? 'CANCELAR' : 'AGENDAR NOVO'}
        </button>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 border-brand-red/30 bg-brand-red/5 max-w-2xl"
        >
          <h4 className="font-display text-xl mb-6 tracking-widest uppercase text-brand-red">Agendamento de Test Drive</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Selecionar Lead Validado</label>
              <select 
                value={formData.leadId}
                onChange={e => setFormData({...formData, leadId: e.target.value})}
                className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors appearance-none"
              >
                <option value="">Selecione um lead...</option>
                {validLeads.map(l => (
                  <option key={l.id} value={l.id}>{l.name} ({l.phone})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Modelo do Veículo</label>
              <input 
                type="text" 
                value={formData.carModel}
                onChange={e => setFormData({...formData, carModel: e.target.value})}
                className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors"
                placeholder="Ex: BYD Seal, BMW 320i"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Data e Hora</label>
              <input 
                type="datetime-local" 
                value={formData.scheduledAt}
                onChange={e => setFormData({...formData, scheduledAt: e.target.value})}
                className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2 pt-4">
               <button className="w-full py-4 bg-brand-red text-white font-display text-lg tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-lg shadow-brand-red/20 rounded-xl">
                  CONFIRMAR AGENDAMENTO
               </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testDrives.map((td, i) => {
          const lead = leads.find(l => l.id === td.leadId);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "glass-card p-6 border-l-4 relative group hover:border-r-white/5 transition-all",
                td.status === 'Agendado' ? "border-l-brand-red bg-brand-red/5" : "border-l-silver bg-silver/5"
              )}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50">
                   <Car size={20} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                  td.status === 'Agendado' ? "bg-brand-red text-white" : "bg-silver text-black"
                )}>
                  {td.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                   <h5 className="font-display text-xl tracking-wider text-white mb-1 uppercase">{td.carModel}</h5>
                   <p className="text-xs text-white/50 font-body italic">Cliente: {lead?.name || 'Lead Removido'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                   <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-white/20" />
                      <span className="text-[10px] text-white/40 uppercase font-display">{new Date(td.scheduledAt).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Clock size={14} className="text-white/20" />
                      <span className="text-[10px] text-white/40 uppercase font-display">{new Date(td.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   </div>
                </div>

                {td.status === 'Agendado' && (
                  <button 
                    onClick={() => completeTestDrive(td.id)}
                    className="w-full mt-6 py-2 bg-white/5 hover:bg-brand-red hover:text-white border border-white/10 rounded-lg text-xs font-display tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <CheckSquare size={14} />
                    CONCLUÍDO (+25 PTS)
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
        {testDrives.length === 0 && (
          <div className="col-span-full py-12 text-center glass-card border-dashed">
            <p className="text-sm text-white/20 italic">Sem agendamentos no momento. Valide um lead para agendar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
