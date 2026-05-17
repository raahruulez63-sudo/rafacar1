import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useEliteClub } from '../../context/EliteClubContext';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, FileText, AlertCircle, CheckCircle2, 
  TrendingUp, CreditCard, UserCheck, Smartphone, Hash, Calendar
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CreditAppCenter() {
  const { profile } = useAuth();
  const { 
    leads, creditRequests, creditSimulations, 
    requestCredit, approveCredit, simulateCredit 
  } = useEliteClub();
  
  const [activeTab, setActiveTab] = useState<'simulate' | 'apply'>('simulate');
  const [isAdding, setIsAdding] = useState(false);
  
  // Simulation Form
  const [simForm, setSimForm] = useState({
    cpf: '',
    birthDate: '',
    phone: '',
    hasCNH: false
  });

  // App Form
  const [appForm, setAppForm] = useState({
    leadId: '',
    amount: '',
  });

  const isAnalyst = profile?.role === 'ANALYST' || profile?.role === 'ADMIN';
  const validLeads = leads.filter(l => l.status === 'Validado' || l.status === 'Convertido');

  const handleSimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simForm.cpf || !simForm.phone) return;
    await simulateCredit(simForm);
    setSimForm({ cpf: '', birthDate: '', phone: '', hasCNH: false });
    setIsAdding(false);
  };

  const handleAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.leadId || !appForm.amount) return;
    await requestCredit({
      leadId: appForm.leadId,
      amount: parseFloat(appForm.amount),
    });
    setAppForm({ leadId: '', amount: '' });
    setIsAdding(false);
  };

  if (isAnalyst) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-2">PAINEL DE <span className="red-text">ANÁLISE</span></h2>
          <p className="text-sm font-body text-white/40 italic">Acesso exclusivo para analistas. Revise solicitações e controle o fluxo de aprovação.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                 <h4 className="font-display text-lg tracking-widest uppercase">Simulações Pendentes ({creditSimulations.length})</h4>
              </div>
              <div className="divide-y divide-white/5">
                 {creditSimulations.map((sim, i) => (
                   <div key={sim.id} className="p-4 flex justify-between items-center group hover:bg-white/[0.01]">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-silver/10 flex items-center justify-center text-silver">
                            <Smartphone size={18} />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-white">CPF: {sim.cpf}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Nasc: {sim.birthDate} • CNH: {sim.hasCNH ? 'SIM' : 'NÃO'}</p>
                         </div>
                      </div>
                      <button className="p-2 hover:text-brand-red text-white/20 transition-colors">
                         <CheckCircle2 size={18} />
                      </button>
                   </div>
                 ))}
                 {creditSimulations.length === 0 && <p className="p-12 text-center text-xs text-white/20">Nenhuma simulação pendente.</p>}
              </div>
           </div>

           <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                 <h4 className="font-display text-lg tracking-widest uppercase">Aprovações Formais ({creditRequests.filter(r => r.status === 'Em Análise').length})</h4>
              </div>
              <div className="divide-y divide-white/5">
                 {creditRequests.filter(r => r.status === 'Em Análise').map((req, i) => {
                   const lead = leads.find(l => l.id === req.leadId);
                   return (
                     <div key={req.id} className="p-4 flex justify-between items-center group hover:bg-white/[0.01]">
                        <div>
                           <p className="text-xs font-bold text-white">{lead?.name || 'Lead N/A'}</p>
                           <p className="text-[10px] text-brand-red uppercase tracking-widest leading-none">R$ {req.amount.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => approveCredit(req.id)}
                          className="px-4 py-2 border border-brand-red text-brand-red text-[10px] font-bold uppercase tracking-widest rounded hover:bg-brand-red hover:text-white transition-all"
                        >
                          APROVAR
                        </button>
                     </div>
                   );
                 })}
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-2">QUICK <span className="red-text">CREDIT</span></h2>
          <p className="text-sm font-body text-white/40 italic">Simule em segundos ou inicie uma aprovação formal com o banco.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setActiveTab('simulate'); setIsAdding(true); }}
            className={cn(
              "px-6 py-3 font-display text-sm tracking-widest transition-all flex items-center justify-center gap-2",
              activeTab === 'simulate' && isAdding ? "bg-white text-black" : "bg-white/5 text-white/40 hover:bg-white/10"
            )}
          >
            <CreditCard size={18} />
            SIMULAR
          </button>
          <button 
            onClick={() => { setActiveTab('apply'); setIsAdding(true); }}
            disabled={validLeads.length === 0}
            className={cn(
              "px-6 py-3 font-display text-sm tracking-widest transition-all flex items-center justify-center gap-2",
              activeTab === 'apply' && isAdding ? "bg-brand-red text-white" : "bg-brand-red/10 text-brand-red border border-brand-red/20 hover:bg-brand-red/20",
              validLeads.length === 0 && "opacity-20 cursor-not-allowed"
            )}
          >
            <UserCheck size={18} />
            CADASTRAR CLIENTE
          </button>
        </div>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "glass-card p-8 border-brand-red/30 bg-brand-red/5 max-w-2xl",
            activeTab === 'simulate' && "border-silver/30 bg-silver/5"
          )}
        >
          <h4 className={cn(
            "font-display text-xl mb-6 tracking-widest uppercase",
            activeTab === 'simulate' ? "text-silver" : "text-brand-red"
          )}>
            {activeTab === 'simulate' ? "Simulação Simplificada" : "Solicitar Aprovação Formal"}
          </h4>
          
          <form onSubmit={activeTab === 'simulate' ? handleSimSubmit : handleAppSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTab === 'simulate' ? (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1"><Hash size={10} /> CPF</label>
                  <input 
                    type="text" 
                    required
                    value={simForm.cpf}
                    onChange={e => setSimForm({...simForm, cpf: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-silver outline-none transition-colors"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1"><Calendar size={10} /> Data de Nascimento</label>
                  <input 
                    type="date" 
                    required
                    value={simForm.birthDate}
                    onChange={e => setSimForm({...simForm, birthDate: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-silver outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1"><Smartphone size={10} /> Celular</label>
                  <input 
                    type="tel" 
                    required
                    value={simForm.phone}
                    onChange={e => setSimForm({...simForm, phone: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-silver outline-none transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className="space-y-4 flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                      simForm.hasCNH ? "bg-silver border-silver" : "border-white/20 group-hover:border-white/40"
                    )}>
                      {simForm.hasCNH && <CheckCircle2 size={12} className="text-black" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={simForm.hasCNH}
                      onChange={e => setSimForm({...simForm, hasCNH: e.target.checked})}
                    />
                    <span className="text-xs uppercase tracking-widest text-white/60">Possui CNH</span>
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest">Selecionar Cliente</label>
                  <select 
                    required
                    value={appForm.leadId}
                    onChange={e => setAppForm({...appForm, leadId: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors appearance-none"
                  >
                    <option value="">Selecione...</option>
                    {validLeads.map(l => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest">Valor Solicitado (R$)</label>
                  <input 
                    type="number" 
                    required
                    value={appForm.amount}
                    onChange={e => setAppForm({...appForm, amount: e.target.value})}
                    className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm focus:border-brand-red outline-none transition-colors"
                    placeholder="Ex: 50.000"
                  />
                </div>
              </>
            )}
            
            <div className="md:col-span-2 pt-4 flex gap-4">
               <button 
                 type="submit"
                 className={cn(
                   "flex-1 py-4 font-display text-lg tracking-[0.2em] transition-all rounded-xl",
                   activeTab === 'simulate' ? "bg-silver text-black shadow-lg shadow-silver/20" : "bg-brand-red text-white shadow-lg shadow-brand-red/20"
                 )}
               >
                  {activeTab === 'simulate' ? 'RUN SIMULATION' : 'SUBMIT APPLICATION'}
               </button>
               <button 
                 type="button"
                 onClick={() => setIsAdding(false)}
                 className="px-8 py-4 bg-white/5 text-white/40 font-display text-lg tracking-widest hover:bg-white/10 rounded-xl"
               >
                  BACK
               </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Results / List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {creditRequests.map((cr, i) => {
          const lead = leads.find(l => l.id === cr.leadId);
          return (
            <motion.div key={cr.id} className="glass-card p-6 border-l-4 border-l-brand-red bg-brand-red/5 flex items-center justify-between">
               <div>
                  <h5 className="font-display text-xl uppercase tracking-tighter">{lead?.name || 'N/A'}</h5>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 italic">R$ {cr.amount.toLocaleString()} • Status: <span className="text-brand-red">{cr.status}</span></p>
               </div>
               <ShieldCheck size={24} className="text-brand-red/30" />
            </motion.div>
          );
        })}
      </div>

      <div className="glass-card p-8 bg-brand-red/5 border-brand-red/20 flex flex-col md:flex-row items-center gap-8 rounded-2xl">
         <div className="w-20 h-20 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
            <TrendingUp size={40} />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="font-display text-2xl uppercase tracking-widest mb-2 font-bold italic">DICA DO <span className="red-text">ELITE CLUB</span></h4>
            <p className="text-sm font-body text-white/60">
              Leads com simulações processadas têm 3x mais chance de fechar negócio. Use o Quick Credit para acelerar suas vendas.
            </p>
         </div>
      </div>
    </div>
  );
}
