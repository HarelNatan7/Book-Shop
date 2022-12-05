'use strict'

function renderBooks() {
    var books = getBooks()

    var strHTMLs = books.map(book => 
        `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td>${book.rate}</td>
        <td>
        <button class="read-btn" onclick="onReadBook('${book.id}')">Read</button>
        <button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>`
    )
    document.querySelector('tbody').innerHTML = strHTMLs.join('')
}

function onSearchBook(e) {
    e.preventDefault()
    var bookName = document.getElementById("search-box").value
    if (!bookName) {
        gBooks = loadFromStorage(STORAGE_KEY)
        return renderBooks()
    }
    var book = []
    book.push(getBookByName(bookName))
    gBooks = book
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
    flashMsg(`Book Deleted`)
}

function onAddBook() {
    var name = prompt('Book Name?')
    var price = +prompt('Book Price?')
    if (name) {
        const book = addBook(name, price)
        renderBooks()
        flashMsg(`Book Added (id: ${book.id})`)
    }
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var bookPrice = +prompt('New Price?', book.price)
    if (bookPrice && book.price !== bookPrice) {
        const book = updateBook(bookId, bookPrice)
        renderBooks()
        flashMsg(`Price updated to: ${book.price}`)
    }
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = book.id
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.rate-holder').innerText = book.rate
    elModal.classList.add('open')
}

function onDecreaseRating() {
    var bookId = document.querySelector('.modal h4 span').innerHTML
    var book = getBookById(bookId)
    var newRating = decreaseRating(book)
    document.querySelector('.rate-holder').innerHTML = newRating
    renderBooks()
}

function onIncreaseRating() {
    var bookId = document.querySelector('.modal h4 span').innerHTML
    var book = getBookById(bookId)
    var newRating = increaseRating(book)
    document.querySelector('.rate-holder').innerHTML = newRating
    renderBooks()
}


function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}