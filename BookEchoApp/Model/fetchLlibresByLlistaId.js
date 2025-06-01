async function fetchLlibresByLlistaId(llistaId) {
  // 1. Primer, fem fetch o consulta per obtenir els llibre_id associats a la llista
  // Suposo que tens una funció per obtenir això, o una API que et retorna la llista
  // Aquí un exemple simulant la resposta d'aquesta consulta:

  const llistaLlibres = [
    { llista_id: 33, llibre_id: "9788410356399" },
    { llista_id: 33, llibre_id: "9788490655474" },
    { llista_id: 33, llibre_id: "9780241243718" },
    { llista_id: 33, llibre_id: "9788497913645" },
    // ... més llibres
  ].filter(item => item.llista_id === llistaId);

  // 2. Ara fem fetch per cada llibre per obtenir-ne la info
  // Suposo que tens una funció fetchBookById(id) que retorna la info del llibre
  const fetchBookById = async (id) => {
    // Ex: fetch a la teva API
    const res = await fetch(`https://api.exemple.com/llibres/${id}`);
    if (!res.ok) throw new Error("Error fetching book");
    return res.json();
  };

  // 3. Fem fetch en paral·lel de tots els llibres associats
  const llibres = await Promise.all(
    llistaLlibres.map(({ llibre_id }) => fetchBookById(llibre_id))
  );

  return llibres; // array amb dades de tots els llibres
}
