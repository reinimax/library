//in this array the books will be stored
let library = [];

//variables
const addBtn = document.querySelector("#addBtn");
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
    this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "already read" : "not yet read"}`;
    }
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

const hobbit = new Book("J.R.R. Tolkien", "The Hobbit", 300, true);
library.push(hobbit);
library.push(hobbit);
library.push(hobbit);
console.log(hobbit.info());

/*cardstyle
  create a div
  inside the div display stuff
*/

const container = document.querySelector("#container");

for (let i = 0; i < library.length; i++) {
  const card = document.createElement("div");
    const cardAuthor = document.createElement("div");
    cardAuthor.textContent = library[i].author;
    const cardTitle = document.createElement("div");
    cardTitle.textContent = library[i].title;
  card.appendChild(cardAuthor);
  card.appendChild(cardTitle);
  container.appendChild(card);
}





