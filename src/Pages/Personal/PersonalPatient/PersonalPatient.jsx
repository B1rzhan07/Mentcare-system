import React from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./PersonalPatient.module.scss";
import { bloodGroups } from "../../../assets/Personal/personal";
import { maritalStatuses } from "../../../assets/Personal/personal";
import Form from "react-bootstrap/Form";
import Header from "../../../Components/Header/Header";
import Card from "react-bootstrap/Card";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";

const PersonalPatient = () => {
  const type = localStorage.getItem("type");
  const { patients } = useSelector((state) => state.user);
  const { id } = useParams();
  var patient = [];
  if (type === "patient") {
    patient = patients;
  }

  if (type === "admin") {
    patient = patients.filter(
      (patient) => patient.id == id
    );
  }

  const [bloodGroup, setBloodGroup] = React.useState(
    `${patient[0].blood_group}`
  );
  const handleChange1 = (event) => {
    setBloodGroup(event.target.value);
  };
  const [maritalStatus, setMaritalStatus] = React.useState(
    `${patient[0].marital_status}`
  );
  const handleChange2 = (event) => {
    setMaritalStatus(event.target.value);
  };

  const [name, setName] = React.useState(
    `${patient[0].name}`
  );
  const [surname, setSurname] = React.useState(
    `${patient[0].surname}`
  );
  const [middleName, setMiddleName] = React.useState(
    `${patient[0].middle_name}`
  );
  const [emergencyContactNumber, setEmergencyContact] =
    React.useState(
      `${patient[0].emergency_contact_number}`
    );
  const [contactNumber, setContactNumber] = React.useState(
    `${patient[0].contact_number}`
  );
  const [iin, setIin] = React.useState(`${patient[0].iin}`);
  const [governmentId, setGovernmentId] = React.useState(
    `${patient[0].government_id}`
  );
  const [dateOfBirth, setDateOfBirth] = React.useState(
    `${patient[0].date_of_birth}`
  );
  const [address, setAddress] = React.useState(
    `${patient[0].address}`
  );
  const [email, setEmail] = React.useState(
    `${patient[0].email}`
  );
  const [optionalDetails, setOptionalDetails] =
    React.useState(`${patient[0].optional_details}`);
  const modifyPatient = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8800/api/myPage/admin/patient/${id}`,
        {
          name,
          surname,
          middle_name: middleName,
          emergency_contact_number: emergencyContactNumber,
          contact_number: contactNumber,
          iin,
          government_id: governmentId,
          date_of_birth: dateOfBirth,
          address,
          email,
          optional_details: optionalDetails,
          blood_group: bloodGroup,
          marital_status: maritalStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deletePatient = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/myPage/admin/user/${patient[0].userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );
      console.log(response);
      alert("Patient deleted successfully");
      window.location.replace = "/personalAdmin";
    } catch (e) {
      console.log(e);
    }
  };
  const [treatments, setTreatments] = React.useState([]);
  React.useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:8800/api/myPage/patient/treatment`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setTreatments(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  const x = treatments.length;
  const [clicked, setClicked] = React.useState(false);
  const resolve = async (id) => {
    try {
      await axios({
        method: "patch",
        url: `http://localhost:8800/api/myPage/patient/treatment/${id}/statusChange`,

        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });
      setTreatments(
        treatments.filter((treatment) => treatment.id != id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const [History, setHistory] = React.useState([]);
  React.useEffect(() => {
    try {
      const res = axios
        .get(
          "http://localhost:8800/api/myPage/patient/treatment/history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        )
        .then((res) => {
          setHistory(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="bg-light vh-100">
      <Header />
      <div
        className={
          type === "admin"
            ? "container rounded bg-white mt-5 mb-5"
            : "container rounded bg-white mt-5 mb-5 d-flex justify-content-center"
        }>
        <div className="row">
          <div
            className={
              type === "admin"
                ? "col-md-3 border-end"
                : "col-md-12"
            }>
            <div className="d-flex flex-column align-items-center text-center p-3 py-4">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}
              />
              <span className="font-weight-bold mt-3">
                {patient[0].name} {patient[0].surname}{" "}
                {patient[0].middle_name}
              </span>
              <span className="text-black-50">
                {patient[0].email}
              </span>
              <span className="text-black-50 ">
                IIN: {iin}
              </span>
              <span className="text-black-50">
                Government ID: {governmentId}
              </span>
              <span className="text-black-50">
                Contact Number: {contactNumber}
              </span>
              <span className="text-black-50 ">
                Emergency Contact Number:{" "}
                {emergencyContactNumber}
              </span>
              <span className="text-black-50">
                Address: {address}
              </span>
              <span className="text-black-50 ">
                Blood Group: {bloodGroup}
              </span>
              <span className="text-black-50 ">
                Marital Status: {maritalStatus}
              </span>
              <span className="text-black-50 ">
                Optional Details: {optionalDetails}
              </span>
            </div>
          </div>
          {type === "admin" && (
            <>
              <div className="col-md-5 border-end">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="text-right">
                      Profile Settings
                    </h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <label className="labels">Name</label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="First Name"
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="labels">
                        Surname
                      </label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="Surname"
                        value={surname}
                        onChange={(e) =>
                          setSurname(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="labels">
                        Middle Name
                      </label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="Middle Name"
                        value={middleName}
                        onChange={(e) =>
                          setMiddleName(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="outlined"
                        label="E-mail"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">IIN</label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="IIN Number"
                        value={iin}
                        onChange={(e) =>
                          setIin(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">
                        Date of Birth
                      </label>
                      <input
                        className="form-control"
                        required
                        type="date"
                        id="outlined-required"
                        value={dateOfBirth}
                        onChange={(e) =>
                          setDateOfBirth(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">
                        Government ID
                      </label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="ID Number"
                        value={governmentId}
                        onChange={(e) =>
                          setGovernmentId(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">
                        Blood Group
                      </label>
                      <TextField
                        className="form-control"
                        id="outlined-select-currency"
                        required
                        select
                        size="small"
                        value={bloodGroup}
                        onChange={handleChange1}>
                        {bloodGroups.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-md-6 mt-1">
                      <label className="labels">
                        MaritalStatus
                      </label>
                      <TextField
                        className="form-control"
                        id="outlined-select-currency"
                        required
                        select
                        value={maritalStatus}
                        onChange={handleChange2}>
                        {maritalStatuses.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-md-6 mt-1">
                      <label className="labels">
                        Address
                      </label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="Address"
                        value={address}
                        onChange={(e) =>
                          setAddress(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">
                        Contact Number
                      </label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="Contact Number"
                        value={contactNumber}
                        onChange={(e) =>
                          setContactNumber(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">
                        Emergency Contact Number
                      </label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="Emergency Contact Number"
                        value={emergencyContactNumber}
                        onChange={(e) =>
                          setEmergencyContact(
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 py-5">
                  <div class="col-md-12">
                    <label class="labels">
                      Optional Details
                    </label>
                    <input
                      className="form-control"
                      id="outlined-multiline-static"
                      label="Optional Details"
                      multiline
                      rows={4}
                      value={optionalDetails}
                      onChange={(e) =>
                        setOptionalDetails(e.target.value)
                      }
                    />
                  </div>
                  <div className="row mt-5 d-flex justify-content-between align-items-center">
                    <Button
                      onClick={modifyPatient}
                      variant="contained"
                      className="col-md-3">
                      Save changes
                    </Button>
                    <Button
                      onClick={deletePatient}
                      variant="contained"
                      className="col-md-4">
                      Delete
                    </Button>
                    <div className="col-md-4">
                      <Link to="/personalAdmin">
                        <Button variant="contained">
                          Go Back
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <h3 className={classes.treat}>My Treatments</h3>
      <div className={classes.card}>
        {treatments.map((treat, index) => (
          <Card
            key={index}
            style={{ width: "18rem" }}
            className={classes.treat}>
            <Card.Body>
              <Card.Title>Treatment {index + 1}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Doctor : {treat.doctor.name}{" "}
                {treat.doctor.surname}
              </Card.Subtitle>
              <Card.Text>{treat.text}</Card.Text>
              <Card.Text>
                Date:{" "}
                {new Date(treat.createdAt).getUTCDate()}
                {"/"}
                {new Date(treat.createdAt).getUTCMonth()}
                {"/"}
                {new Date(treat.createdAt).getUTCFullYear()}
              </Card.Text>
              <Card.Text className={classes.icon}>
                Time:
                {new Date(treat.createdAt).getUTCHours()}
                {":"}
                {padTo2Digits(
                  new Date(treat.createdAt).getMinutes()
                )}{" "}
                <CancelIcon
                  onClick={() => resolve(treat.id)}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <h3 className={classes.treat}>
        My History of Treatments
      </h3>
      <div className={classes.card}>
        {History.map((treat, index) => (
          <Card
            key={index}
            style={{ width: "18rem" }}
            className={classes.treat}>
            <Card.Body>
              <Card.Title>Treatment {index + 1}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Doctor : {treat.doctor.name}{" "}
                {treat.doctor.surname}
              </Card.Subtitle>
              <Card.Text>{treat.text}</Card.Text>
              <Card.Text>
                Date:{" "}
                {new Date(treat.createdAt).getUTCDate()}
                {"/"}
                {new Date(treat.createdAt).getUTCMonth()}
                {"/"}
                {new Date(treat.createdAt).getUTCFullYear()}
              </Card.Text>
              <Card.Text className={classes.icon}>
                Time:
                {new Date(treat.createdAt).getUTCHours()}
                {":"}
                {padTo2Digits(
                  new Date(treat.createdAt).getMinutes()
                )}{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonalPatient;
