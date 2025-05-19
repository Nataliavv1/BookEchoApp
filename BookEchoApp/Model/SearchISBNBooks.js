//https://www.googleapis.com/books/v1/volumes?q=isbn: 

const api_url = "https://www.googleapis.com/books/v1/volumes?q=isbn: "

fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699&key=AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM")
  .then(function(res) {
    return res.json();
  })
  .then(function(result) {
    title = result.items[0].volumeInfo.title;
    description = result.items[0].volumeInfo.description;
    console.log(title);
    console.log(description);
  }),
  function(error) {
    console.log(error);
  };