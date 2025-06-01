import { supabase } from '../../screens/Supabase/lib/supabaseClient';
// Funció per obtenir els reptes que tñe l'usuari
export async function fetchUserChallenges(userId) {
  const { data, error } = await supabase
    .from('usuarirepte')
    .select('*')
    //.select('*, user:idusuari(idrepte, completat, progres, datacompletat)')
    .eq('idusuari', userId);
  if (error) throw error;
  return data;
}

const challenges = [
  {
    id: '1',
    image: require('../../assets/narrador.png'),
    title: 'El Narrador',
    description: 'Escriure una ressenya detallada d\'un llibre.',
    completed: 0,
    total: 1,
    backgroundColor: '#FEF2ED',
    progressColor: '#F8794A',
  },
  {
    id: '7',
    image: require('../../assets/lectura.png'),
    title: 'Lector Organitzat',
    description: 'Afegeix 3 llibres a la llista "Per llegir".',
    completed: 0,
    total: 3,
    backgroundColor: '#FEF8E6',
    progressColor: '#F8BD01',
  },
  {
    id: '8',
    image: require('../../assets/creador.png'),
    title: 'Creador de Llistes',
    description: 'Crea una nova llista de llibres personalitzada.',
    completed: 0,
    total: 1,
    backgroundColor: '#F7EDF7',
    progressColor: '#AC47AC',
  },
  {
    id: '9',
    image: require('../../assets/bibliotecari.png'),
    title: 'El Bibliotecari',
    description: 'Afegeix 5 llibres a la llista de lectura.',
    completed: 0,
    total: 5,
    backgroundColor: '#EDF7F5',
    progressColor: '#47AC9E',
  },
];

export default challenges;
