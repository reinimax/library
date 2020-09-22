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
}

const hobbit = new Book("J.R.R. Tolkien", "The Hobbit but maybe this is also a very very long title", 300, true);
library.push(hobbit);
library.push(hobbit);
library.push(hobbit);

function displayLibrary() {
  for (let i = 0; i < library.length; i++) {
    const card = document.createElement("div");
    card.style.cssText = `
      border: solid 1px black;
      border-radius: 10px; 
      margin: 30px; 
      padding: 20px;
      width: 150px;
      height: 250px;
    `;
      const cardAuthor = document.createElement("div");
      cardAuthor.textContent = library[i].author;
      cardAuthor.style.cssText = `
        text-align: center;
        margin-bottom: 15px;
      `;
      const cardTitle = document.createElement("div");
      cardTitle.textContent = library[i].title;
      cardTitle.style.cssText = `
        text-align: center;
        margin-bottom: 15px;
      `;
      const cardPages = document.createElement("div");
      cardPages.textContent = "Pages: " + library[i].pages;
      cardPages.style.cssText = `
        text-align: center;
        margin-bottom: 15px;
      `;
      const cardRead = document.createElement("button");
      cardRead.textContent = (library[i].read) ? "Read" : "Not read";
      cardRead.style.cssText = `
        background-color: transparent;
        border: none;
        width: 80px;
        margin-left: 35px;
        margin-bottom: 15px;
      `;
      const cardRemove = document.createElement("button");
      cardRemove.textContent = "Remove book";
      cardRemove.style.cssText = `
        width: 120px;
        margin-left: 15px;
      `;
    card.appendChild(cardAuthor);
    card.appendChild(cardTitle);
    card.appendChild(cardPages);
    card.appendChild(cardRead);
    card.appendChild(cardRemove);
    container.appendChild(card);
  }
}

displayLibrary();





