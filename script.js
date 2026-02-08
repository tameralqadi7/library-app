const myLibrary = [];

// Constructor for Book
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Function to add book to library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to display books
function displayBooks() {
    const container = document.getElementById('library-container');
    container.innerHTML = '';
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-id', book.id);
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="remove-btn">Remove</button>
            <button class="toggle-read-btn">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
        `;
        container.appendChild(card);
    });
}

// Event listeners
document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('book-dialog').showModal();
});

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    document.getElementById('book-form').reset();
    document.getElementById('book-dialog').close();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    document.getElementById('book-form').reset();
    document.getElementById('book-dialog').close();
});

document.getElementById('library-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const id = e.target.parentElement.getAttribute('data-id');
        const index = myLibrary.findIndex(book => book.id === id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            displayBooks();
        }
    } else if (e.target.classList.contains('toggle-read-btn')) {
        const id = e.target.parentElement.getAttribute('data-id');
        const book = myLibrary.find(book => book.id === id);
        if (book) {
            book.read = !book.read;
            displayBooks();
        }
    }
});

// Manually add some books
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
