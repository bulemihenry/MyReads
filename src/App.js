import React, { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { string } from "prop-types";

function BooksApp() {
  const [showSearchPage, setshowSearchPage] = useState(false);
  const [read, setRead] = useState([]);
  const [currentlyR, setCurrentlyR] = useState([]);
  const [wanttoR, setWanttoR] = useState([]);
  const [shelf, setShelf] = useState("");
  const [book, setBook] = useState({});

  const handleChange = (e, b) => {
    const shelfstatus = setShelf(e.target.value);
    if (shelf === "currentlyReading") {
      setBook(b.id);
    } else if (shelf === "read") {
      setBook(b.id);
    } else if (shelf === "wantToRead") {
      setBook(b.id);
    } else {
    }
  };
  const handleUpdate = async () => {
    const resreq = await BooksAPI.update(book, shelf);
  };
  // update on curreently reading

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
      const updateresponse = await BooksAPI.get();
    })();
    // const request = BooksAPI.update();
  }, [setRead, setCurrentlyR, setWanttoR]);
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => setshowSearchPage(false)}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
              <input type="text" placeholder="Search by title or author" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid" />
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  {currentlyR.map((bookReading) => (
                    <ol className="books-grid" key={bookReading.id}>
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${bookReading.imageLinks.thumbnail})`,
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                id="reading"
                                value={shelf}
                                onChange={(e) => setShelf(e.target.value)}
                              >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{bookReading.title}</div>
                          <div className="book-authors">
                            {bookReading.authors}
                          </div>
                        </div>
                      </li>
                    </ol>
                  ))}
                </div>
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  {wanttoR.map((wantreading) => (
                    <ol className="books-grid" key={wantreading.id}>
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${wantreading.imageLinks.thumbnail})`,
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                id="wanttoread"
                                value={shelf}
                                onChange={(e) => setShelf(e.target.value)}
                              >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{wantreading.title}</div>
                          <div className="book-authors">
                            {wantreading.authors}
                          </div>
                        </div>
                      </li>
                    </ol>
                  ))}
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  {read.map((readalready) => (
                    <ol className="books-grid" key={readalready.id}>
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 192,
                                backgroundImage: `url(${readalready.imageLinks.thumbnail})`,
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                id="read"
                                value={shelf}
                                onChange={(e) => setShelf(e.target.value)}
                              >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{readalready.title}</div>
                          <div className="book-authors">
                            {readalready.authors}
                          </div>
                        </div>
                      </li>
                    </ol>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => setshowSearchPage(true)}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksApp;