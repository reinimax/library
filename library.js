//in this array the books will be stored
let library = [
  new Book("J.R.R. Tolkien", "The Hobbit", 300, true),
  new Book("Andrzej Sapkowski", "The Last Wish", 350, true)
];

//local storage
let storage = window.localStorage;

//turning the array into a string
let objString = "";
for (let i = 0; i < library.length; i++) {
  objString = Object.values(library[i]);
  storage.setItem(`library${i}`, objString);
}

console.log(storage);

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

Book.prototype.toggleRead = function() {
  this.read = (this.read) ? false : true;
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
        cardRead.setAttribute("data-index", i);
        cardRead.addEventListener("click", function(e) {
          library[e.target.dataset.index].toggleRead();
          cardRead.textContent = (library[e.target.dataset.index].read) ? "Read" : "Not read";
        });
      const cardRemove = document.createElement("button");
        cardRemove.textContent = "Remove book";
        cardRemove.setAttribute("id", "remove-btn");
        cardRemove.setAttribute("data-index", i);
        cardRemove.addEventListener("click", function(e) {
          updateLibrary(e);
        });
    card.appendChild(cardAuthor);
    card.appendChild(cardTitle);
    card.appendChild(cardPages);
    card.appendChild(cardRead);
    card.appendChild(cardRemove);
    container.appendChild(card);
  }
}

function updateLibrary(e) {
  const index = e.target.dataset.index;
  library.splice(index,1);
  container.removeChild(container.childNodes[index]);
  //reset data-indices
  for (let i = 0; i < container.childElementCount; i++) {
    container.childNodes[i].childNodes[4].setAttribute("data-index", i); //node 4 = remove button
    container.childNodes[i].childNodes[3].setAttribute("data-index", i); //node 3 = toggle read button
  }
}

//draw initial library
displayLibrary(0);





