// src/app/ministerio/lib/types.ts
export interface Post {
    id?: string; // Hacer id opcional
    title: string;
    content: string;
    image: string;
  }
  
  export interface BibleQuote {
    id?: string; // Hacer id opcional
    text: string;
    reference: string;
  }
  
  export interface Message {
    id?: string; // Hacer id opcional
    link: string;
  }