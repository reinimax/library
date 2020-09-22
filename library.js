//in this array the books will be stored
let library = [];

//variables
const addBtn = document.querySelector("#addBtn");
const container = document.querySelector("#container");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

addBtn.addEventListener("click", addBook);

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

function addBook() {
  const newBook = new Book(
    author.value,
    title.value,
    pages.value,
    read.checked
  );
  library.push(newBook);
  displayLibrary(library.length-1);
}

const hobbit = new Book("J.R.R. Tolkien", "The Hobbit but maybe this is also a very very long title", 300, true);
library.push(hobbit);
library.push(hobbit);
library.push(hobbit);

function displayLibrary(from) {
  for (let i = from; i < library.length; i++) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
      const cardAuthor = document.createElement("div");
        cardAuthor.textContent = library[i].author;
        cardAuthor.setAttribute("class", "card-content");
      const cardTitle = document.createElement("div");
        cardTitle.textContent = library[i].title;
        cardTitle.setAttribute("class", "card-content");
      const cardPages = document.createElement("div");
        cardPages.textContent = "Pages: " + library[i].pages;
        cardPages.setAttribute("class", "card-content");
      const cardRead = document.createElement("button");
        cardRead.textContent = (library[i].read) ? "Read" : "Not read";
        cardRead.setAttribute("id", "toggle-read");
      const cardRemove = document.createElement("button");
        cardRemove.textContent = "Remove book";
        cardRemove.setAttribute("id", "remove-btn");
    card.appendChild(cardAuthor);
    card.appendChild(cardTitle);
    card.appendChild(cardPages);
    card.appendChild(cardRead);
    card.appendChild(cardRemove);
    container.appendChild(card);
  }
}

displayLibrary(0);





