import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./Bookshelf";

function Books() {
  const [showSearchPage, setshowSearchPage] = useState(false);
  const [read, setRead] = useState([]);
  const [currentlyR, setCurrentlyR] = useState([]);
  const [wanttoR, setWanttoR] = useState([]);
  const [shelf1, setShelf] = useState("");

  /*
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  useEffect(() => {
    // BooksAPI.getAll().then((data) => {
    //   console.log(data);
    // });
    (async () => {
      const response = await BooksAPI.getAll();
      const readresult = response.filter(
        (readread) => readread.shelf === "read"
      );
      setRead(readresult);
      const currentresult = response.filter(
        (currentcurrent) => currentcurrent.shelf === "currentlyReading"
      );
      setCurrentlyR(currentresult);
      const wanttoresult = response.filter(
        (wantread) => wantread.shelf === "wantToRead"
      );
      setWanttoR(wanttoresult);
    })();
  }, [setRead, setCurrentlyR, setWanttoR, shelf1]);

  const moveBook = async (book, shelf) => {
    const updateShelf = await BooksAPI.update(book, shelf);
    setShelf(updateShelf); // for re-rendering
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              currentlyR={currentlyR}
              shelf="Currently Reading"
              moveBook={moveBook}
            />
            <BookShelf
              currentlyR={wanttoR}
              shelf="Want To Read"
              moveBook={moveBook}
            />

            <BookShelf currentlyR={read} shelf="Read" moveBook={moveBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Books;
