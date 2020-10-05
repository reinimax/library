//variables
const addBtn = document.querySelector("#addBtn");
const clearStorageBtn = document.querySelector("#clearStorage");
const info = document.querySelector("#info");
const container = document.querySelector("#container");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

//Book class
class Book {
  
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
  
  toggleRead() {
    this.read = (this.read) ? false : true;
  }
}

//in this array the books will be stored
let library = [  
  new Book("J.R.R. Tolkien", "The Hobbit: Or, There and Back Again", 333, true),
  new Book("Andrzej Sapkowski", "The Last Wish", 352, true),
  new Book("Shakespeare", "Hamlet", 342, false),
  new Book("Aristotle", "The Nicomachean Ethics", 400, true)
];

//local storage
let storageAvailable = true;

try {
  var storage = window.localStorage; //using var here, because let and const have block scope and var hasn't
  storage.setItem("test", "Can retrieve data from local storage");
  console.log(storage.getItem("test"));
  storage.removeItem("test");
  info.textContent += " Your changes will be stored locally.";
} catch {
  console.log("Storage not availabe");
  storageAvailable = false;
  info.textContent += " Local storage is disabled. Your changes will not be saved!";
  clearStorageBtn.disabled = true;
}

//events
addBtn.addEventListener("click", addBook);
clearStorageBtn.addEventListener("click", function() {
  if (storageAvailable) storage.clear();
});

//functions
function saveLibrary() {
  //turning the array into a string and saving it in storage
  if (storageAvailable) {
    storage.clear(); //The storage is cleared first to prevent elements sticking to the end when books are deleted
    for (let i = 0; i < library.length; i++) {
      let objString = (Object.values(library[i])).join("*|*");
      storage.setItem(`library${i}`, objString);
    }
  }
}

function retrieveLibrary() {
  if (storageAvailable) {
    //clear the library if the storage is shorter, so that only the storage and not sample books are displayed
    if (storage.length > 0 && storage.length < library.length) library = []; 
    //turning the string back into an array with objects (if storage is empty the loop won't execute and so the original sample library will be drawn)
    for (let j = 0; j < storage.length; j++) {
      let storageArray = storage.getItem(`library${j}`).split("*|*");
      let recoverReadStatus = (storageArray[3] === "true") ? true : false;
      library[j] = new Book(storageArray[0],storageArray[1],storageArray[2],recoverReadStatus);
    }
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
  author.value = "";
  title.value = "";
  pages.value = "";
  read.checked = false;
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