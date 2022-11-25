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
import axios from "../../api/axios";
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
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [doctorId, setDoctorId] = React.useState("");
  const [doctorPrice, setDoctorPrice] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const { departments } = useSelector(
    (state) => state.department
  );

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
  const type = localStorage.getItem("type");

  const addService = async () => {
    const res = await axios.post(
      "/services",
      {
        service_name: name,
        price: price,
        departmentId: id,
        doctors: [{ id: doctorId, price: doctorPrice }],
        duration: duration,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );
    if (res) {
      alert("Service added successfully");
    }
  };
  console.log(services);
  return (
    <>
      <Header />
      <div className={classes.card}>
        <img
          className={classes.img}
          src={photos[id - 1]}
          alt="here"
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

          {type == "admin" ? (
            <>
              <div>admin</div>
              Service Name:
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }></input>
              Service Price:
              <input
                type="text"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }></input>
              Doctor ID:
              <input
                type="text"
                value={doctorId}
                onChange={(e) =>
                  setDoctorId(e.target.value)
                }></input>
              Doctor's Price
              <input
                type="text"
                value={doctorPrice}
                onChange={(e) =>
                  setDoctorPrice(e.target.value)
                }></input>
              Duration:
              <input
                type="text"
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }></input>
              <Button
                variant="primary"
                onClick={addService}>
                Add Service
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <hr />
      <h4 className={classes.num}>
        <b>There are {num} Services</b>
      </h4>
      <div className={classes.boot}>
        {service.map((service) => (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body ">
              <h5 className="card-title">
                {service.service_name}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Duration : {service.duration}
              </h6>
              <p className="card-text">
                Price: {service.price}
              </p>
              <Link
                className={classes.link}
                to={`/services/${service.id}`}>
                Make an appointment
              </Link>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <Footer />
    </>
  );
};

export default Department;
