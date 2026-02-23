import { BookOpen, Search, Grape, X, Filter } from 'lucide-react';
import { useState } from 'react';
import appelsData from '../data/appellations.json';
import type { Appellation } from '../types';

export default function Appellations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedAppel, setSelectedAppel] = useState<Appellation | null>(null);

  // Extraire les régions uniques pour les filtres
  const regions = Array.from(new Set(appelsData.map(a => a.region)));

  const filtered = appelsData.filter(a => {
    const matchesSearch = a.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         a.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? a.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* VUE DÉTAILS (MODALE) */}
      {selectedAppel && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-vin-bordeaux uppercase tracking-widest">{selectedAppel.region}</span>
                <h2 className="text-3xl font-serif font-bold text-stone-800">{selectedAppel.nom}</h2>
              </div>
              <button onClick={() => setSelectedAppel(null)} className="p-2 bg-stone-100 rounded-full text-stone-400">
                <X size={20} />
              </button>
            </div>
            
            <p className="text-stone-600 leading-relaxed mb-6 italic">
              "{selectedAppel.description}"
            </p>

            <div className="space-y-4 border-t border-stone-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                  <Grape size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-stone-400 font-bold">Cépages principaux</p>
                  <p className="text-sm font-semibold text-stone-700">{selectedAppel.cepages.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Filter size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-stone-400 font-bold">Style de vin</p>
                  <p className="text-sm font-semibold text-stone-700">{selectedAppel.style}</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedAppel(null)}
              className="w-full mt-8 bg-stone-800 text-white py-4 rounded-2xl font-bold"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* HEADER & RECHERCHE */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-vin-bordeaux/10 rounded-lg text-vin-bordeaux">
          <BookOpen size={24} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-800">Appellations</h2>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-vin-bordeaux/20 focus:border-vin-bordeaux"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FILTRES PAR RÉGION */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button 
            onClick={() => setSelectedRegion(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${!selectedRegion ? 'bg-vin-bordeaux text-white' : 'bg-white text-stone-500 border border-stone-200'}`}
          >
            Toutes
          </button>
          {regions.map(r => (
            <button 
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${selectedRegion === r ? 'bg-vin-bordeaux text-white' : 'bg-white text-stone-500 border border-stone-200'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* LISTE */}
      <div className="space-y-3">
        {filtered.map((app) => (
          <div 
            key={app.nom} 
            onClick={() => setSelectedAppel(app)}
            className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex justify-between items-center active:scale-[0.98] transition-transform"
          >
            <div>
              <h3 className="font-bold text-stone-800">{app.nom}</h3>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{app.region}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-vin-bordeaux/5 text-vin-bordeaux px-2 py-1 rounded font-bold">
                {app.style}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}