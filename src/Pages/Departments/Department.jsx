import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";
import { setName } from "../../Redux/Slices/departmentSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./Department.module.scss";
import { height } from "@mui/system";
import Footer from "../../Components/Footer/Footer";
const photos = [
  "../../img/1.png",
  "../../img/2.png",
  "../../img/3.png",
  "../../img/4.png",
  "../../img/5.png",
  "../../img/6.png",
  "../../img/7.png",
  "../../img/8.png",
  "../../img/9.png",
  "../../img/10.png",
  "../../img/11.png",
  "../../img/12.png",
  "../../img/13.png",
  "../../img/14.png",
];
const Department = () => {
  const { departments } = useSelector(
    (state) => state.department
  );
  const dispatch = useDispatch();

  const { id } = useParams();
  const department = departments.find(
    (department) => department.id == id
  );
  const { services } = useSelector(
    (state) => state.service
  );
  const service = services.filter(
    (service) => service.departmentId == id
  );
  const num = service.length;

  const clickService = (name) => {
    dispatch(setName(name));
  };

  return (
    <>
      <Header />
      <div className={classes.card}>
        <img
          className={classes.img}
          src={photos[id - 1]}
          alt=""
        />
        <div className={classes.content}>
          <Card.Title>
            <h1>{department.department_name}</h1>
          </Card.Title>
          <hr />
          <h4>Description</h4>
          <Card.Text>
            {department.department_info}
          </Card.Text>
          <hr />
          <h4 className={classes.num}>
            There are {num} Services
          </h4>
          <div className={classes.services}>
            {service.map((service) => (
              <div>
                <Link to={`/services/${service.id}`}>
                  <Button variant="primary">
                    {service.service_name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </>
  );
};

export default Department;
