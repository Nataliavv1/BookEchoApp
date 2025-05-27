import { supabase } from '../screens/Supabase/lib/supabaseClient';

export async function checkBookExists(bookId) {
  const { data, error } = await supabase
    .from('llibre')
    .select('id')
    .eq('id', bookId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data !== null;
}

/*
export async function SaveBook(book) {

  //Autors i categories es una array
  const autors = Array.isArray(book.autors) ? book.autors.join(', ') : book.autors;
  const categories = Array.isArray(book.categories) ? book.categories.join(', ') : book.categories;

  const { data, error } = await supabase
    .from('llibre')
    .insert([
      {
        id: book.id,
        isbn: book.isbn,
        descripcio: book.descripcio,
        autors,
        categories,
        imatge: book.imatge,
        titol: book.titol,
        puntuaciogoogle: book.puntuaciogoogle,
        npuntuaciogoogle: book.npuntuaciogoogle,
        puntuaciomitjana: book.puntuaciomitjana,
        npuntuaciomitjana: book.npuntuaciomitjana,
      },
    ]);

  if (error) {
    console.error('Error al guardar llibre a la base de dades:', error);
    return null;
  }

  return data;
}*/
export async function SaveBook(book) {
 console.log('Libro a guardar:', book);
  // Autors i categories es una array
  const autors = Array.isArray(book.autors) ? book.autors.join(', ') : book.autors;
  const categories = Array.isArray(book.categories) ? book.categories.join(', ') : book.categories;

  const newBook = {
    id: book.id,
    isbn: book.isbn,
    descripcio: book.descripcio,
    autors,
    categories,
    imatge: book.imatge,
    titol: book.titol,
    puntuaciogoogle: book.puntuaciogoogle,
    npuntuaciogoogle: book.npuntuaciogoogle,
    puntuaciomitjana: book.puntuaciomitjana,
    npuntuaciomitjana: book.npuntuaciomitjana,
  };

  console.log('Datos a insertar:', newBook);  // Aquí ves qué se envía

  const { data, error } = await supabase
    .from('llibre')
    .insert([newBook]);

  if (error) {
    console.error('Error al guardar llibre a la base de dades:', error);
    return null;
  }

  return data;
}


export async function BookToList(listId, bookId) {
  const { data, error } = await supabase
    .from('llibrellista')
    .insert([
      { llista_id: listId, llibre_id: bookId },
    ]);

  if (error) {
    console.error('Error al insertar llibro en la llista:', error);
    return null;
  }

  return data;
}

export async function RemoveBookFromList(listId, bookId) {
  const { data, error } = await supabase
    .from('llibrellista')
    .delete()
    .match({ llista_id: listId, llibre_id: bookId });

  if (error) {
    console.error('Error al eliminar llibre de la llista:', error);
    return null;
  }

  return data;
}
