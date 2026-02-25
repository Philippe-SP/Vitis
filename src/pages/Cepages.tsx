import { useState } from 'react';
import { Grape, X, Activity, Droplets, Wind, Zap } from 'lucide-react';
import cepagesData from '../data/cepages.json';

export default function Cepages() {
  const [selectedCepage, setSelectedCepage] = useState<any | null>(null);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-vin-bordeaux/10 rounded-xl">
          <Grape className="text-vin-bordeaux" size={24} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-800">Cépages</h2>
      </div>

      <div className="grid gap-4">
        {cepagesData.map((c) => (
          <div 
            key={c.nom} 
            onClick={() => setSelectedCepage(c)}
            className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100 transition-all active:scale-95 hover:border-vin-bordeaux/20"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-xl text-stone-800">{c.nom}</h3>
              <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-lg font-black border ${
                c.type === 'Rouge' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                {c.type}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-medium mb-3 flex items-center gap-1">
              <span className="text-vin-bordeaux">●</span> {c.aromes.join(' • ')}
            </p>
          </div>
        ))}
      </div>

      {selectedCepage && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-stone-900/80 backdrop-blur-md p-4 transition-all overflow-y-auto">
          {/* Overlay de fermeture */}
          <div className="absolute inset-0" onClick={() => setSelectedCepage(null)} />

          <div className="bg-white w-full max-w-md rounded-[40px] px-8 pb-8 pt-14 shadow-2xl relative animate-in slide-in-from-bottom-10 duration-500 max-h-[92vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedCepage(null)}
              className="absolute top-5 right-5 p-2 bg-stone-100 rounded-full text-stone-500 active:scale-90 z-20"
            >
              <X size={20} />
            </button>

            <div className="mb-8 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-vin-bordeaux mb-2 block">Profil Sensoriel</span>
              <h3 className="text-3xl font-serif font-bold text-stone-800">{selectedCepage.nom}</h3>
            </div>

            <div className="grid grid-cols-1 gap-5 mb-8 bg-stone-50 p-6 rounded-[32px] border border-stone-100">
              {/* Puissance */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-stone-400">
                  <div className="flex items-center gap-1.5"><Zap size={12} className="text-amber-500"/> Puissance</div>
                  <span className="text-stone-800">{selectedCepage.profil.puissance}/5</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${selectedCepage.profil.puissance * 20}%` }} />
                </div>
              </div>

              {/* Corps */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-stone-400">
                  <div className="flex items-center gap-1.5"><Activity size={12} className="text-stone-600"/> Corps</div>
                  <span className="text-stone-800">{selectedCepage.profil.corps}/5</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-800 rounded-full transition-all duration-1000" style={{ width: `${selectedCepage.profil.corps * 20}%` }} />
                </div>
              </div>

              {/* Acidité */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-stone-400">
                  <div className="flex items-center gap-1.5"><Droplets size={12} className="text-blue-500"/> Acidité</div>
                  <span className="text-stone-800">{selectedCepage.profil.acidite}/5</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full transition-all duration-1000" style={{ width: `${selectedCepage.profil.acidite * 20}%` }} />
                </div>
              </div>

              {/* Tanins */}
              {selectedCepage.type === 'Rouge' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-stone-400">
                    <div className="flex items-center gap-1.5"><Wind size={12} className="text-red-700"/> Tanins</div>
                    <span className="text-stone-800">{selectedCepage.profil.tanins}/5</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-800 rounded-full transition-all duration-1000" style={{ width: `${selectedCepage.profil.tanins * 20}%` }} />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-black uppercase text-stone-400 mb-3 tracking-wider">Arômes signatures</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCepage.aromes.map((a: string) => (
                    <span key={a} className="px-3 py-1.5 bg-white text-stone-700 rounded-xl text-xs font-semibold border border-stone-200 shadow-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-vin-beige/20 rounded-2xl border border-vin-bordeaux/5">
                <p className="text-sm text-stone-600 leading-relaxed italic text-center">
                  "{selectedCepage.description}"
                </p>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCepage(null)}
              className="w-full mt-8 py-4 bg-stone-900 text-white rounded-[24px] font-bold text-sm active:scale-95 transition-all shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}