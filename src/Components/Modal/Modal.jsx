import React from "react";
import Login from "../../Pages/Login";
import classes from "./Modal.module.scss";
const Modal = ({ active, setActive, text }) => {
  return (
    <div
      className={classes.modal}
      onClick={() => setActive(false)}>
      <div
        className={classes.modal__content}
        onClick={(e) => e.stopPropagation()}>
        <Login text={text} />
      </div>
    </div>
  );
};

export default Modal;
