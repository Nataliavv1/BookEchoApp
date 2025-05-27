import { useState, useEffect, useCallback } from 'react';
import { checkBookExists, SaveBook, BookToList, RemoveBookFromList } from './BookTableModel';

export function useToggleReadState(book, listIds) {
  const [selected, setSelected] = useState('none');   // estado UI
  const [bookSaved, setBookSaved] = useState(false);  // ya en `llibre`

  // al montar: ¿existe el libro?
  useEffect(() => {
    (async () => {
      const exists = await checkBookExists(book.id);
      setBookSaved(exists);
      // (opcional) aquí podrías consultar en qué lista está para fijar `selected`
    })();
  }, [book.id]);

  /** Cambia estado y sincroniza con Supabase */
const toggle = useCallback(
  async (newKey, prevKey) => {
    // Actualizar UI rápido
    const nextSelected = (newKey === prevKey) ? 'none' : newKey;
    setSelected(nextSelected);

    if (!bookSaved) {
      await SaveBook(book);
      setBookSaved(true);
    }

    if (prevKey !== 'none' && prevKey !== nextSelected) {
      const prevListId = listIds[prevKey];
      await RemoveBookFromList(prevListId, book.id);
    }

    if (nextSelected === 'none') {
      if (prevKey !== 'none') {
        const prevListId = listIds[prevKey];
        await RemoveBookFromList(prevListId, book.id);
      }
    } else {
      const newListId = listIds[nextSelected];
      await BookToList(newListId, book.id);
    }
  },
  [book, bookSaved, listIds]
);


  return { selected, toggle };
}
