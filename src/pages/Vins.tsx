import { useState } from 'react';
import { ArrowLeft, Map as MapIcon, Info, ChevronDown, ChevronUp, Wine } from 'lucide-react';
import appellationsData from '../data/appellations.json';

import imgBordeaux from '../assets/maps/bordeaux.jpg';
import imgRhone from '../assets/maps/rhone.jpg';
import imgBourgogne from '../assets/maps/bourgogne.jpg';
import imgLanguedoc from '../assets/maps/languedoc.jpg';
import imgLoire from '../assets/maps/loire.jpg';
import imgSudOuest from '../assets/maps/sud_ouest.jpg';
import imgProvence from '../assets/maps/provence.png';
import imgBeaujolais from '../assets/maps/beaujolais.jpg';

const regions = [
  { 
    id: 'bordeaux', 
    nom: 'Bordeaux', 
    geo: 'Rive Gauche vs Droite', 
    desc: 'À gauche du fleuve (Médoc), les vins sont "carrés", tanniques et puissants. À droite (St-Émilion), ils sont plus ronds, veloutés et portés sur la prune.', 
    color: 'bg-red-900', 
    image: imgBordeaux 
  },
  { 
    id: 'bourgogne', 
    nom: 'Bourgogne', 
    geo: 'La Côte d\'Or', 
    desc: 'Plus tu montes vers le milieu du coteau, plus le vin gagne en finesse et en élégance. En bas de pente, les vins sont plus charnus et simples.', 
    color: 'bg-red-800', 
    image: imgBourgogne 
  },
  { 
    id: 'rhone', 
    nom: 'Rhône', 
    geo: 'Nord vs Sud', 
    desc: 'Le Nord produit des rouges "poivrés" et vifs (Syrah). Le Sud donne des vins beaucoup plus chaleureux, riches en alcool et chargés d\'épices douces.', 
    color: 'bg-red-700', 
    image: imgRhone 
  },
  { 
    id: 'loire', 
    nom: 'Loire', 
    geo: 'Le long du fleuve', 
    desc: 'Plus tu t\'enfonces dans les terres (vers l\'Est), plus les blancs perdent leur côté "citronné/iodé" pour devenir minéraux et très complexes.', 
    color: 'bg-emerald-800', 
    image: imgLoire 
  },
  { 
    id: 'alsace', 
    nom: 'Alsace', 
    geo: 'Coteaux sous-vosgiens', 
    desc: 'Ici, c\'est le cépage qui commande tout : le Riesling sera toujours "droit et citronné", tandis que le Gewurztraminer sera "exotique et parfumé".', 
    color: 'bg-amber-600', 
    image: null 
  },
  { 
    id: 'beaujolais', 
    nom: 'Beaujolais', 
    geo: 'Le Sud de la Bourgogne', 
    desc: 'Les villages au Nord (Crus) font des vins sérieux qui ressemblent à de la Bourgogne. Le Sud fait des vins "bonbons", légers et très faciles à boire.', 
    color: 'bg-purple-900', 
    image: imgBeaujolais 
  },
  { 
    id: 'languedoc', 
    nom: 'Languedoc', 
    geo: 'L\'arc méditerranéen', 
    desc: 'Plus tu montes en altitude (vers les montagnes), plus le vin est frais et élégant. Près de la mer, les vins sont plus denses, mûrs et "solaires".', 
    color: 'bg-orange-900', 
    image: imgLanguedoc 
  },
  { 
    id: 'provence', 
    nom: 'Provence', 
    geo: 'Vins de Soleil', 
    desc: 'Les rosés de bord de mer sont salins et très légers. Plus on rentre dans les terres, plus ils gagnent en structure et en goût de fruits rouges.', 
    color: 'bg-pink-700', 
    image: imgProvence 
  },
  { 
    id: 'sud-ouest', 
    nom: 'Sud Ouest', 
    geo: 'Terroirs de caractère', 
    desc: 'Cahors donne des vins "noirs" et très charpentés, tandis que les zones pyrénéennes (Jurançon) produisent des blancs vifs et ultra-exotiques.', 
    color: 'bg-stone-800', 
    image: imgSudOuest 
  },
];

