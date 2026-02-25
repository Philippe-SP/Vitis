import { PenLine, Wine, Star, Trash2, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddNote from './AddNote';
import type { Note } from '../types';

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  // Nouvel état pour savoir quelle note on est en train d'éditer
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vitis-notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Fonction hybride : Ajout ou Mise à jour
  const handleSave = (updatedNote: Note) => {
    let newNotes;
    const exists = notes.find(n => n.id === updatedNote.id);

    if (exists) {
      // Cas Edition : on remplace la note existante
      newNotes = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    } else {
      // Cas Création : on ajoute au début
      newNotes = [updatedNote, ...notes];
    }

    setNotes(newNotes);
    localStorage.setItem('vitis-notes', JSON.stringify(newNotes));
    closeModal();
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Évite d'ouvrir l'édition en cliquant sur supprimer
    if (window.confirm("Supprimer cette dégustation ?")) {
      const updatedNotes = notes.filter(n => n.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem('vitis-notes', JSON.stringify(updatedNotes));
    }
  };

  const openEdit = (note: Note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNoteToEdit(null);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-stone-800">Mes Notes</h2>
        <span className="text-sm bg-stone-200 text-stone-600 px-3 py-1 rounded-full font-bold">
          {notes.length} {notes.length > 1 ? 'vins' : 'vin'}
        </span>
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-vin-bordeaux text-white py-4 rounded-2xl shadow-lg shadow-vin-bordeaux/20 font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <PenLine size={20} />
        Nouvelle dégustation
      </button>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-stone-200 rounded-3xl">
            <Wine className="text-stone-300 mb-4" size={40} />
            <p className="text-stone-400 italic px-10">Ton carnet est vide.</p>
          </div>
        ) : (
          notes.map(note => (
            <div 
              key={note.id} 
              onClick={() => openEdit(note)} // L'ensemble de la carte devient cliquable pour éditer
              className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 relative group active:scale-[0.98] transition-all"
            >
              <button 
                onClick={(e) => deleteNote(note.id, e)}
                className="absolute top-2 right-2 p-3 text-stone-300 hover:text-red-500 transition-colors z-20"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="flex justify-between items-start mb-2 pr-8">
                <div>
                  <h3 className="font-bold text-lg text-stone-800 leading-tight">{note.nom || 'Cuvée Classique'}</h3>
                  <p className="text-[10px] text-vin-bordeaux font-bold uppercase tracking-wider">{note.domaine} — {note.millesime}</p>
                </div>
                <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
                  <Star size={12} fill="currentColor" />
                  <span className="ml-1 text-xs font-bold">{note.noteGlobale}</span>
                </div>
              </div>
              
              <p className="text-xs text-stone-500 italic line-clamp-2">
                {note.commentaire || "Pas de commentaire..."}
              </p>

              <div className="mt-3 flex justify-end">
                 <div className="text-[10px] font-bold text-stone-300 flex items-center gap-1">
                   <Edit2 size={10} /> Modifier
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <AddNote 
          onClose={closeModal} 
          onSave={handleSave} 
          noteToEdit={noteToEdit} // On passe la note à éditer
        />
      )}
    </div>
  );
}