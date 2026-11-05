import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Name typed in the registration form. Set right before the account is created so the
// auth listener (the single place that creates the Firestore profile) can use it.
let pendingRegistrationName: string | null = null;
export const setPendingRegistrationName = (name: string | null) => {
  pendingRegistrationName = name;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        try {
          const profileRef = doc(db, 'users', authUser.uid);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            setProfile(profileSnap.data() as UserProfile);
          } else {
            // First login / just registered: create the profile once, here.
            const isAnalystAccount = authUser.email === 'rafacar93@elite.com';
            const newProfile: UserProfile = {
              uid: authUser.uid,
              name: pendingRegistrationName?.trim() || authUser.displayName || 'Usuário Elite',
              email: authUser.email || '',
              role: isAnalystAccount ? 'ANALYST' : 'AFFILIATE',
              rank: 'START',
              points: 0,
              createdAt: Date.now(),
            };
            pendingRegistrationName = null;
            await setDoc(profileRef, newProfile);
            setProfile(newProfile);
          }
        } catch (err) {
          console.error('Erro ao carregar/criar perfil:', err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
