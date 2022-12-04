import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { setName } from "../../Redux/Slices/departmentSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./Department.module.scss";
import { height } from "@mui/system";
import Footer from "../../Components/Footer/Footer";
import axios from "../../api/axios";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../Components/Header/Header";

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
  const { info_doctor } = useSelector(
    (state) => state.service
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
  const deleteService = async (id) => {
    try {
      const response = await axios.delete(
        `/services/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
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
            <h5 className={classes.admin}>
              <div>Service Name:</div>
              <TextField
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }></TextField>
              <div>Service Price: </div>
              <TextField
                type="text"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }></TextField>
              <div>Select Doctor:</div>
              <TextField
                id="outlined-select-currency"
                required
                select
                label="Doctor Name"
                value={doctorId}
                onChange={(e) =>
                  setDoctorId(e.target.value)
                }>
                {info_doctor.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <div>Doctor's Price</div>
              <TextField
                type="text"
                value={doctorPrice}
                onChange={(e) =>
                  setDoctorPrice(e.target.value)
                }></TextField>
              <div>Duration: </div>
              <TextField
                type="text"
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }></TextField>
              <Button
                className={classes.button}
                variant="primary"
                onClick={addService}>
                Add Service
              </Button>
            </h5>
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
              {localStorage.getItem("type") == "admin" && (
                <div>
                  Delete the Service:{" "}
                  <DeleteIcon
                    onClick={() =>
                      deleteService(service.id)
                    }
                  />
                </div>
              )}
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
