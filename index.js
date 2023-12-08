function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function displayModal(){
    modal.style.display = 'flex';
}

function hideModal(){
    if(!onModal){
        modal.style.display = 'none';
        modal.style.opacity = 1;
    }
}

function hideModalSubmit(){
    modal.style.display = 'none';
    modal.style.opacity = 1;
}

function clearInput(){
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

function submitClicked(e){
    e.preventDefault();
    const book = getBookAdded();
    clearInput();
    hideModalSubmit();
    console.log(book);
}

function getBookAdded(){
    let userBookTitle = title.value;
    let userBookAuthor = author.value;
    let userBookPages = parseInt(pages.value);
    let userBookRead = read.checked;
    return new Book(userBookTitle,userBookAuthor,userBookPages,userBookRead); 
}

const addBook = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const submitButton = document.querySelector(".submit-button");
const title = document.querySelector(".book-title");
const author = document.querySelector(".book-author");
const pages = document.querySelector(".book-pages");
const read = document.querySelector(".read");
let onModal = false;

addBook.addEventListener("click",displayModal);
modal.addEventListener("click",hideModal);
modalContent.addEventListener("mouseover",() => onModal = true);
modalContent.addEventListener("mouseout",() => onModal = false);
submitButton.addEventListener("click",submitClicked);