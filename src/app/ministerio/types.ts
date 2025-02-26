export interface Sermon {
  id?: string;
  titulo: string;
  contenido: string;
  imagenUrl?: string;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Video {
  id?: string;
  title: string;
  url: string;
}

export interface Verse {
  id?: string;
  text: string;
  reference: string;
}