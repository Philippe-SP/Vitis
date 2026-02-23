import { PenLine, Wine } from 'lucide-react';

export default function Notes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif font-bold text-stone-800">Mes Notes</h2>
        <span className="text-sm bg-stone-200 text-stone-600 px-2 py-1 rounded-lg font-medium">0 vin</span>
      </div>
      
      <button className="w-full bg-vin-bordeaux text-white py-4 rounded-2xl shadow-lg shadow-vin-bordeaux/20 font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
        <PenLine size={20} />
        Nouvelle dégustation
      </button>

      {/* État vide */}
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-stone-200 rounded-3xl">
        <div className="bg-stone-100 p-4 rounded-full mb-4">
          <Wine className="text-stone-300" size={40} />
        </div>
        <p className="text-stone-400 italic px-10">
          Ton carnet est vide. <br /> Clique sur le bouton pour ajouter ton premier flacon.
        </p>
      </div>
    </div>
  );
}