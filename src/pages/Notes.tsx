import { PenLine, Wine, Star, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddNote from './AddNote';
import type { Note } from '../types';

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  // Charger les notes au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('vitis-notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveNote = (newNote: Note) => {
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('vitis-notes', JSON.stringify(updatedNotes));
    setIsModalOpen(false);
  };

  /* --- Suppression d'une note --- */
  const deleteNote = (id: string) => {
  if (window.confirm("Supprimer cette dégustation ?")) {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('vitis-notes', JSON.stringify(updatedNotes));
  }
};

  return (
    <div className="space-y-6">
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

      {/* Liste des notes */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-stone-200 rounded-3xl">
            <Wine className="text-stone-300 mb-4" size={40} />
            <p className="text-stone-400 italic px-10">Ton carnet est vide.</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 relative group">
              <button 
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 p-3 text-stone-300 active:text-red-500 transition-colors z-20"
                aria-label="Supprimer la note"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="flex justify-between items-start mb-2 pr-8"> {/* Ajout de pr-8 pour ne pas chevaucher la poubelle */}
                <div>
                  <h3 className="font-bold text-lg text-stone-800 leading-tight">{note.nom || 'Cuvée Classique'}</h3>
                  <p className="text-xs text-vin-bordeaux font-bold uppercase">{note.domaine} — {note.millesime}</p>
                </div>
                <div className="flex text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1 text-xs font-bold">{note.noteGlobale}</span>
                </div>
              </div>
              {/* ... reste du contenu de la carte ... */}
            </div>
          ))
        )}
      </div>

      {isModalOpen && <AddNote onClose={() => setIsModalOpen(false)} onSave={saveNote} />}
    </div>
  );
}