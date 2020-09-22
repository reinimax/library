function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "already read" : "not yet read"}`;
    }
  }

  const hobbit = new Book("J.R.R. Tolkien", "The Hobbit", 300, true);
  console.log(hobbit.info());