import React, { useEffect } from "react";
import classes from "./DoctorId.module.scss";
import Header from "../../Components/Header";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorId = () => {
  const { departments } = useSelector(
    (state) => state.department
  );
  const { doctor } = useSelector(
    (state) => state.department
  );
  const dep = departments.find(
    (department) => department.id == doctor.departmentId
  );
  const department = dep?.department_name;

  return (
    <>
      <Header />
      <div className={classes.card}>
        <div className={classes.information}>
          <img
            src={`http://localhost:8800/${doctor.photo}`}
            alt="img"
            style={{ width: "300px", height: "300px" }}
          />
          <div className={classes.card__info}>
            <h2>
              {doctor.name} {doctor.surname}
            </h2>
            <h3>{department}</h3>
            <div>{doctor.category}</div>
            <div>{doctor.rating}</div>
            <div>{doctor.experience_in_year}</div>
            <div>{doctor.degree}</div>
          </div>
        </div>
        {doctor.services.map((service) => (
          <div>
            {service.service_name} {service.price}{" "}
            {service.duration}
          </div>
        ))}
      </div>
    </>
  );
};

export default DoctorId;
