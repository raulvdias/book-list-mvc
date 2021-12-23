import {Book, UI, Store} from "./model/model.js";

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listeners 

document.getElementById('book-form').addEventListener('submit', function (e) {
  //get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //instantiate a book
  const book = new Book(title, author, isbn);

  //instantiate ui
  const ui = new UI();

  //validate
  if (title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //add book to the list
    ui.addBookToList(book);

    //add to local storage
    Store.addBook(book);

    //insert alert
    ui.showAlert('Book added', 'sucess');

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//event listener for delete 

document.getElementById('book-list').addEventListener('click', function (e) {

  const ui = new UI();

  ui.deleteBook(e.target);
  //remove from ls
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show message
  ui.showAlert('book removed', 'sucess');

  e.preventDefault();
});
