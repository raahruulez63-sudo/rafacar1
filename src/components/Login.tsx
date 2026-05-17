import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserPlus, LogIn, Mail, Lock, User as UserIcon, Chrome, Facebook, Instagram } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserProfile } from '../types';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createProfileIfNeeded = async (user: any) => {
    const profileRef = doc(db, 'users', user.uid);
    const profileSnap = await getDoc(profileRef);
    
    if (!profileSnap.exists()) {
      const profile: UserProfile = {
        uid: user.uid,
        name: user.displayName || 'Usuário Elite',
        email: user.email || '',
        role: 'AFFILIATE',
        rank: 'START',
        points: 0,
        createdAt: Date.now(),
      };
      await setDoc(profileRef, profile);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createProfileIfNeeded(result.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createProfileIfNeeded(result.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let finalEmail = email;
      if (email.toLowerCase() === 'rafacar93') {
        finalEmail = 'rafacar93@elite.com';
      }

      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, finalEmail, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        const isAnalystAccount = finalEmail === 'rafacar93@elite.com';
        const profile: UserProfile = {
          uid: userCredential.user.uid,
          name,
          email: finalEmail,
          role: isAnalystAccount ? 'ANALYST' : 'AFFILIATE',
          rank: 'START',
          points: 0,
          createdAt: Date.now(),
        };
        await setDoc(doc(db, 'users', userCredential.user.uid), profile);
      } else {
        await signInWithEmailAndPassword(auth, finalEmail, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-matte-black p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 border-brand-red/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-red" />
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="https://artifact.static-content.com/snapshot/69c1ce34-58a2-4a00-9e66-6b6febb42464/logo_rafacar.png" 
              alt="Rafacar Motors" 
              className="w-48 h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-xl font-display text-white mt-2 tracking-widest uppercase">
            {isRegistering ? 'Criar Conta Elite' : 'Acesso Restrito'}
          </h2>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand-red/30 transition-all group"
          >
            <Chrome size={20} className="text-white/40 group-hover:text-brand-red transition-colors" />
          </button>
          <button 
            onClick={handleFacebookLogin}
            disabled={loading}
            type="button"
            className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand-red/30 transition-all group"
          >
            <Facebook size={20} className="text-white/40 group-hover:text-brand-red transition-colors" />
          </button>
          <button 
            disabled={loading}
            type="button"
            className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand-red/30 transition-all group"
          >
            <Instagram size={20} className="text-white/40 group-hover:text-brand-red transition-colors" />
          </button>
        </div>

        <div className="relative mb-8">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
           <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] font-display text-white/20"><span className="bg-matte-black px-4">Ou via Email</span></div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegistering && (
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                <UserIcon size={10} /> Nome Completo
              </label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-brand-red/50 transition-all"
                placeholder="Ex: João da Silva"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Mail size={10} /> Email
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-brand-red/50 transition-all"
              placeholder="parceiro@rafacar.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Lock size={10} /> Senha
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-brand-red/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-brand-red text-[10px] uppercase font-bold tracking-wider animate-pulse pt-2">
               {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-brand-red text-white font-display text-lg tracking-[0.2em] shadow-lg shadow-brand-red/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 mt-4"
          >
            {loading ? 'PROCESSANDO...' : isRegistering ? 'CADASTRAR' : 'ENTRAR NO CLUB'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[10px] text-brand-red uppercase tracking-[0.3em] font-bold hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            {isRegistering ? <LogIn size={10} /> : <UserPlus size={10} />}
            {isRegistering ? 'VOLTAR PARA LOGIN' : 'AINDA NÃO É PARCEIRO?'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
