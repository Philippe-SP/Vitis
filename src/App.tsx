import { useState } from 'react';
import { Wine, UtensilsCrossed, Droplets, PenLine, Grape } from 'lucide-react';
import Cepages from './pages/Cepages';
import Notes from './pages/Notes';
import Appellations from './pages/Appellations';
import Accords from './pages/Accords';

function App() {
  const [activeTab, setActiveTab] = useState('notes');

  const tabs = [
    { id: 'vins', label: 'Vins', icon: Wine },
    { id: 'accords', label: 'Accords', icon: UtensilsCrossed },
    { id: 'aromes', label: 'Arômes', icon: Droplets },
    { id: 'cepages', label: 'Cépages', icon: Grape },
    { id: 'notes', label: 'Notes', icon: PenLine },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'cepages': return <Cepages />;
      case 'vins': return <Appellations />;
      case 'accords': return <Accords />;
      case 'notes': return <Notes />;
      default: return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-stone-200/50 rounded-full flex items-center justify-center mb-6 text-stone-400">
            <Droplets size={40} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-stone-800 tracking-tight">Espace Sensoriel</h2>
          <p className="text-stone-500 mt-2 px-12 leading-relaxed text-sm">
            La roue des arômes interactive arrive pour affiner votre palais.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-vin-beige selection:bg-vin-bordeaux selection:text-white">
      
      {/* HEADER : Effet Verre Poli (Native Feel) */}
      <header className="fixed top-0 left-0 right-0 bg-vin-beige/80 backdrop-blur-xl border-b border-vin-bordeaux/5 z-[100] pt-8 pb-4">
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-[0.6em] text-stone-400 mb-1 font-black">
            {tabs.find(t => t.id === activeTab)?.label || 'Vitis'}
          </span>
          <h1 className="text-3xl font-serif font-bold text-vin-bordeaux uppercase tracking-[0.15em] drop-shadow-sm">
            Vitis
          </h1>
          <div className="w-12 h-[1.5px] bg-vin-bordeaux/20 mt-3 rounded-full"></div>
        </div>
      </header>

      {/* CONTENU : Scroll fluide */}
      <main className="flex-1 pt-40 pb-36 px-6 max-w-md mx-auto w-full overflow-x-hidden">
        <div 
          key={activeTab} 
          className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
        >
          {renderContent()}
        </div>
      </main>

      {/* NAVIGATION : Floating Dock Style (Glassmorphism Light) */}
      <div className="fixed bottom-8 left-0 right-0 z-[100] px-4">
        <nav className="max-w-md mx-auto bg-white/70 backdrop-blur-2xl border border-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] px-2 py-3 flex justify-around items-center h-20 rounded-[35px]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center justify-center flex-1 outline-none tap-highlight-transparent group"
              >
                {/* L'icône qui s'anime */}
                <div className={`p-3 rounded-2xl transition-all duration-500 ease-spring ${
                  isActive 
                    ? 'bg-vin-bordeaux text-white -translate-y-4 shadow-xl shadow-vin-bordeaux/25 scale-110' 
                    : 'text-stone-400 group-active:scale-90'
                }`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                {/* Label discret */}
                <span className={`text-[8px] absolute -bottom-1 font-black tracking-tighter uppercase transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0 text-vin-bordeaux' : 'opacity-30 translate-y-2'
                }`}>
                  {tab.label}
                </span>

                {/* Indicateur de point pour les onglets non-actifs au survol ou clic (optionnel) */}
                {!isActive && (
                  <div className="absolute bottom-1 w-1 h-1 bg-stone-200 rounded-full opacity-0 group-active:opacity-100"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overlay pour masquer le scroll sous la barre de navigation si nécessaire */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-vin-beige to-transparent pointer-events-none z-40"></div>
    </div>
  );
}

export default App;