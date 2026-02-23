import { PenLine, Wine, Star } from 'lucide-react';
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
            <div key={note.id} className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-stone-800 leading-tight">{note.nom}</h3>
                  <p className="text-xs text-vin-bordeaux font-bold uppercase">{note.domaine} — {note.millesime}</p>
                </div>
                <div className="flex text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1 text-xs font-bold">{note.noteGlobale}</span>
                </div>
              </div>
              <p className="text-sm text-stone-500 line-clamp-2 mt-2 italic">"{note.commentaire}"</p>
              <div className="mt-3 pt-3 border-t border-stone-50 text-[10px] text-stone-400 font-medium">
                Dégusté le {note.date} • {note.appellation}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && <AddNote onClose={() => setIsModalOpen(false)} onSave={saveNote} />}
    </div>
  );
}