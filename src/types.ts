export interface Cepage {
  nom: string;
  type: 'Rouge' | 'Blanc' | 'Rosé';
  regions: string[];
  aromes: string;
}

export interface Appellation {
  nom: string;
  region: string;
  style: string;
  cepages: string[];
  description: string;
}

export interface Note {
  id: string;
  nom: string;
  appellation: string;
  domaine: string;
  millesime: number;
  date: string;
  noteGlobale: number; // sur 5
  commentaire: string;
}

export interface Accord {
  nom: string;
  famille: string;
  vins: string[];
  conseil: string;
}