const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isRead");
const addBookButton = document.getElementById("addBookButton"); 
const bookList = document.getElementById("bookList"); 
const modalWindow = document.getElementById("modalWindow");
const modalContent = document.getElementById("modalContent");
const removeModal = document.getElementById("removeModal");

// кнопки для вызова типо модального окна
modalWindow.addEventListener("click", () => {
  modalContent.classList.remove("actv");
  
});
removeModal.addEventListener("click", () => {
  modalContent.classList.add("actv"); 
});

//---------------------------------------------------


let myLibrary = [];

// Загрузка библиотеки из localStorage при загрузке страницы
window.addEventListener('load', () => {
  const storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if (storedLibrary) {
    myLibrary = storedLibrary;
    renderBookList();
  }
});

function Book(bookName, author, number, checked) {
  return {
    bookName: bookName,
    author: author,
    number: number,
    checked: checked,
  };
}

function addBookToLibrary() {
  const bookName = title.value;
  const bookAuthor = author.value;
  const bookPages = pages.value;
  const isReadChecked = isRead.checked; 
    
    if (bookName === "" || bookAuthor === "" || bookPages === "") {
      alert("Пожалуйста, заполните все поля книги.");
      return; 
    }
  const newBook = Book(bookName, bookAuthor, bookPages, isReadChecked);
  myLibrary.push(newBook);
  renderBookList(); 

  // Сохранение библиотеки в localStorage после добавления книги
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

  title.value = '';
  author.value = '';
  pages.value = '';
  isRead.checked = false; 
}







function renderBookList() {
  bookList.innerHTML = ''; 
  myLibrary.forEach((book, i) => {
    const bookItem = document.createElement("div"); 
    bookItem.classList.add("book-item"); 
    bookItem.id = "box"
    bookItem.innerHTML = `
      <h3>${book.bookName}</h3>
      <p>Author: ${book.author}</p>
      <p class= "par">Pages: ${book.number}</p>
      <button  id="read-${i}"  class = " btn ${book.checked ? "green" : "red"}"> ${book.checked ? "Read" : "Not read"}</button>
      <button  id="remove-${i}"  class = "btn removeBox">Remove</button>
      
    `;

    //кнопка для обозначения прочитал ли книгу или нет 
    modalContent.classList.add("actv");
    bookList.appendChild(bookItem); 
    const buttonRead = document.getElementById(`read-${i}`)
    buttonRead.addEventListener("click", () => {
      book.checked = !book.checked 
      // Сохранение обновленной библиотеки в localStorage после изминения чекеда 
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
       renderBookList()
    })

    //кнопка для удалаения контайнера 
    const removeButton = document.getElementById(`remove-${i}`)
    removeButton.addEventListener("click", () => {
      myLibrary = myLibrary.filter((item, id) => {
            return id !== i
      })
      renderBookList();
      // Сохранение обновленной библиотеки в localStorage после удаления
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    })
  });
  
}


addBookButton.addEventListener("click",  addBookToLibrary ); 