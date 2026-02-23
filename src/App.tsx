import { useState } from 'react';
import { Map, BookOpen, Droplets, PenLine, Grape } from 'lucide-react';
// Import des pages
import Cepages from './pages/Cepages';
import Notes from './pages/Notes';
import Appellations from './pages/Appellations';

function App() {
  const [activeTab, setActiveTab] = useState('notes');

  // Configuration des onglets
  const tabs = [
    { id: 'regions', label: 'Régions', icon: Map },
    { id: 'appellations', label: 'Appels', icon: BookOpen },
    { id: 'aromes', label: 'Arômes', icon: Droplets },
    { id: 'cepages', label: 'Cépages', icon: Grape },
    { id: 'notes', label: 'Notes', icon: PenLine },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'cepages': return <Cepages />;
      case 'appellations': return <Appellations />;
      case 'notes': return <Notes />;
      default: return (
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-stone-800 capitalize">{activeTab}</h2>
          <p className="text-stone-500 mt-2">Le contenu de cette section arrive bientôt !</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-vin-beige">
      {/* HEADER FIXE */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-stone-200 z-50 p-4">
        <h1 className="text-2xl font-serif font-bold text-vin-bordeaux text-center uppercase tracking-[0.2em]">
          Vitis
        </h1>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 pt-24 pb-28 px-6 max-w-md mx-auto w-full">
        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </main>

      {/* NAVIGATION BASSE (TAB BAR) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-4 pb-6 pt-3 flex justify-around items-center h-24 shadow-[0_-10px_25px_rgba(0,0,0,0.03)] z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
                isActive ? 'text-vin-bordeaux' : 'text-stone-400'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-vin-bordeaux/5' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-1 font-bold tracking-wide uppercase ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
              
              {/* Point indicateur */}
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-vin-bordeaux rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;