import { supabase } from '../screens/Supabase/lib/supabaseClient';



export async function fetchLlistes(userProfile) {
    
    const { data, error } = await supabase
        .from('llista')
        //Selecciona nomes quan es l'ID que volem
        .select('*') // O especifica columnas: .select('titulo, autor, isbn')
       // .eq('usuari_id', 'b63be94b-db08-4716-870c-7f879c6b76f3');
        .eq('usuari_id', userProfile.id);

    if (error) {
        console.error('Error al obtenir les dades:', error.message);
        return;
    }

    console.log('Llistes:', data);

    return data.map(llista => ({
        nom: llista.nom,
        data_creacio: llista.data_creacio,
        image: llista.image,
        id: llista.id,
    }));
}

export async function fetchLlistesPredet(userProfile) {
  const { data, error } = await supabase
    .from('llista')
    .select('id, tipus_predeterminat')
    .eq('usuari_id', userProfile.id)
    .eq('es_predeterminada', true);

  if (error) {
    console.error('Error al obtenir les dades:', error.message);
    return null;
  }

  const result = {
    llegint: null,
    llegit: null,
    perLlegir: null,
  };

  data.forEach(llista => {
    switch (llista.tipus_predeterminat) {
      case 'Llegint':
        result.llegint = llista.id;
        break;
      case 'Llegit':
        result.llegit = llista.id;
        break;
      case 'Per llegir':
        result.perLlegir = llista.id;
        break;
    }
  });
console.log('fetchLlistesPredet result:', result);
  return result;
}

export async function selectCount(llista_id) {
    console.log("ID de la llista rebut:", llista_id); 
  const { count, error } = await supabase
    .from('llibrellista')
    .select('*', { count: 'exact', head: true }) // <--- Asegúrate de esto
    .eq('llista_id', llista_id);

  if (error) {
    console.error("Error al contar libros:", error);
    return 0;
  }

  return count;
}

export async function createLlista(nom, userId, es_predeterminada, tipus_predeterminat, image){
   await supabase.from('llista').insert([
          { 
            nom: nom, 
            usuari_id: userId, 
            es_predeterminada: es_predeterminada, 
            tipus_predeterminat: tipus_predeterminat, 
            image: image },
        ]);

}