export default function Appellations() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [filterStyle, setFilterStyle] = useState('Tous');
  const [showMap, setShowMap] = useState(false);

  const filteredAppellations = appellationsData.filter(app => {
    const matchRegion = app.region.toLowerCase() === selectedRegion;
    const matchStyle = filterStyle === 'Tous' || app.style.includes(filterStyle);
    return matchRegion && matchStyle;
  });

  const currentRegion = regions.find(r => r.id === selectedRegion);

  if (!selectedRegion) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-2 mb-2 text-stone-400">
          <MapIcon size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Choisir une région</span>
        </div>
        <div className="grid gap-4">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className="w-full text-left bg-white rounded-[32px] p-6 shadow-sm border border-stone-100 active:scale-[0.98] transition-all overflow-hidden relative group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${region.color} opacity-10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-1">{region.nom}</h3>
              <span className="text-[10px] bg-vin-bordeaux/10 text-vin-bordeaux px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter inline-block mb-3">
                {region.geo}
              </span>
              <p className="text-sm text-stone-500 leading-relaxed pr-10">{region.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={() => { setSelectedRegion(null); setShowMap(false); }} className="flex items-center gap-2 text-vin-bordeaux font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm active:scale-95 transition-transform">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="text-xl font-serif font-bold text-stone-800">{currentRegion?.nom}</h2>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-stone-100">
        <button onClick={() => setShowMap(!showMap)} className="w-full flex items-center justify-between p-5 active:bg-stone-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-vin-bordeaux/5 rounded-xl text-vin-bordeaux"><MapIcon size={20} /></div>
            <div className="text-left">
              <span className="block text-sm font-bold text-stone-800">Géographie</span>
              <span className="text-[10px] text-stone-400 uppercase font-black tracking-tight">{currentRegion?.geo}</span>
            </div>
          </div>
          {showMap ? <ChevronUp size={20} className="text-stone-300" /> : <ChevronDown size={20} className="text-stone-300" />}
        </button>

        {showMap && (
          <div className="px-5 pb-5 animate-in zoom-in-95 duration-300">
            {currentRegion?.image ? (
              <div className="w-full bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 shadow-inner">
                <img src={currentRegion.image} alt={`Carte ${currentRegion.nom}`} className="w-full h-auto object-cover" />
              </div>
            ) : (
              <div className="w-full h-32 bg-stone-50 rounded-2xl flex flex-col items-center justify-center text-stone-300 border border-dashed border-stone-200">
                <Wine size={32} className="mb-2 opacity-20" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Focus sur les cépages</span>
              </div>
            )}
            <div className="mt-4 flex gap-3 bg-vin-bordeaux/5 p-4 rounded-2xl border border-vin-bordeaux/10">
              <div className="shrink-0 w-8 h-8 bg-vin-bordeaux text-white rounded-full flex items-center justify-center shadow-sm">
                <Info size={16} />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase text-vin-bordeaux tracking-wider mb-1">Stratégie de dégustation</span>
                <p className="text-[13px] text-stone-700 leading-snug italic">
                  "{currentRegion?.desc}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['Tous', 'Rouge', 'Blanc', 'Rosé'].map((style) => (
          <button key={style} onClick={() => setFilterStyle(style)} className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filterStyle === style ? 'bg-vin-bordeaux text-white shadow-md' : 'bg-white text-stone-400 border border-stone-100'}`}>
            {style}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredAppellations.map((app) => (
          <div key={app.nom} className="bg-white p-5 rounded-[28px] shadow-sm border border-stone-100">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-stone-800 leading-tight">{app.nom}</h4>
              <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ml-2 shrink-0 ${app.style.includes('Rouge') ? 'bg-red-50 text-red-700' : app.style.includes('Blanc') ? 'bg-amber-50 text-amber-700' : 'bg-pink-50 text-pink-700'}`}>
                {app.style}
              </span>
            </div>
            <p className="text-[10px] text-vin-bordeaux/60 mb-3 uppercase tracking-[0.1em] font-black">{app.cepages.join(' • ')}</p>
            <p className="text-sm text-stone-500 leading-relaxed">{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}