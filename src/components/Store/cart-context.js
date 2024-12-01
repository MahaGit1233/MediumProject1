import React from "react";

const CartContext = React.createContext({
    bookmarks: [],
    addBookmark: (bookmark) => { },
    removeBookmark: (id) => { },
});

export default CartContext;