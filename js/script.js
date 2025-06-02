"use strict";

const addBtn = document.querySelector(".add-btn");
const readBtn = document.querySelector(".read-btn");
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
