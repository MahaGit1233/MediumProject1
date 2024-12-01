import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookMarkHandler = (bookmark) => {
    setBookmarks((prevMarks) => [...prevMarks, bookmark]);
  };

  const removeBookMarkHandler = (id) => {
    setBookmarks((prevMarks) => prevMarks.filter((mark) => mark.id !== id));
  };

  const updateBookmarkHandler = (id, updatedName, updatedLink) => {
    setBookmarks((prevMarks) =>
      prevMarks.map((mark) =>
        mark.id === id ? { ...mark, name: updatedName, link: updatedLink } : mark
      )
    );
  };

  const cartContext = {
    bookmarks: bookmarks,
    addBookmark: addBookMarkHandler,
    removeBookmark: removeBookMarkHandler,
    updateBookmark: updateBookmarkHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
