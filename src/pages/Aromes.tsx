import { useState } from 'react';
import { Wind, ChevronRight, Beaker } from 'lucide-react';
import aromesData from '../data/aromes.json';

export default function Aromes() {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-xl">
          <Beaker className="text-amber-600" size={24} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-800">Roue des Arômes</h2>
      </div>

      <div className="space-y-4">
        {aromesData.map((cat) => (
          <div key={cat.categorie} className="overflow-hidden">
            <button
              onClick={() => setActiveCat(activeCat === cat.categorie ? null : cat.categorie)}
              className="w-full flex items-center justify-between p-5 bg-white rounded-[24px] border border-stone-100 shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: cat.couleur }} 
                />
                <span className="font-bold text-stone-700 text-lg">{cat.categorie}</span>
              </div>
              <ChevronRight 
                className={`text-stone-300 transition-transform duration-300 ${activeCat === cat.categorie ? 'rotate-90' : ''}`} 
              />
            </button>

            {/* Sous-catégories et Items */}
            <div className={`grid transition-all duration-300 ease-in-out ${activeCat === cat.categorie ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden space-y-3 px-2">
                {cat.sousCategories.map((sub) => (
                  <div key={sub.nom} className="bg-stone-50/50 p-4 rounded-[20px] border border-stone-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">
                      {sub.nom}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {sub.items.map((item) => (
                        <span 
                          key={item}
                          className="px-3 py-1.5 bg-white border border-stone-200 text-stone-600 rounded-xl text-xs font-medium shadow-sm italic"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-vin-bordeaux/5 rounded-[32px] border border-vin-bordeaux/10">
        <div className="flex gap-3">
          <Wind className="text-vin-bordeaux shrink-0" size={20} />
          <p className="text-xs text-stone-500 leading-relaxed">
            <strong>Conseil pro :</strong> Ne cherchez pas l'arôme précis tout de suite. Partez de la catégorie (ex: Fruité), puis demandez-vous si c'est plutôt rouge ou noir, et enfin l'arôme viendra naturellement.
          </p>
        </div>
      </div>
    </div>
  );
}