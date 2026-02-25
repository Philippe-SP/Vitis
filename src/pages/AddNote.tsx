import { X, Save, Star } from 'lucide-react';
import { useState } from 'react';
import type { Note } from '../types';
import appelsData from '../data/appellations.json';

interface AddNoteProps {
  onClose: () => void;
  onSave: (note: Note) => void;
  noteToEdit?: Note | null; // Optionnel pour la création
}

export default function AddNote({ onClose, onSave, noteToEdit }: AddNoteProps) {
  // Initialisation intelligente : si noteToEdit existe, on prend ses valeurs, sinon valeurs par défaut
  const [formData, setFormData] = useState({
    nom: noteToEdit?.nom || '',
    appellation: noteToEdit?.appellation || '',
    domaine: noteToEdit?.domaine || '',
    millesime: noteToEdit?.millesime || new Date().getFullYear(),
    noteGlobale: noteToEdit?.noteGlobale || 3,
    commentaire: noteToEdit?.commentaire || ''
  });

  const isFormValid = 
    formData.domaine.trim() !== '' && 
    formData.appellation !== '' && 
    formData.commentaire.trim().length > 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const finalNote: Note = {
      ...formData,
      // Si on édite, on garde l'ID et la date d'origine, sinon on génère
      id: noteToEdit ? noteToEdit.id : crypto.randomUUID(),
      date: noteToEdit ? noteToEdit.date : new Date().toLocaleDateString('fr-FR')
    };
    
    onSave(finalNote);
  };

  return (
    <div className="fixed inset-0 bg-stone-50 z-[100] flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="p-4 border-b border-stone-200 bg-white flex justify-between items-center">
        <button onClick={onClose} className="p-2 text-stone-400 active:scale-90"><X size={24} /></button>
        <h2 className="font-serif font-bold text-lg text-stone-800">
          {noteToEdit ? 'Modifier la note' : 'Nouvelle dégustation'}
        </h2>
        <button 
          onClick={handleSubmit} 
          disabled={!isFormValid}
          className={`p-2 transition-opacity ${isFormValid ? 'text-vin-bordeaux' : 'text-stone-300'}`}
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
              onChange={e => setFormData({...formData, millesime: parseInt(e.target.value) || 2024})}
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
            placeholder="Œil, Nez, Bouche..."
            value={formData.commentaire}
            onChange={e => setFormData({...formData, commentaire: e.target.value})}
          />
        </div>

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
            {noteToEdit ? 'Mettre à jour' : 'Enregistrer la dégustation'}
          </button>
        </div>
      </form>
    </div>
  );
}