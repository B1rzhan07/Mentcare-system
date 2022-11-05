import React from "react";
import classes from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
const Card = ({ departmentName, photoDepartment, id }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={classes.card}
        onClick={() => navigate(`./department/${id}`)}>
        {departmentName}

        <div>
          <hr />
          <img
            width={120}
            height={120}
            src={photoDepartment}
            alt="department"
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Card;
