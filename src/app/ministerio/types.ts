// types.ts
export interface Verse {
  id: string;
  text: string;
}

export interface Video {
  id: string;
  url: string;
  title: string;
}

export interface Event {
  description: ReactNode;
  title: string;
  imageUrl: string | StaticImport;
  id: string;
  name: string;
  date: string;
}