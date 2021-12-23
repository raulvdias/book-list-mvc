class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //create tr
    const row = document.createElement('tr');
    //cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</td>
    `;

    list.appendChild(row);
  }
showAlert(message, className) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);

  }
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }

  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }
}

//local storage Class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];

    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();

      //add book to ui
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

export {Store, Book, UI};
