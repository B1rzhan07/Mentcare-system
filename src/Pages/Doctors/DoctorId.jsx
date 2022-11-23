import React from "react";
import classes from "./DoctorId.module.scss";
import Header from "../../Components/Header";
const DoctorId = () => {
  return (
    <>
      <Header />
      <div className={classes.card}>
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <div>name</div>
        <div>surname</div>
        <div>department</div>
        <div>category</div>
        <div>rating</div>
      </div>
    </>
  );
};

export default DoctorId;
