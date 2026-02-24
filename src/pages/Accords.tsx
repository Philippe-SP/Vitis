import { useState } from 'react';
import { Utensils, UtensilsCrossed, Search } from 'lucide-react';
import type { Accord } from '../types';
import accordsFromages from '../data/accords_fromages.json';
import accordsPlats from '../data/accords_plats.json';

export default function Accords() {
  const [activeSubTab, setActiveSubTab] = useState<'plats' | 'fromages'>('plats');
  const [search, setSearch] = useState('');

  // 1. On choisit la source de données
  const currentData: Accord[] = activeSubTab === 'fromages' 
    ? (accordsFromages as Accord[]) 
    : (accordsPlats as Accord[]);

  // 2. On filtre selon la recherche
  const filteredData = currentData.filter(item => 
    item.nom.toLowerCase().includes(search.toLowerCase()) ||
    item.famille.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Switcher Plats / Fromages */}
      <div className="flex bg-stone-200 p-1 rounded-2xl">
        <button 
          onClick={() => { setActiveSubTab('plats'); setSearch(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeSubTab === 'plats' ? 'bg-white shadow-sm text-vin-bordeaux' : 'text-stone-500'}`}
        >
          <Utensils size={18} /> Plats
        </button>
        <button 
          onClick={() => { setActiveSubTab('fromages'); setSearch(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeSubTab === 'fromages' ? 'bg-white shadow-sm text-vin-bordeaux' : 'text-stone-500'}`}
        >
          <UtensilsCrossed size={18} /> Fromages
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
        <input 
          type="text"
          placeholder={`Chercher un ${activeSubTab === 'plats' ? 'plat' : 'fromage'}...`}
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-vin-bordeaux/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Liste des résultats */}
      <div className="space-y-4 pb-20">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.nom} className="bg-white p-5 rounded-3xl border border-stone-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-stone-800 leading-tight">{item.nom}</h3>
                <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded-lg uppercase font-bold whitespace-nowrap ml-2">
                  {item.famille}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {item.vins.map(vin => (
                  <span key={vin} className="text-xs bg-vin-bordeaux/5 text-vin-bordeaux px-3 py-1 rounded-full border border-vin-bordeaux/10 font-medium">
                    {vin}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-stone-500 italic border-l-2 border-vin-bordeaux/20 pl-3">
                {item.conseil}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-stone-400 italic">
            Aucun résultat pour "{search}"
          </div>
        )}
      </div>
    </div>
  );
}