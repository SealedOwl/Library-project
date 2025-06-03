"use strict";

const addBtn = document.querySelector(".add-btn");
const modalSubmitBtn = document.querySelector(".submit-btn");

const booksGrid = document.querySelector(".books-grid");
const modal = document.querySelector(".modal");

const myLibrary = [];

const Book = function (title, author, pages, isRead = "false") {
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
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
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
