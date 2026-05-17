import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Maximize, Minimize, 
  LayoutDashboard, Users, Car, ShieldCheck, Presentation,
  Settings, LogOut, Share2, GraduationCap, Briefcase, Landmark, UserCheck,
  Menu, X, Rocket
} from 'lucide-react';
import { cn } from './lib/utils';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EliteClubProvider } from './context/EliteClubContext';
import { auth } from './services/firebase';
import { signOut } from 'firebase/auth';

// Components
import Login from './components/Login';
import OnboardingDashboard from './components/dashboard/OnboardingDashboard';
import LeadManager from './components/dashboard/LeadManager';
import TestDriveScheduler from './components/dashboard/TestDriveScheduler';
import CreditAppCenter from './components/dashboard/CreditAppCenter';
import NetworkView from './components/dashboard/NetworkView';
import ClientManager from './components/dashboard/ClientManager';
import University from './components/dashboard/University';
import ResourceCenter from './components/dashboard/ResourceCenter';
import CreditLines from './components/dashboard/CreditLines';
import UserSettings from './components/dashboard/UserSettings';
import InventoryView from './components/dashboard/InventoryView';

// ... (keep slides)

// Slides
import Capa from './slides/Capa';
import OQueE from './slides/OQueE';
import ComoFunciona from './slides/ComoFunciona';
import Hierarquia from './slides/Hierarquia';
import ModeloReceita from './slides/ModeloReceita';
import SistemaComissoes from './slides/SistemaComissoes';
import ExemploCrescimento from './slides/ExemploCrescimento';
import ExemploGold from './slides/ExemploGold';
import ModeloPlatinum from './slides/ModeloPlatinum';
import ModeloDiamante from './slides/ModeloDiamante';
import SistemaPontos from './slides/SistemaPontos';
import Conduta from './slides/Conduta';
import VisaoFuturo from './slides/VisaoFuturo';
import Encerramento from './slides/Encerramento';

const slides = [
  Capa, OQueE, ComoFunciona, Hierarquia, ModeloReceita,
  SistemaComissoes, ExemploCrescimento, ExemploGold,
  ModeloPlatinum, ModeloDiamante, SistemaPontos, 
  Conduta, VisaoFuturo, Encerramento
];

type AppMode = 'presentation' | 'dashboard';
type DashboardView = 'overview' | 'leads' | 'clients' | 'test-drives' | 'credit' | 'network' | 'university' | 'resources' | 'credit-lines' | 'settings' | 'inventory';

