//variables
const addBtn = document.querySelector("#addBtn");
const clearStorageBtn = document.querySelector("#clearStorage");
const container = document.querySelector("#container");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

//in this array the books will be stored
let library = [  
  new Book("J.R.R. Tolkien", "The Hobbit", 300, true),
  new Book("Andrzej Sapkowski", "The Last Wish", 350, true)
];

//Book constructor and prototype
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = (this.read) ? false : true;
}

//local storage
let storage; 
try {
  storage = window.localStorage;
  storage.setItem("test", "Can retrieve data from local storage");
  console.log(storage.getItem("test"));
  storage.removeItem("test");
} catch {
  console.log("Storage not availabe");
}

//events
addBtn.addEventListener("click", addBook);
clearStorageBtn.addEventListener("click", function() {
  storage.clear();
  console.log(storage);
  console.log(storage.length);
});

//functions
function saveLibrary() {
  //turning the array into a string and saving it in storage
  storage.clear(); //The storage is cleared first to prevent elements sticking to the end when books are deleted
  for (let i = 0; i < library.length; i++) {
    let objString = Object.values(library[i]);
    storage.setItem(`library${i}`, objString);
  }
}

function retrieveLibrary() {
  //clear the library if the storage is shorter, so that only the storage and now sample books are displayed
  if (storage.length > 0 && storage.length < library.length) library = []; 
  //turning the string back into an array with objects (if storage is empty the loop won't execute and so the original sample library will be drawn)
  for (let j = 0; j < storage.length; j++) {
    let storageArray = storage.getItem(`library${j}`).split(",");
    let recoverReadStatus = (storageArray[3] === "true") ? true : false;
    library[j] = new Book(storageArray[0],storageArray[1],storageArray[2],recoverReadStatus);
  }
  //draw library from the beginning
  displayLibrary(0);
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
  saveLibrary();
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
          saveLibrary();
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
  saveLibrary();
}

//initialize Library
retrieveLibrary();