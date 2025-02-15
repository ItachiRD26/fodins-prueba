export type Verse = {
  id?: string;
  reference: string;
  text: string;
};

export type Video = {
  id?: string;
  title: string;
  url: string;
};

export type Event = {
  id?: string; // Opcional, dependiendo de tu uso
  title: string;
  description: string;
  imageUrl: string; // URL de la imagen
};