export default function App() {
  return (
    <AuthProvider>
      <EliteClubProvider>
        <AppContent />
      </EliteClubProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, profile } = useAuth();
  const [appMode, setAppMode] = useState<AppMode>('presentation');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dashboardView, setDashboardView] = useState<DashboardView>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (appMode === 'presentation') {
        if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navigateTo = (view: DashboardView) => {
    setAppMode('dashboard');
    setDashboardView(view);
    setIsMobileMenuOpen(false);
  };

  const CurrentSlideComponent = slides[currentSlide];

  if (!user) {
    return <Login />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-matte-black premium-gradient selection:bg-brand-red/30 flex">
      {/* Mobile Menu Button (Top Left) */}
      <div className="lg:hidden fixed top-6 left-6 z-50 flex gap-2">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-brand-red text-white rounded-xl shadow-lg shadow-brand-red/20 active:scale-95 transition-transform"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <button 
          onClick={() => setShowAppModal(true)}
          className="p-3 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-xl active:scale-95 transition-transform"
        >
          <Rocket size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-surface border-r border-border-dim p-8 flex flex-col gap-8 shrink-0 transition-all duration-300 z-40",
        "fixed inset-y-0 left-0 lg:relative lg:translate-x-0 outline-none",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col items-center mb-4">
          <img 
            src="https://artifact.static-content.com/snapshot/69c1ce34-58a2-4a00-9e66-6b6febb42464/logo_rafacar.png" 
            alt="Rafacar Motors" 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-1">
          <div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-display mb-4">Principal</p>
            <nav className="space-y-1">
              <SidebarItem 
                icon={Presentation} 
                label="Apresentação" 
                active={appMode === 'presentation'} 
                onClick={() => { setAppMode('presentation'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={GraduationCap} 
                label="Universidade" 
                active={appMode === 'dashboard' && dashboardView === 'university'} 
                onClick={() => navigateTo('university')} 
              />
              <SidebarItem 
                icon={LayoutDashboard} 
                label="Visão Geral" 
                active={appMode === 'dashboard' && dashboardView === 'overview'} 
                onClick={() => navigateTo('overview')} 
              />
              <SidebarItem 
                icon={Share2} 
                label="Rede Elite" 
                active={appMode === 'dashboard' && dashboardView === 'network'} 
                onClick={() => navigateTo('network')} 
              />
            </nav>
          </div>

          <div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-display mb-4">Operacional</p>
            <nav className="space-y-1">
              <SidebarItem 
                icon={Car} 
                label="Veículos COM garantia" 
                active={appMode === 'dashboard' && dashboardView === 'inventory'} 
                onClick={() => navigateTo('inventory')} 
              />
              <SidebarItem 
                icon={Users} 
                label="Meus Leads" 
                active={appMode === 'dashboard' && dashboardView === 'leads'} 
                onClick={() => navigateTo('leads')} 
              />
              <SidebarItem 
                icon={UserCheck} 
                label="Ficha Cliente" 
                active={appMode === 'dashboard' && dashboardView === 'clients'} 
                onClick={() => navigateTo('clients')} 
              />
              <SidebarItem 
                icon={Car} 
                label="Test Drives" 
                active={appMode === 'dashboard' && dashboardView === 'test-drives'} 
                onClick={() => navigateTo('test-drives')} 
              />
              <SidebarItem 
                icon={ShieldCheck} 
                label="Crédito Elite" 
                active={appMode === 'dashboard' && dashboardView === 'credit'} 
                onClick={() => navigateTo('credit')} 
              />
              <SidebarItem 
                icon={Landmark} 
                label="Linhas de Crédito" 
                active={appMode === 'dashboard' && dashboardView === 'credit-lines'} 
                onClick={() => navigateTo('credit-lines')} 
              />
            </nav>
          </div>

          <div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-display mb-4">Suporte & Setup</p>
            <nav className="space-y-1">
              <SidebarItem 
                icon={Briefcase} 
                label="Nossos Recursos" 
                active={appMode === 'dashboard' && dashboardView === 'resources'} 
                onClick={() => navigateTo('resources')} 
              />
              <SidebarItem 
                icon={Settings} 
                label="Minha Conta" 
                active={appMode === 'dashboard' && dashboardView === 'settings'} 
                onClick={() => navigateTo('settings')} 
              />
              <SidebarItem icon={LogOut} label="Sair" active={false} onClick={handleLogout} />
            </nav>
          </div>
          
          <button 
             onClick={() => setShowAppModal(true)}
             className="mt-6 w-full p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl flex items-center gap-3 group hover:bg-brand-red transition-all"
           >
             <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand-red">
                <Rocket size={16} />
             </div>
             <div className="text-left">
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none group-hover:text-white/60 mb-1">Mobile</p>
                <p className="text-xs text-white font-bold group-hover:text-white">BAIXAR APP</p>
             </div>
           </button>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center font-bold text-white text-xs">
              {profile?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'JD'}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{profile?.name || 'Carregando...'}</p>
              <p className="text-[10px] text-brand-red uppercase tracking-tighter">{profile?.role === 'ANALYST' ? 'Analista de Crédito' : profile?.role === 'ADMIN' ? 'Administrador' : 'Parceiro Elite'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Container */}
      <div className="flex-1 h-full flex flex-col relative overflow-hidden">
        {/* Header content change depending on mode */}
        <header className="p-6 lg:p-8 pb-0 flex justify-between items-end shrink-0">
          <div className="pl-16 lg:pl-0">
             <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
              {appMode === 'presentation' ? 'Pitch de Expansão' : 
               dashboardView === 'overview' ? 'Meus Resultados' : 
               dashboardView === 'leads' ? 'Expansão de Rede' : 
               dashboardView === 'clients' ? 'Cadastro de Cliente' : 
               dashboardView === 'university' ? 'Universidade RafaCar' : 
               dashboardView === 'resources' ? 'Recursos & Vantagens' : 
               dashboardView === 'credit-lines' ? 'Linhas de Crédito' : 
               dashboardView === 'settings' ? 'Configurações' : 
               dashboardView === 'network' ? 'Sua Linhagem' : 
               dashboardView === 'test-drives' ? 'Operacional' : 'Crédito e Capital'}
            </h2>
            <p className="text-sm font-body italic text-brand-red font-light opacity-80 transition-all">
              {appMode === 'presentation' ? '“Quem constrói equipe, constrói patrimônio.”' : 'Ambiente seguro de alta performance RafaCar.'}
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Status do Clube</p>
            <p className="text-sm font-bold text-silver uppercase tracking-widest">ONBOARDING ATIVO</p>
          </div>
        </header>

        <div className="flex-1 w-full flex flex-col overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={appMode === 'presentation' ? `slide-${currentSlide}` : `view-${dashboardView}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-10"
            >
              {appMode === 'presentation' ? (
                <CurrentSlideComponent />
              ) : (
                <>
                  {dashboardView === 'overview' && <OnboardingDashboard />}
                  {dashboardView === 'inventory' && <InventoryView />}
                  {dashboardView === 'leads' && <LeadManager />}
                  {dashboardView === 'clients' && <ClientManager />}
                  {dashboardView === 'university' && <University />}
                  {dashboardView === 'resources' && <ResourceCenter />}
                  {dashboardView === 'credit-lines' && <CreditLines />}
                  {dashboardView === 'settings' && <UserSettings />}
                  {dashboardView === 'test-drives' && <TestDriveScheduler />}
                  {dashboardView === 'credit' && <CreditAppCenter />}
                  {dashboardView === 'network' && <NetworkView />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Controls */}
        <footer className="p-8 pt-0 flex items-center justify-between pointer-events-none shrink-0 relative z-20">
          <div className="flex gap-3 pointer-events-auto">
             <button 
              onClick={toggleFullscreen}
              className="p-3 glass-card hover:border-brand-red/50 transition-all text-white/50 hover:text-brand-red"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>

          {appMode === 'presentation' && (
            <div className="flex-1 max-w-md mx-10 pointer-events-auto flex flex-col items-center">
              <div className="h-1 w-full bg-border-dim rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-brand-red"
                  initial={false}
                  animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                {slides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={cn(
                      "w-1 h-1 rounded-full transition-all duration-300",
                      currentSlide === i ? "bg-brand-red w-4" : "bg-white/10 hover:bg-white/30"
                    )}
                    title={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <p className="text-[8px] uppercase tracking-[0.4em] font-display text-white/20">Slide {currentSlide + 1} de {slides.length}</p>
            </div>
          )}

          <div className="flex gap-3 pointer-events-auto ml-auto">
            {appMode === 'presentation' ? (
              <>
                <button 
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={cn(
                    "p-3 glass-card transition-all flex items-center justify-center",
                    currentSlide === 0 ? "opacity-10 cursor-not-allowed" : "hover:border-brand-red/50 text-white/70 hover:text-brand-red"
                  )}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className={cn(
                    "p-3 glass-card transition-all flex items-center justify-center",
                    currentSlide === slides.length - 1 ? "opacity-10 cursor-not-allowed" : "hover:border-brand-red/50 text-white/70 hover:text-brand-red"
                  )}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : (
              <div className="text-[10px] font-display text-white/20 uppercase tracking-[0.4em] flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                 Plataforma Cloud Ativa
              </div>
            )}
          </div>
        </footer>
      </div>

      {/* App Download Modal */}
      {showAppModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             onClick={() => setShowAppModal(false)}
             className="absolute inset-0 bg-black/90 backdrop-blur-xl"
           />
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             className="relative w-full max-w-lg glass-card border-brand-red/30 p-8 sm:p-12 overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Rocket size={120} className="text-brand-red" />
              </div>

              <button 
                onClick={() => setShowAppModal(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="relative z-10 space-y-8">
                 <div className="space-y-4">
                    <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand-red/40">
                       <Rocket size={32} />
                    </div>
                    <h3 className="font-display text-4xl text-white italic uppercase font-black leading-none">RafaCar Elite <br/> <span className="red-text">DOWNLOAD</span></h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                       Tenha em mãos a plataforma de vendas automotivas mais potente do Brasil. Sincronização em tempo real e notificações de novos leads.
                    </p>
                 </div>

                 <div className="space-y-6">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                       <p className="text-[10px] text-brand-red uppercase tracking-widest font-bold">Passo 01</p>
                       <p className="text-xs text-white">Solicite o arquivo APK através do menu Exportar Código na plataforma.</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                       <p className="text-[10px] text-brand-red uppercase tracking-widest font-bold">Passo 02</p>
                       <p className="text-xs text-white">Habilite "Fontes Desconhecidas" nas configurações do seu Android.</p>
                    </div>
                    <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded-2xl space-y-2">
                       <p className="text-[10px] text-brand-red uppercase tracking-widest font-bold">Google Play Store</p>
                       <p className="text-xs text-white italic">Estamos em fase final de homologação. O link direto estará disponível aqui em breve!</p>
                    </div>
                 </div>

                 <button 
                   onClick={() => window.open('https://play.google.com/store/apps', '_blank')}
                   className="w-full py-5 bg-brand-red text-white font-display text-sm tracking-widest font-black uppercase hover:bg-brand-red-dark transition-all rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-brand-red/20"
                 >
                    PRÉ-REGISTRO GOOGLE PLAY
                 </button>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
}

interface SidebarItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all border group",
        active 
          ? "bg-brand-red/10 border-brand-red text-brand-red font-bold shadow-[0_0_15px_rgba(227,27,35,0.05)]" 
          : "border-transparent text-white/40 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon size={16} className={cn("transition-colors", active ? "text-brand-red" : "text-white/20 group-hover:text-brand-red")} />
      <span className="uppercase tracking-widest">{label}</span>
    </button>
  );
}
