import React from "react";
import axios from "../../../api/axios";
import Header from "../../../Components/Header";
import { Button } from "@mui/material";
import classes from "./PersonalAdmin.module.scss";
import { Link } from "react-router-dom";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useDispatch } from "react-redux";
import {
  setDataPatients,
  setDataDoctors,
} from "../../../Redux/Slices/userSlice";

const PersonalAdmin = () => {
  const dispatch = useDispatch();

  const [patients, setPatients] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [clickedPatient, setClickedPatient] =
    React.useState(false);
  const [clickedDoctor, setClickedDoctor] =
    React.useState(false);

  const getPatients = () => {
    try {
      axios
        .get("myPage/admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        })
        .then((response) => {
          setPatients(response.data.allPatients);

          dispatch(
            setDataPatients(response.data.allPatients)
          );
        });
    } catch (err) {
      console.log(err.message);
    }
    setClickedDoctor(false);
    setClickedPatient(true);
  };

  const getDoctors = () => {
    try {
      axios
        .get("/myPage/admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        })
        .then((response) => {
          dispatch(
            setDataDoctors(response.data.allDoctors)
          );
          setDoctors(response.data.allDoctors);
        });
    } catch (err) {
      console.log(err.message);
    }
    setClickedPatient(false);
    setClickedDoctor(true);
  };

  return (
    <div>
      <Header />
      <div className={classes.button}>
        <Button variant="contained" onClick={getPatients}>
          Get Patients
        </Button>
        <Button variant="contained" onClick={getDoctors}>
          Get Doctors
        </Button>
        <Link to="/registerPatient">
          <Button variant="contained" onClick={getPatients}>
            Register a Patient
          </Button>
        </Link>

        <Link to="/registerDoctor">
          <Button variant="contained" onClick={getPatients}>
            Register a Doctor
          </Button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered table-sm table-primary border-primary">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {clickedPatient &&
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}.</td>
                  <td>{patient.name}</td>
                  <td>{patient.surname}</td>
                  <td>{patient.email}</td>

                  <div className={classes.icon}>
                    <Link to={`/patient/${patient.id}`}>
                      <BorderColorOutlinedIcon />
                    </Link>
                  </div>
                </tr>
              ))}
            {clickedDoctor &&
              doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}.</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.surname}</td>
                  <td>{doctor.email}</td>
                  <div className={classes.icon}>
                    <Link to={`/doctor/${doctor.id}`}>
                      <BorderColorOutlinedIcon />
                    </Link>
                  </div>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalAdmin;
