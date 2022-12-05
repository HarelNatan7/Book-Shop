'use strict'

const STORAGE_KEY = 'bookDB'
const gBooksNames = ['How To Be A Developer', 'Fight Club', 'Be A CEO In A Year', 'The Perfect Manager']

var gBooks
var gFilterBy = { minRate: 0, maxPrice: 200 }


function onInIt() {
    _createBooks()
    renderBooks()
}


function _createBook(name, price = getRandomIntInclusive(20, 120), rate = 0) {
    return {
        id: makeId(),
        name,
        price,
        desc: makeLorem(),
        rate
    }
}

function getBooks() {
    var books = gBooks.filter(book => book.rate >= gFilterBy.minRate && book.price <= gFilterBy.maxPrice)
    return books
}

function setBookFilter(filterBy) {
    if (filterBy.minRate) gFilterBy.minRate = filterBy.minRate
    else gFilterBy.maxPrice = filterBy.maxPrice
    return gFilterBy
}

function decreaseRating(book) {
    if (!book.rate) return
    book.rate--
    _saveBooksToStorage()
    return book.rate
}

function increaseRating(book) {
    if (book.rate > 10) return
    book.rate++
    _saveBooksToStorage()
    return book.rate
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {
    const book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function updateBook(bookId, bookPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = bookPrice
    _saveBooksToStorage
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function getBookByName(bookName) {
    const book = gBooks.find(book => bookName === book.name)
    return book
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < gBooksNames.length; i++) {
            var name = gBooksNames[i]
            books.push(_createBook(name))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}