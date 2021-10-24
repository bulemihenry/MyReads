import React from "react";
import Book from "./Book";

const BookShelf = ({ currentlyR, shelf, moveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currentlyR.map((book) => (
            <Book book={book} moveBook={moveBook} key={book.id} />
          ))}
        </ol>
      </div>
    </div>
  );
};
export default BookShelf;
