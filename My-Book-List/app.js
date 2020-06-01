//Book class 

class Book{
    constructor(title , author , isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI CLass

class UI{

    static displayBooks(){
        const storedBooks = Store.getBooks();

        const books = storedBooks;
        //LOOP THROUGH ALL THE BOOKS AND ADD BOOKS TO THE LIST
        books.forEach(book=>UI.addBookToList(book));
    }

   static addBookToList(book){
     
     const getTableIdToAdd = document.querySelector('#book-list');

     //create a row
     const rowforBook = document.createElement('tr');
     //set the coloumn for newly created row

     rowforBook.innerHTML = `<td>${book.title}</td>
                             <td>${book.author}</td>
                             <td>${book.isbn}</td>
                             <td><a href="#"class="btn btn-danger btn-sm delete">X</a></td>
                            `;
     //append that row
      
     getTableIdToAdd.appendChild(rowforBook);
      
   }

   static clearFields(){
       document.querySelector('#title').value = '';
       document.querySelector('#author').value = '';
       document.querySelector('#isbn').value = '';
   }

   static removeBookFromItem(book){
      
    //will the row which contains delete class
       if(book.classList.contains('delete'))
           book.parentElement.parentElement.remove();
        
   }

   static showAlert(message , type){
       //CREATING A DIV WITH ALERT TYPE WHICH WILL BE PASSED
       // create something like this --> <div class="alert alert-success">Message </div>
       const div = document.createElement('div');
       div.className = `alert alert-${type}`;
       div.appendChild(document.createTextNode(message));
       
       const container = document.querySelector('.container');
       const form = document.querySelector('#book-form');

       container.insertBefore(div,form);

       //Vanish after 2 second
       setTimeout(()=>document.querySelector('.alert').remove(),2000);
   }

}

//STORE ALL DATA IN LOCAL STORAGE
 class Store{
     static getBooks(){
       
         let books ;
            if(localStorage.getItem('books') === null)
            books=[];
            else
            books = JSON.parse(localStorage.getItem('books'));

        return books;
     }

     static addBook(book){

        let books = this.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

     }

     static removeBook(isbn){
       let books = this.getBooks();

       books.forEach((element,index) => {
           if(element.isbn === isbn)
             books.splice(index , 1);
       });

       localStorage.setItem('books',JSON.stringify(books));
     }
 }
//DISPLAY BOOKS

document.addEventListener('DOMContentLoaded',UI.displayBooks);


//ADD A BOOK TO THE LIST 

document.querySelector('#book-form').addEventListener('submit',event=>{
    //PRVENT ACTUAL SUBMIT

      event.preventDefault();
     //GET ALL THE FORM VALUE
     const title = document.querySelector('#title').value;
     const author = document.querySelector('#author').value;
     const isbn = document.querySelector('#isbn').value;

     //VALIDATE FOR EMPTY FIELD
     if(title=='' || author==''|| isbn==''){
         UI.showAlert('Please fill all the field!','danger');
     }else{
     //CREATE A NEW BOOK INSTANCE

     const book = new Book(title,author,isbn);

     //ADD BOOK TO LIST

     UI.addBookToList(book);
     //ADD BOOK TO LOCAL STORAGE
     Store.addBook(book);

     UI.showAlert('Book Added Succesfully!','success');
     //Clear all fields of form

      UI.clearFields();
     }
});

//REMOVE BOOK FROM TABLE

document.querySelector('#book-list').addEventListener('click',event=>{
   
    UI.removeBookFromItem(event.target);
    //Get the isbn value and send to remove method of store class 
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed Successfully!','success');
});