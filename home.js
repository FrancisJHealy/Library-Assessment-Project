function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // Initialize a variable to count the number of borrowed books
  let stillOut = 0;
  
  // Iterate over each book object
  books.forEach(book => {
    // Check the status of the first transaction in the borrows array
    const firstTransaction = book.borrows[0];
    // If the book has not been returned, increment the borrowedCount
    if (!firstTransaction.returned) {
      stillOut++;
    }
  });
  
  // Return the total number of borrowed books
  return stillOut;
}
function getMostCommonGenres(books) {
    // Count the occurrences of each genre
    const genreCounts = {};
    books.forEach(book => {
        const genre = book.genre;
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });

    // Convert the genre counts object to an array of objects
    const genreArray = Object.keys(genreCounts).map(genre => ({
        name: genre,
        count: genreCounts[genre]
    }));

    // Sort the array by count in descending order
    genreArray.sort((a, b) => b.count - a.count);

    // Return the top five genres or less
    return genreArray.slice(0, 5);
}

function getMostPopularBooks(books) {
    // Count the number of borrows for each book
    const bookCounts = {};
    books.forEach(book => {
        const borrowsCount = book.borrows.length;
        bookCounts[book.title] = borrowsCount;
    });

    // Convert the book counts object to an array of objects
    const bookArray = Object.keys(bookCounts).map(title => ({
        name: title,
        count: bookCounts[title]
    }));
    // Sort the array by count in descending order
    bookArray.sort((a, b) => b.count - a.count);

    // Return the top five books or less
    return bookArray.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    // Create a map to store the borrowing count for each author
    const authorBorrowCountMap = new Map();

    // Iterate through each book
    books.forEach(book => {
        // Find the author of the book
        const author = authors.find(author => author.id === book.authorId);

        // Get author's full name
        const authorFullName = `${author.name.first} ${author.name.last}`;

        // Increment the borrowing count for the author
       if (authorBorrowCountMap.has(authorFullName)) {
            authorBorrowCountMap.set(authorFullName, authorBorrowCountMap.get(authorFullName) + book.borrows.length);
        } else {
            authorBorrowCountMap.set(authorFullName, book.borrows.length);
        }
    });
   // Change the map to an array of objects
    const authorBorrowCountArray = Array.from(authorBorrowCountMap, ([name, count]) => ({ name, count }));

    // Sort the array by borrowing count in descending order
    authorBorrowCountArray.sort((a, b) => b.count - a.count);

    // Return only the top 5 authors
    return authorBorrowCountArray.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
