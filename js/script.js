"use strict";

const addBtn = document.querySelector(".add-btn");
const dltBtn = document.querySelector(".dlt-btn");
const modalSubmitBtn = document.querySelector(".submit-btn");

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

// window.addEventListener("DOMContentLoaded", () => {
//   document.querySelector(".modal").setAttribute("open", "");
// });

// Read or not

document.querySelectorAll(".read-btn, .not-read-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isRead = btn.classList.toggle("read-btn");
    btn.classList.toggle("not-read-btn");

    btn.innerHTML = isRead
      ? '<img src="./images/check-mark.png" alt="read" /> Read'
      : '<img src="./images/x-mark.png" alt="not read" /> Not read';
  });
});
