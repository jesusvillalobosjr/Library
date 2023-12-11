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

function changeReadStatus(e){
    const status = e.target.textContent;
    if(status === "Not Read"){
        e.target.textContent = "Read";
        e.target.style.backgroundColor = green;
    }else{
        e.target.textContent = "Not Read";
        e.target.style.backgroundColor = red;
    }
}

function deleteBook(e){
    const indexToDelete = parseInt(e.target.id);
    bookList.splice(indexToDelete,1);
    displayBooks();
}

function createBookElement(bookObj,index){
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    const bookID = `bookID-${index}`;
    bookElement.classList.add(bookID);
    const bookTitle = document.createElement("p");
    bookTitle.textContent = `"${bookObj.title}"`;
    bookElement.appendChild(bookTitle)
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = bookObj.author;
    bookElement.appendChild(bookAuthor);
    const bookPages = document.createElement("p");
    bookPages.textContent = bookObj.pages;
    bookElement.appendChild(bookPages);
    const bookRead = document.createElement("button");
    bookRead.textContent = (bookObj.read ? "Read" : "Not Read");
    bookRead.style.backgroundColor = (bookObj.read ? green : red);
    bookRead.addEventListener("click",changeReadStatus)
    bookElement.appendChild(bookRead);
    const deleteButton = document.createElement("button");
    deleteButton.id = index;
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click",deleteBook);
    bookElement.appendChild(deleteButton);
    books.appendChild(bookElement);
}

function displayBooks(){
    books.innerHTML = "";
    bookList.forEach((book,index) => createBookElement(book,index));
}

function bookSubmitted(e){
    let valid = true;
    const invalidElements = [];
    const formInputs = form.elements;
    for(element of formInputs){
        if(element.validity.valueMissing || !element.validity.valid){
            valid = false;
            invalidElements.push(element);
        }
    }

    if(valid){
        e.preventDefault();
        addBookToList();
        clearInput();
        hideModalSubmit();
        displayBooks();
    }else{
        for(element of invalidElements){
            console.log(element.classList.add("invalid-input"));
        }
        setTimeout(setDefaultInputStyles,1000);
    }
}

function setDefaultInputStyles(){
    title.classList.remove("invalid-input");
    author.classList.remove("invalid-input");
    pages.classList.remove("invalid-input");
}

function addBookToList(){
    let userBookTitle = title.value;
    let userBookAuthor = author.value;
    let userBookPages = parseInt(pages.value);
    let userBookRead = read.checked;
    let book =  new Book(userBookTitle,userBookAuthor,userBookPages,userBookRead); 
    bookList.push(book);
    return book;
}

const bookList = [];
const addBook = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const submitButton = document.querySelector(".submit-button");
const title = document.querySelector(".book-title");
const author = document.querySelector(".book-author");
const pages = document.querySelector(".book-pages");
const read = document.querySelector(".read");
const books = document.querySelector(".books");
const form = document.querySelector(".modal-content");
const red = "rgb(170,0,0)";
const green = "lightgreen";
let onModal = false;
let id = 0;

addBook.addEventListener("click",displayModal);
modal.addEventListener("click",hideModal);
modalContent.addEventListener("mouseover",() => onModal = true);
modalContent.addEventListener("mouseout",() => onModal = false);
submitButton.addEventListener("click",bookSubmitted);