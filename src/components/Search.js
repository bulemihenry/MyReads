import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const Search = ({ shelves }) => {
  const [inputed, setInputed] = useState("");
  const [searched, setSearched] = useState([]);

  const handleChange = (e) => {
    const inputdata = e.target.value;
    setInputed(inputdata);
  };
  useEffect(() => {
    (async () => {
      try {
        const searchresults = await BooksAPI.search(inputed.trim());

        const result =
          searchresults && !searchresults.error
            ? searchresults.map((book) => {
                const book1 = shelves.find((item) => item.id === book.id);

                if (book1) {
                  book.shelf = book1.shelf;
                  return book;
                }
                return book;
              })
            : [];
        setSearched(result);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [inputed]);

  const moveBook = async (book, shelf) => {
    const updateShelf = await BooksAPI.update(book, shelf);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search"></button>
        </Link>
        <div className="search-books-input-wrapper">
          {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searched
            ? searched.map((book) => (
                <Book book={book} moveBook={moveBook} key={book.id} />
              ))
            : null}
        </ol>
      </div>
    </div>
  );
};
export default Search;
