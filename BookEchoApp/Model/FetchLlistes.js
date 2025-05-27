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
    }));
}

