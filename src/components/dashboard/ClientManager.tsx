import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useEliteClub } from '../../context/EliteClubContext';
import { UserPlus, Search, FileText, CheckCircle, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Client } from '../../types';

export default function ClientManager() {
  const { clients, addClient } = useEliteClub();
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Client, 'id' | 'createdAt' | 'userId'>>({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birthDate: '',
    maritalStatus: 'Solteiro(a)',
    address: '',
    occupation: '',
    monthlyIncome: 0,
    hasCNH: true,
    status: 'Analise'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addClient(formData);
    setIsAdding(false);
    setFormData({
      name: '', cpf: '', email: '', phone: '', birthDate: '',
      maritalStatus: 'Solteiro(a)', address: '', occupation: '',
      monthlyIncome: 0, hasCNH: true, status: 'Analise'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl uppercase text-white">FICHA <span className="red-text">CADASTRAL</span></h3>
          <p className="text-xs text-white/40 italic leading-tight">Dados completos para análise financeira detalhada.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 bg-brand-red text-white font-display text-sm tracking-widest hover:bg-brand-red-dark transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <UserPlus size={18} />
          {isAdding ? 'CANCELAR' : 'NOVA FICHA'}
        </button>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 border-brand-red/30 bg-brand-red/5"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Nome Completo</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">CPF</label>
              <input type="text" required value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white" placeholder="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Telefone</label>
              <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Data de Nascimento</label>
              <input type="date" required value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Estado Civil</label>
              <select value={formData.maritalStatus} onChange={e => setFormData({...formData, maritalStatus: e.target.value})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white">
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
                <option>Viúvo(a)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Possui CNH?</label>
              <select value={formData.hasCNH ? 'Sim' : 'Não'} onChange={e => setFormData({...formData, hasCNH: e.target.value === 'Sim'})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white">
                <option>Sim</option>
                <option>Não</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Endereço Completo</label>
              <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Renda Mensal (R$)</label>
              <input type="number" required value={formData.monthlyIncome} onChange={e => setFormData({...formData, monthlyIncome: Number(e.target.value)})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white" />
            </div>

            <div className="space-y-2 md:col-span-3">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Profissão / Cargo</label>
              <input type="text" required value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} className="w-full bg-matte-black border border-white/10 rounded-lg p-3 text-sm text-white" />
            </div>

            <div className="md:col-span-3 pt-4">
              <button className="w-full py-4 bg-brand-red text-white font-display text-lg tracking-[0.2em] hover:bg-brand-red-dark transition-all rounded-xl shadow-lg shadow-brand-red/20 flex items-center justify-center gap-3">
                <Shield size={20} /> ENVIAR PARA ANÁLISE (+20 PTS)
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-white/5 text-[10px] text-white/40 uppercase tracking-widest">
                <th className="px-6 py-4 font-normal">Cliente</th>
                <th className="px-6 py-4 font-normal">CPF</th>
                <th className="px-6 py-4 font-normal">Renda</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map((client, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-white">{client.name}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">{client.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/60">{client.cpf}</td>
                  <td className="px-6 py-4 text-xs text-white/60">R$ {client.monthlyIncome.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      client.status === 'Analise' ? "bg-white/5 text-white/40 border border-white/10" :
                      client.status === 'Aprovado' ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                      "bg-brand-red/10 text-brand-red border border-brand-red/20"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/10 text-white/40 rounded-lg transition-colors">
                      <FileText size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-white/20 italic">
                    Nenhuma ficha cadastrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
