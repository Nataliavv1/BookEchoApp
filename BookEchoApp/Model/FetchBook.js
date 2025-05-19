
const API_KEY = "AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM";

export async function FetchBook(BOOK_ID = "xYotngEACAAJ") {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${BOOK_ID}?key=${API_KEY}`
    );
    const data = await response.json();

    const info = data.volumeInfo;

    const isbn = info.industryIdentifiers?.find(
      (id) => id.type === "ISBN_13"
    );

    return {
      title: info.title,
      description: info.description,
      authors: info.authors ?? [],
      categories: info.categories ?? [],
      averageRating: info.averageRating ?? null,
      ratingCount: info.ratingsCount ?? 0,
      publisher: info.publisher ?? null,
      isbn,
    };
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}

