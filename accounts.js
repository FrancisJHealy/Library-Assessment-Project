function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id === id);
return result;
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((accountA, accountB)=> { return accountA.name.last < accountB.name.last ? -1: 1});
          return result;
}
function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  books.forEach(book => {
    // Check if the account's ID appears in the book's borrows array
    const borrows = book.borrows;
    borrows.forEach(borrow => {
      if (borrow.id === account.id) {
        // If the account's ID is found, increment the totalBorrows counter
        totalBorrows++;
      }
    });
  });
  
  // Return the total number of borrows
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
// Filter the books that are currently checked out by the given account
  const checkedOutBooks = books.filter(book =>
    book.borrows.some(borrow => borrow.id === account.id && !borrow.returned)
  );
  
  // Add author information to the filtered books
  const booksWithAuthors = checkedOutBooks.map(book => {
    // Find the author information for the current book
    const author = authors.find(author => author.id === book.authorId);
    // Return a new object with the book and author information
    return {
      ...book,
      author
    };
  });
  
  return booksWithAuthors;
}  


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
