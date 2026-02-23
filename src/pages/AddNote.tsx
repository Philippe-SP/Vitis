import { X, Save, Star } from 'lucide-react';
import { useState } from 'react';
import type { Note } from '../types';
import appelsData from '../data/appellations.json';

interface AddNoteProps {
  onClose: () => void;
  onSave: (note: Note) => void;
}

export default function AddNote({ onClose, onSave }: AddNoteProps) {
  const [formData, setFormData] = useState({
    nom: '',
    appellation: '',
    domaine: '',
    millesime: new Date().getFullYear(),
    noteGlobale: 3,
    commentaire: ''
  });

  // Validation : Vérifie si les champs obligatoires sont remplis
  const isFormValid = 
    formData.domaine.trim() !== '' && 
    formData.appellation !== '' && 
    formData.commentaire.trim().length > 5; // On force un petit commentaire

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newNote: Note = {
      ...formData,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('fr-FR')
    };
    onSave(newNote);
  };

  return (
    <div className="fixed inset-0 bg-stone-50 z-[100] flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className="p-4 border-b border-stone-200 bg-white flex justify-between items-center">
        <button onClick={onClose} className="p-2 text-stone-400"><X size={24} /></button>
        <h2 className="font-serif font-bold text-lg text-stone-800">Nouvelle dégustation</h2>
        <button 
          onClick={handleSubmit} 
          disabled={!isFormValid}
          className={`p-2 transition-opacity ${isFormValid ? 'text-vin-bordeaux opacity-100' : 'text-stone-300 opacity-50'}`}
        >
          <Save size={24} />
        </button>
      </div>

      <form className="flex-1 overflow-y-auto p-6 space-y-6 pb-20" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400 ml-1 italic">Producteur (Château, Domaine...)*</label>
            <input 
              required
              type="text" 
              className="w-full p-4 bg-white border border-stone-200 rounded-2xl outline-none focus:border-vin-bordeaux"
              placeholder="ex: Domaine Guigal"
              value={formData.domaine}
              onChange={e => setFormData({...formData, domaine: e.target.value})}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400 ml-1 italic">Nom de la cuvée (Optionnel)</label>
            <input 
              type="text" 
              className="w-full p-4 bg-white border border-stone-200 rounded-2xl outline-none focus:border-vin-bordeaux"
              placeholder="ex: La Mouline"
              value={formData.nom}
              onChange={e => setFormData({...formData, nom: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400 ml-1 italic">Appellation*</label>
            <select 
              required
              className="w-full p-4 bg-white border border-stone-200 rounded-2xl outline-none appearance-none"
              value={formData.appellation}
              onChange={e => setFormData({...formData, appellation: e.target.value})}
            >
              <option value="">Sélectionner...</option>
              {appelsData.sort((a, b) => a.nom.localeCompare(b.nom)).map(a => (
                <option key={a.nom} value={a.nom}>{a.nom}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400 ml-1 italic">Millésime*</label>
            <input 
              required
              type="number" 
              className="w-full p-4 bg-white border border-stone-200 rounded-2xl outline-none"
              value={formData.millesime}
              onChange={e => setFormData({...formData, millesime: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-stone-400 ml-1 italic">Appréciation globale*</label>
          <div className="flex justify-between bg-white p-4 rounded-2xl border border-stone-200">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                type="button"
                onClick={() => setFormData({...formData, noteGlobale: star})}
              >
                <Star size={32} fill={formData.noteGlobale >= star ? "#641212" : "none"} color={formData.noteGlobale >= star ? "#641212" : "#D6D3D1"} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-stone-400 ml-1 italic">Dégustation*</label>
          <textarea 
            required
            rows={5}
            className="w-full p-4 bg-white border border-stone-200 rounded-2xl outline-none"
            placeholder="Œil (Robe, reflets)&#10;Nez (Intensité, arômes)&#10;Bouche (Attaque, équilibre, longueur)..."
            value={formData.commentaire}
            onChange={e => setFormData({...formData, commentaire: e.target.value})}
          />
        </div>

        {!isFormValid && (
          <p className="text-[10px] text-center text-stone-400 italic">
            Veuillez remplir les champs marqués d'une * pour enregistrer.
          </p>
        )}
        {/* Bouton de validation principal */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
              isFormValid 
                ? 'bg-vin-bordeaux text-white shadow-vin-bordeaux/20 active:scale-95' 
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {isFormValid ? 'Enregistrer la dégustation' : 'Compléter les champs *'}
          </button>
          
          {!isFormValid && (
            <p className="text-[10px] text-center text-stone-400 mt-3 italic">
              Il manque le producteur, l'appellation ou un petit commentaire !
            </p>
          )}
        </div>
      </form>
    </div>
  );
}