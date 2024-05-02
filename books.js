function findAuthorById(authors, id) {
  const result = authors.find((author)=> author.id === id);
  return result
}

function findBookById(books, id) {
  const result = books.find((book) => book.id === id);// look through the books array and compare to the id provided
  return result
}

function partitionBooksByBorrowedStatus(books) {
 const checkedOutBooks = [];
  const returnedBooks = [];
  // Iterate over each book object
  books.forEach(book => {
    // Check the status of the first transaction in the borrows array
    const firstTransaction = book.borrows[0];
    // Determine if the book is currently checked out or has been returned
    if (!firstTransaction.returned) {
      // If the book is currently checked out, add it to the checkedOutBooks array
      checkedOutBooks.push(book);
       } else {
      // If the book has been returned, add it to the returnedBooks array
      returnedBooks.push(book);
    }
  });
  // Return an array containing the two arrays of books based on their borrowed status
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;// Extract the borrows array from the book object
  const borrowers = [];// Initialize an array to hold the result
  // Iterate over each transaction in the borrows array
  borrows.forEach(borrow => {
    // Find the corresponding account object by ID in the accounts array
    const account = accounts.find(account => account.id === borrow.id);
    // Include the returned status in the account object
    account.returned = borrow.returned;
    // Add the modified account object to the result array
    borrowers.push(account);
  });
  
  // Return an array of up to ten account objects
  return borrowers.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
