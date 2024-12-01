import { useContext, useState } from "react";
import CartProvider from "./components/Store/CartProvider";
import Modal from "./components/Modal/Modal";
import CartContext from "./components/Store/cart-context";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  const CartCtx = useContext(CartContext);

  const modalHandler = () => {
    setShowModal(true);
  }

  const closeBtnHandler = () => {
    setShowModal(false);
    setEditingBookmark(null);
  }

  const BookMarkDataHandler = (enteredName, enteredLink) => {
    if (editingBookmark) {
      CartCtx.updateBookmark(editingBookmark.id, enteredName, enteredLink);
    } else {
      const newBookMark = {
        id: Math.random(),
        name: enteredName,
        link: enteredLink,
      };
      CartCtx.addBookmark(newBookMark);
    }
    setShowModal(false);
    setEditingBookmark(null);
  }

  const delBtnHandler = (id) => {
    CartCtx.removeBookmark(id);
  }

  const editBtnHandler = (mark) => {
    setEditingBookmark(mark);
    setShowModal(true);
  }

  return (
    <CartProvider>
      <div style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
        <h1>Bookmark Website</h1>
        <button onClick={modalHandler}>Add New</button>
      </div>
      <div>
        <h3 style={{ fontFamily: "Times New Roman", marginLeft: "20px" }}>All Bookmarks</h3>
      </div>
      <ul style={{ listStyleType: "none", fontFamily: "Times New Roman" }}>
        {CartCtx.bookmarks.map((mark) => {
          return (
            <li key={mark.id}>
              {mark.name}  {'>'}  <span style={{color:"blue", textDecoration:"underline"}}>{mark.link}</span> 
              <button onClick={() => delBtnHandler(mark.id)}>Delete</button>
              <button onClick={() => editBtnHandler(mark)}>Edit</button>
            </li>
          );
        })}
      </ul>
      {showModal && (
        <Modal
          onClose={closeBtnHandler}
          onBookMarkData={BookMarkDataHandler}
          bookmark={editingBookmark} 
        />
      )}
    </CartProvider>
  );
}

export default App;
