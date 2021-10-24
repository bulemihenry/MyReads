import React from "react";
import { useState } from "react/cjs/react.development";
import shelf1 from "./App";
import * as BooksAPI from "./BooksAPI";

const Edit = (bookReading, want, read) => {
  // if (String(shelf1) === "") {
  //   const [book2ID, setBook2ID] = useState(want.id);
  //   const [book3ID, setBook3ID] = useState(read.id);
  //   const [book1ID, setBook1ID] = useState(bookReading.id);

  //   const updateshelf = async () => {
  //     if (book1ID !== null) {
  //       const updatecurrent = await BooksAPI.update(book1ID, shelf1);
  //     } else if (book2ID !== null) {
  //       const updatewanttoread = await BooksAPI.update(book2ID, shelf1);
  //     } else if (book3ID !== null) {
  //       const updateread = await BooksAPI.update(book3ID, shelf1);
  //     }
  //   };
  // } else {
  // }
  return <div></div>;
};
export default Edit;
