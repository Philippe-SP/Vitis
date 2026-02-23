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