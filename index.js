function displayModal(){
    modal.style.display = 'flex';
}

function hideModal(){
    if(!onModal){
        modal.style.display = 'none';
        modal.style.opacity = 1;
    }
}

const addBook = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const submitButton = document.querySelector(".submit-button");
let onModal = false;

addBook.addEventListener("click",displayModal);
modal.addEventListener("click",hideModal);
modalContent.addEventListener("mouseover",() => onModal = true);
modalContent.addEventListener("mouseout",() => onModal = false);