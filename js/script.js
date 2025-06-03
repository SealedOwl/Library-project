"use strict";

const addBtn = document.querySelector(".add-btn");
const modalSubmitBtn = document.querySelector(".submit-btn");

const booksGrid = document.querySelector(".books-grid");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal-form");

const myLibrary = [
  {
    title: "I Had That Same Dream Again",
    author: "Yoru Sumino",
    pages: 107,
    isRead: true,
  },
  {
    title: "The Boy, the Mole, the Fox and the Horse",
    author: "Charlie Mackes",
    pages: 39,
    isRead: true,
  },
];

const Book = function (
  title = "Unknown",
  author = "Unknown",
  pages = "Unknown",
  isRead = false
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

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

// Keep the dialog opened

// window.addEventListener("DOMContentLoaded", () => {
//   document.querySelector(".modal").setAttribute("open", "");
// });

// Read or not button
// Delete book card
// Event delegation

booksGrid.addEventListener("click", (e) => {
  const readBtn = e.target.closest(".read-btn, .not-read-btn");
  const dltBtn = e.target.closest(".dlt-btn");

  // Read or not-read toggle button

  if (readBtn) {
    const isNowRead = readBtn.classList.toggle("read-btn");
    readBtn.classList.toggle("not-read-btn");

    readBtn.innerHTML = isNowRead
      ? '<img src="./images/check-mark.png" alt="read" /> Read'
      : '<img src="./images/x-mark.png" alt="not read" /> Not read';
    return;
  }

  // Delete book card

  if (dltBtn) {
    const bookCard = dltBtn.closest(".books");
    if (bookCard) bookCard.remove();
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

  modalForm.reset();
  modal.close();
});
