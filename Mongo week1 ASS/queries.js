// STEP 3
// queries.js
// 1. Find all books in a specific genre
db.books.find({ genre: "Programming" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// 3. Find books by a specific author
db.books.find({ author: "Robert C. Martin" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "Clean Code" },
  { $set: { price: 50 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "Atomic Habits" });


// STEP 4
// ADVANCED QUERIES
// 1. Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 2. Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 3. Sorting by price
db.books.find().sort({ price: 1 });  // Ascending
db.books.find().sort({ price: -1 }); // Descending

// 4. Pagination: limit + skip
db.books.find().skip(0).limit(5); // Page 1
db.books.find().skip(5).limit(5); // Page 2


// STEP 5
// AGGREGATION PIPELINE
// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 3. Group by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
      count: { $sum: 1 }
    }
  }
]);


// STEP 6
// INDEXING 
// 1. Index on title
db.books.createIndex({ title: 1 });

// 2. Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 3. Explain query performance
db.books.find({ title: "Clean Code" }).explain("executionStats");