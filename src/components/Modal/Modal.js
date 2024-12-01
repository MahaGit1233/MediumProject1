import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './Modal.css';

const Backdrop = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredLink, setEnteredLink] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (props.bookmark) {
      setEnteredName(props.bookmark.name);
      setEnteredLink(props.bookmark.link);
    }
  }, [props.bookmark]);

  const nameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredName(event.target.value);
  }

  const linkChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredLink(event.target.value);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredName.trim().length === 0 || enteredLink.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onBookMarkData(enteredName, enteredLink);
    setEnteredName('');
    setEnteredLink('');
    props.onClose();
  }

  return (
    <div className="backdrop">
      <form className="form" onSubmit={formSubmitHandler}>
        <label htmlFor="site">Website Name: </label>
        <input
          id="site"
          type="text"
          value={enteredName}
          onChange={nameChangeHandler}
        />
        <label htmlFor="link">Link: </label>
        <input
          id="link"
          type="text"
          value={enteredLink}
          onChange={linkChangeHandler}
        />
        <div className="buttons">
          <button className="closeBtn" onClick={props.onClose}>Close</button>
          <button type="submit" className="addBtn">{props.bookmark ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
}

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={props.onClose}
          onBookMarkData={props.onBookMarkData}
          bookmark={props.bookmark}
        />,
        document.getElementById("backdrop-root")
      )}
    </React.Fragment>
  );
}

export default Modal;
