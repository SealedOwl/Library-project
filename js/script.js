"use strict";

const addBtn = document.querySelector(".add-btn");
const modalSubmitBtn = document.querySelector(".submit-btn");

const booksGrid = document.querySelector(".books-grid");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal-form");

const Book = function (
  title = "Unknown",
  author = "Unknown",
  pages = "Unknown",
  isRead = false,
  id = crypto.randomUUID()
) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

let myLibrary = [];

const storedLibrary = localStorage.getItem("myLibrary");

if (storedLibrary) {
  myLibrary = JSON.parse(storedLibrary).map((book) => {
    return new Book(book.title, book.author, book.pages, book.isRead);
  });
} else {
  myLibrary = [
    new Book("I Had That Same Dream Again", "Yoru Sumino", 107, true),
    new Book(
      "The Boy, the Mole, the Fox and the Horse",
      "Charlie Mackes",
      39,
      true
    ),
  ];
}

// Save library to Local Storage

const saveLibrary = function () {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

// Add book button

addBtn.addEventListener("click", () => {
  modal.showModal();
});

// Modal

modal.addEventListener("click", (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  const isOutside =
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom;
  if (isOutside && e.target === modal) {
    modal.close();
  }
});

booksGrid.addEventListener("click", (e) => {
  const readBtn = e.target.closest(".read-btn, .not-read-btn");
  const dltBtn = e.target.closest(".dlt-btn");
  const card = e.target.closest(".books");

  if (!card) return;

  const bookId = card.dataset.id;

  // Read or not-read toggle button

  if (readBtn) {
    const book = myLibrary.find((book) => book.id === bookId);

    if (book) {
      book.isRead = !book.isRead;
      saveLibrary();
      renderLibrary();
    }

    return;
  }

  // Delete book card

  if (dltBtn) {
    const index = myLibrary.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      saveLibrary();
      renderLibrary();
    }
    return;
  }
});

// Create Book objects

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // check form validity before submit

  if (!modalForm.checkValidity()) {
    modalForm.reportValidity();
    return;
  }

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const isRead = document.getElementById("isRead").checked;

  const newBook = new Book(title, author, pages, isRead);

  myLibrary.push(newBook);
  saveLibrary();

  modalForm.reset();
  modal.close();

  // Re-render
  renderLibrary();
});

// Create book card

const createBookCard = function (book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("books");
  bookCard.dataset.id = book.id;

  bookCard.innerHTML = `
          <div class="book-details">
            <h2 class="title">${book.title}</h2>
            <div class="author book-texts">
              <p class="description">Author :</p>
              <p class="description">${book.author}</p>
            </div>
            <div class="total-pages book-texts">
              <p class="description">Total Pages :</p>
              <p class="description">${book.pages}</p>
            </div>
          </div>

          <div class="btns-container">
            <button class="${book.isRead ? "read-btn" : "not-read-btn"}">
              <img src="./images/${
                book.isRead ? "check-mark.png" : "x-mark.png"
              }" alt="${book.isRead ? "read" : "not read"}" /> ${
    book.isRead ? "Read" : "Not read"
  }
            </button>
            <button class="dlt-btn">
              <img src="./images/delete.png" alt="delete" /> Delete
            </button>
          </div>
  `;

  return bookCard;
};

// Render books from library

const renderLibrary = function () {
  booksGrid.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = createBookCard(book);
    booksGrid.appendChild(card);
  });
};

// Initial render
renderLibrary();
