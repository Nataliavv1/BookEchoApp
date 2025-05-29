// Model/FetchSimilarBooks.js
const API_KEY = "AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM";

export async function fetchSimilarBooks(category, author) {
  try {
    let query = '';
    
    if (category) {
      query = `subject:${encodeURIComponent(category)}`;
    } else if (author) {
      query = `inauthor:${encodeURIComponent(author)}`;
    } else {
      return [];
    }

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&key=${API_KEY}`
    );

    const data = await response.json();

    return data.items?.map(book => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors ?? [],
      image: book.volumeInfo.imageLinks?.thumbnail,
    })) ?? [];

  } catch (error) {
    console.error("Error fetching similar books:", error);
    return [];
  }
}
