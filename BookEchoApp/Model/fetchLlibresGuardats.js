import { supabase } from '../screens/Supabase/lib/supabaseClient';

/**
 * Obté tots els llibres guardats (en qualsevol llista) d'un usuari
 * i els torna en el format que necessita BookCard.
 * @param {string} userId  usuari_id de la taula llista
 * @returns {Promise<Array<{id:string, volumeInfo:Object}>>}
 */
export async function fetchLlibresGuardats(userId) {
  /* 1️⃣  Totes les llistes de l’usuari */
  const { data: llistes, error: llistesError } = await supabase
    .from('llista')
    .select('id')
    .eq('usuari_id', userId);

  if (llistesError) {
    console.error('Error obtenint llistes:', llistesError);
    throw llistesError;
  }

  const llistaIds = llistes.map(l => l.id);
  if (llistaIds.length === 0) return [];          // l’usuari no té llistes

  /* 2️⃣  Tots els llibres de totes les llistes de l’usuari (join amb llibre) */
  const { data, error } = await supabase
    .from('llibrellista')
    .select(`
      llista_id,
      llibre:llibre_id (
        id,
        isbn,
        titol,
        autors,
        descripcio,
        categories,
        imatge,
        puntuaciogoogle,
        npuntuaciogoogle
      )
    `)
    .in('llista_id', llistaIds);

  if (error) {
    console.error('Error obtenint llibres guardats:', error);
    throw error;
  }

  /* 3️⃣  Eliminar duplicats per id (mateix llibre en diverses llistes) */
  const vistos = new Set();
  const llibresUnics = data
    .map(item => item.llibre)
    .filter(llibre => {
      if (vistos.has(llibre.id)) return false;
      vistos.add(llibre.id);
      return true;
    });

  /* 4️⃣  Transformar al format que vol BookCard */
  return llibresUnics.map(llibre => ({
    id: llibre.id,
    volumeInfo: {
      title:        llibre.titol,
      authors:      llibre.autors ? llibre.autors.split(', ') : [],
      description:  llibre.descripcio,
      categories:   llibre.categories ? llibre.categories.split(', ') : [],
      averageRating: llibre.puntuaciogoogle ?? 0,
      ratingsCount:  llibre.npuntuaciogoogle ?? 0,
      industryIdentifiers: [
        { identifier: llibre.isbn ?? llibre.id, type: 'ISBN_13' }
      ],
      imageLinks: {
        thumbnail: llibre.imatge || ''
      }
    }
  }));
}
