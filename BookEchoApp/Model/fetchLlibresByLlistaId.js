import { supabase } from '../screens/Supabase/lib/supabaseClient';

export async function fetchLlibresByLlistaId(llistaId) {
  const { data, error } = await supabase
    .from('llibrellista')
    .select(`
      llibre_id,
      llibre(*)
    `)
    .eq('llista_id', llistaId);

  if (error) {
    console.error('Error fetching llibres:', error);
    throw error;
  }

  // ➜ CONVERTIM cada registre al format que vol BookCard
  return data.map(({ llibre }) => ({
    id: llibre.id,                                   // per al key
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
        thumbnail: llibre.imatge || ''              // URL de la imatge
      }
    }
  }));
}
