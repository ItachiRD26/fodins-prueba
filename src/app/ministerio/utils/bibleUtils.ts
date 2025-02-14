import bibleIndex from "../data/biblia/index.json";

interface BibleBook {
  [chapter: string]: string[]; // Cada capítulo es un arreglo de versículos
}

interface BibleBookInfo {
  testament: string;
  title: string;
  shortTitle: string;
  abbr: string;
  category: string;
  key: string;
  number: number;
  chapters: number;
  verses: number;
}

const bible: { [book: string]: BibleBook } = {};

// Cargar todos los libros de la Biblia
const loadBible = async () => {
  const index: BibleBookInfo[] = bibleIndex;

  for (const bookInfo of index) {
    const fileName = bookInfo.key; // Usamos el campo "key" para el nombre del archivo
    try {
      const bookData = await import(`../data/biblia/${fileName}.json`);
      bible[bookInfo.shortTitle] = bookData.default || bookData; // Usamos shortTitle como clave
    } catch (error) {
      console.error(`Error cargando el libro ${bookInfo.title}:`, error);
    }
  }
};

// Buscar un versículo específico
export const getVerse = (book: string, chapter: string, verse: string): string | null => {
  const selectedBook = bible[book];
  if (!selectedBook) {
    console.error(`Libro no encontrado: ${book}`);
    return null;
  }

  const chapterNumber = parseInt(chapter, 10) - 1; // Convertir a índice basado en 0
  const verseNumber = parseInt(verse, 10) - 1; // Convertir a índice basado en 0

  if (isNaN(chapterNumber) || isNaN(verseNumber)) {
    console.error("Capítulo o versículo no es un número válido");
    return null;
  }

  const selectedChapter = selectedBook[chapterNumber];
  if (!selectedChapter) {
    console.error(`Capítulo no encontrado: ${chapter}`);
    return null;
  }

  const verseText = selectedChapter[verseNumber];
  if (!verseText) {
    console.error(`Versículo no encontrado: ${verse}`);
    return null;
  }

  return verseText;
};

// Cargar la Biblia al iniciar la aplicación
loadBible();