import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';
import { Lead, TestDrive, CreditRequest, Sale, UserProfile, UserRank, CreditSimulation, Client } from '../types';
import { auth } from '../services/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface EliteClubContextType {
  leads: Lead[];
  clients: Client[];
  testDrives: TestDrive[];
  creditRequests: CreditRequest[];
  creditSimulations: CreditSimulation[];
  sales: Sale[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status' | 'userId' | 'stage' | 'notes'> & { source: Lead['source'] }) => Promise<void>;
  updateLeadStage: (id: string, stage: Lead['stage']) => Promise<void>;
  addLeadNote: (id: string, text: string) => Promise<void>;
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  scheduleTestDrive: (td: Omit<TestDrive, 'id' | 'status' | 'userId'>) => Promise<void>;
  simulateCredit: (sim: Omit<CreditSimulation, 'id' | 'status' | 'userId' | 'createdAt'>) => Promise<void>;
  requestCredit: (cr: Omit<CreditRequest, 'id' | 'status' | 'submittedAt' | 'userId'>) => Promise<void>;
  completeSale: (sale: Omit<Sale, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  validateLead: (id: string) => Promise<void>;
  completeTestDrive: (id: string) => Promise<void>;
  approveCredit: (id: string) => Promise<void>;
}

const EliteClubContext = createContext<EliteClubContextType | undefined>(undefined);

export const POINT_VALUES = {
  LEAD_VALIDO: 10,
  TEST_DRIVE: 25,
  CREDITO_APROVADO: 40,
  VENDA_CONCLUIDA: 100,
  NOVO_AFILIADO: 50,
};

export const EliteClubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const [creditRequests, setCreditRequests] = useState<CreditRequest[]>([]);
  const [creditSimulations, setCreditSimulations] = useState<CreditSimulation[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    if (!user || !profile) return;

    // Leads logic: If Analyst/Admin, see all. If Affiliate, only theirs.
    const isSpecialRole = profile.role === 'ANALYST' || profile.role === 'ADMIN';
    
    const leadsQuery = isSpecialRole
      ? collection(db, 'leads')
      : query(collection(db, 'leads'), where('userId', '==', user.uid));
    
    const unsubLeads = onSnapshot(leadsQuery, (snapshot) => {
      setLeads(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'leads'));

    const unsubClients = onSnapshot(
      isSpecialRole
        ? collection(db, 'clients')
        : query(collection(db, 'clients'), where('userId', '==', user.uid)),
      (snapshot) => {
        setClients(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Client)));
      }, (err) => handleFirestoreError(err, OperationType.LIST, 'clients')
    );

    const unsubTDs = onSnapshot(
      isSpecialRole
        ? collection(db, 'testDrives')
        : query(collection(db, 'testDrives'), where('userId', '==', user.uid)), 
      (snapshot) => {
        setTestDrives(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as TestDrive)));
      }, (err) => handleFirestoreError(err, OperationType.LIST, 'testDrives')
    );

    const unsubCRs = onSnapshot(
      isSpecialRole
        ? collection(db, 'creditRequests')
        : query(collection(db, 'creditRequests'), where('userId', '==', user.uid)), 
      (snapshot) => {
        setCreditRequests(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CreditRequest)));
      }, (err) => handleFirestoreError(err, OperationType.LIST, 'creditRequests')
    );

    const unsubSales = onSnapshot(
      isSpecialRole
        ? collection(db, 'sales')
        : query(collection(db, 'sales'), where('userId', '==', user.uid)),
      (snapshot) => {
        setSales(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Sale)));
      }, (err) => handleFirestoreError(err, OperationType.LIST, 'sales')
    );

    // Credit Simulations: ONLY ANALYSTS AND ADMINS
    let unsubSims = () => {};
    if (isSpecialRole) {
      unsubSims = onSnapshot(collection(db, 'creditSimulations'), (snapshot) => {
        setCreditSimulations(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CreditSimulation)));
      }, (err) => handleFirestoreError(err, OperationType.LIST, 'creditSimulations'));
    }

    return () => { 
      unsubLeads(); 
      unsubClients(); 
      unsubTDs(); 
      unsubCRs(); 
      unsubSales(); 
      unsubSims();
    };
  }, [user, profile]);

  const addPoints = async (points: number) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userRef, {
        points: increment(points)
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'userId' | 'stage' | 'notes'> & { source: Lead['source'] }) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'leads'), {
        ...leadData,
        userId: user.uid,
        status: 'Pendente',
        stage: 'Novo',
        notes: [],
        createdAt: Date.now()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'leads');
    }
  };

  const addClient = async (clientData: Omit<Client, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'clients'), {
        ...clientData,
        userId: user.uid,
        createdAt: Date.now()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'clients');
    }
  };

  const completeLesson = async (lessonId: string) => {
    if (!user || !profile) return;
    const progress = profile.universityProgress || [];
    if (progress.includes(lessonId)) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        universityProgress: [...progress, lessonId]
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), data);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const updateLeadStage = async (id: string, stage: Lead['stage']) => {
    try {
      await updateDoc(doc(db, 'leads', id), { stage });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${id}`);
    }
  };

  const addLeadNote = async (id: string, text: string) => {
    const leadRef = doc(db, 'leads', id);
    try {
      const leadSnap = await getDoc(leadRef);
      if (leadSnap.exists()) {
        const currentNotes = leadSnap.data().notes || [];
        const newNote = {
          id: Math.random().toString(36).substr(2, 9),
          text,
          createdAt: Date.now()
        };
        await updateDoc(leadRef, {
          notes: [...currentNotes, newNote]
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${id}`);
    }
  };

  const scheduleTestDrive = async (tdData: Omit<TestDrive, 'id' | 'status' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'testDrives'), {
        ...tdData,
        userId: user.uid,
        status: 'Agendado'
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'testDrives');
    }
  };

  const simulateCredit = async (simData: Omit<CreditSimulation, 'id' | 'status' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'creditSimulations'), {
        ...simData,
        userId: user.uid,
        status: 'Pending',
        createdAt: Date.now()
      });

      // WhatsApp Redirection
      const phoneNumber = '5515997263088';
      const message = encodeURIComponent(
        `🚀 *NOVA SIMULAÇÃO RAFACAR ELITE*\n\n` +
        `👤 *Afiliado:* ${profile?.name || 'Não identificado'}\n` +
        `🆔 *CPF:* ${simData.cpf}\n` +
        `📅 *Nascimento:* ${simData.birthDate}\n` +
        `📱 *Contato Cliente:* ${simData.phone}\n` +
        `🪪 *Possui CNH:* ${simData.hasCNH ? 'SIM' : 'NÃO'}\n\n` +
        `_Enviado via Dashboard RafaCar Elite Club_`
      );
      
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'creditSimulations');
    }
  };

  const requestCredit = async (crData: Omit<CreditRequest, 'id' | 'status' | 'submittedAt' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'creditRequests'), {
        ...crData,
        userId: user.uid,
        status: 'Em Análise',
        submittedAt: Date.now()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'creditRequests');
    }
  };

  const completeSale = async (saleData: Omit<Sale, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'sales'), {
        ...saleData,
        userId: user.uid,
        createdAt: Date.now()
      });
      await addPoints(POINT_VALUES.VENDA_CONCLUIDA);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'sales');
    }
  };

  const validateLead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: 'Validado' });
      await addPoints(POINT_VALUES.LEAD_VALIDO);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${id}`);
    }
  };

  const completeTestDrive = async (id: string) => {
    try {
      await updateDoc(doc(db, 'testDrives', id), { status: 'Concluído' });
      await addPoints(POINT_VALUES.TEST_DRIVE);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `testDrives/${id}`);
    }
  };

  const approveCredit = async (id: string) => {
    try {
      await updateDoc(doc(db, 'creditRequests', id), { status: 'Aprovado' });
      await addPoints(POINT_VALUES.CREDITO_APROVADO);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `creditRequests/${id}`);
    }
  };

  return (
    <EliteClubContext.Provider value={{
      leads, clients, testDrives, creditRequests, creditSimulations, sales,
      addLead, updateLeadStage, addLeadNote, addClient, completeLesson, updateProfile,
      scheduleTestDrive, simulateCredit, requestCredit, completeSale,
      validateLead, completeTestDrive, approveCredit
    }}>
      {children}
    </EliteClubContext.Provider>
  );
};

export const useEliteClub = () => {
  const context = useContext(EliteClubContext);
  if (!context) throw new Error('useEliteClub must be used within an EliteClubProvider');
  return context;
};
