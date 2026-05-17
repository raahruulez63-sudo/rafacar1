export interface Vehicle {
  id: string;
  title: string;
  price: number;
  image: string;
  year?: string;
  km?: string;
  fuel?: string;
  transmission?: string;
  brand?: string;
}

export type UserRank = 'START' | 'BLACK' | 'GOLD' | 'PLATINUM' | 'DIAMANTE';
export type UserRole = 'AFFILIATE' | 'ANALYST' | 'ADMIN';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  rank: UserRank;
  points: number;
  referredBy?: string; // UID of the parent affiliate
  networkPath?: string; // Comma separated UIDs (lineage)
  socialConnections?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  universityProgress?: string[]; // IDs of completed lessons
  createdAt: number;
}

export interface Client {
  id: string;
  userId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  maritalStatus: string;
  address: string;
  occupation: string;
  monthlyIncome: number;
  hasCNH: boolean;
  notes?: string;
  status: 'Lead' | 'Analise' | 'Aprovado' | 'Vendido' | 'Recusado';
  createdAt: number;
}

export interface UniversityLesson {
  id: string;
  category: string;
  title: string;
  desc: string;
  duration: string;
  thumbnail: string;
}

export interface Lead {
  id: string;
  userId: string; // The affiliate who owns the lead
  name: string;
  phone: string;
  email: string;
  source: 'Manual' | 'WhatsApp' | 'Instagram' | 'Facebook' | 'Other';
  stage: 'Novo' | 'Contatado' | 'Negociando' | 'Fechado' | 'Perdido';
  notes: LeadNote[];
  status: 'Pendente' | 'Validado' | 'Convertido' | 'Descartado';
  createdAt: number;
}

export interface LeadNote {
  id: string;
  text: string;
  createdAt: number;
}

export interface TestDrive {
  id: string;
  userId: string;
  leadId: string;
  carModel: string;
  scheduledAt: number;
  status: 'Agendado' | 'Concluído' | 'Cancelado';
}

export interface CreditSimulation {
  id: string;
  userId: string;
  cpf: string;
  birthDate: string;
  phone: string;
  hasCNH: boolean;
  status: 'Pending' | 'Processed';
  createdAt: number;
}

export interface CreditRequest {
  id: string;
  userId: string;
  leadId: string;
  amount: number;
  status: 'Em Análise' | 'Aprovado' | 'Reprovado';
  submittedAt: number;
}

export interface Sale {
  id: string;
  userId: string;
  leadId: string;
  carModel: string;
  value: number;
  commission: number;
  createdAt: number;
}
