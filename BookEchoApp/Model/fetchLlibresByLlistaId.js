import { supabase } from '../screens/Supabase/lib/supabaseClient';

export async function fetchLlibresByLlistaId(llistaId) {
  // Aquesta consulta busca a la taula llibrellista (que relaciona llista i llibre)
  // i a més agafa totes les dades de la taula llibres fent un join
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

  // Torna només les dades dels llibres
  return data.map(item => item.llibre);
}


