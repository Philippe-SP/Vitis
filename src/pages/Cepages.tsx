import { Grape, MapPin } from 'lucide-react';
import cepagesData from '../data/cepages.json';

export default function Cepages() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-vin-bordeaux/10 rounded-lg">
          <Grape className="text-vin-bordeaux" size={24} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-800">Cépages</h2>
      </div>

      <div className="grid gap-4">
        {cepagesData.map((c) => (
          <div key={c.nom} className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 transition-all active:scale-[0.98]">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-xl text-stone-800">{c.nom}</h3>
              <span className={`text-[10px] uppercase tracking-tighter px-2 py-1 rounded-md font-bold ${
                c.type === 'Rouge' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
              }`}>
                {c.type}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {c.regions.map(region => (
                <span key={region} className="flex items-center gap-1 text-[11px] font-medium text-stone-500 bg-stone-50 px-2 py-1 rounded-full">
                  <MapPin size={10} className="text-stone-400" />
                  {region}
                </span>
              ))}
            </div>

            <p className="text-sm text-stone-400 italic">
              Notes : {c.aromes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}