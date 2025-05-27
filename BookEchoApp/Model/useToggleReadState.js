import { useState, useEffect, useCallback } from 'react';
import { checkBookExists, SaveBook, BookToList, RemoveBookFromList } from './BookTableModel';

// hook  useToggleReadState.js
export function useToggleReadState(book, listIds) {
  const [selected, setSelected] = useState('none');
  const [bookSaved, setBookSaved] = useState(false);

  // ↪ traducir clave UI → clave del objeto listIds
  const key2ctx = { toRead: 'perLlegir', reading: 'llegint', read: 'llegit' };

  useEffect(() => {
    (async () => {
      const exists = await checkBookExists(book.id);   // usa book.id (o isbn)
      setBookSaved(exists);
    })();
  }, [book.id]);

  const toggle = useCallback(
    async (newKey, prevKey) => {
      const next = newKey === prevKey ? 'none' : newKey;
      setSelected(next);

      // 1· guarda el libro si aún no está
      if (!bookSaved) {
        await SaveBook(book);
        setBookSaved(true);
      }

      // 2· quita de la lista anterior (si cambia)
      if (prevKey !== 'none' && prevKey !== next) {
        await RemoveBookFromList(
          listIds[key2ctx[prevKey]],
          book.id
        );
      }

      // 3· añade o quita según next
      if (next === 'none') {
        if (prevKey !== 'none') {
          await RemoveBookFromList(
            listIds[key2ctx[prevKey]],
            book.id
          );
        }
      } else {
        await BookToList(
          listIds[key2ctx[next]],
          book.id
        );
      }
    },
    [book, bookSaved, listIds]
  );

  return { selected, toggle };
}
