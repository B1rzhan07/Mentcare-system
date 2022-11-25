import React from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./PersonalPatient.module.scss";
import Header from "../../../Components/Header";
import { bloodGroups } from "../../../assets/Personal/personal";
import { maritalStatuses } from "../../../assets/Personal/personal";

const PersonalPatient = () => {
  const typeUser = localStorage.getItem("type");
  const { patients } = useSelector((state) => state.user);
  const { id } = useParams();
  var patient = [];
  if (typeUser === "patient") {
    patient = patients;
  }

  if (typeUser === "admin") {
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

  return (
    <>
      <Header />

      <div className={classes.wrapper}>
        <h1>
          Personal Information of {patient[0].name}
          {patient[0].surname}
        </h1>
        <div>
          <div>
            Name: {patient[0].name}
            {typeUser === "admin" && (
              <input
                id="outlined-required"
                label="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </div>

          <div>
            Surname: {patient[0].surname || "No data"}
            {typeUser === "admin" && (
              <input
                required
                id="outlined-required"
                label="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            )}
            <div>
              Middle Name: {patient[0].middle_name}
              {typeUser === "admin" && (
                <input
                  required
                  id="outlined-required"
                  label="Middle Name"
                  value={middleName}
                  onChange={(e) =>
                    setMiddleName(e.target.value)
                  }
                />
              )}
            </div>
          </div>
          <div className={classes.blood}>
            Blood Group: {patient[0].blood_group}
            {typeUser === "admin" && (
              <TextField
                id="outlined-select-currency"
                required
                select
                label="Blood Group"
                size="small"
                value={bloodGroup}
                onChange={handleChange1}
                helperText="Please select your Blood Group">
                {bloodGroups.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </div>
          <div>
            iin: {patient[0].iin}
            {typeUser === "admin" && (
              <input
                required
                id="outlined-required"
                label="IIN Number"
                value={iin}
                onChange={(e) => setIin(e.target.value)}
              />
            )}
          </div>
          <div>
            date of birth: {patient[0].date_of_birth}
            {typeUser === "admin" && (
              <input
                required
                type="date"
                id="outlined-required"
                value={dateOfBirth}
                onChange={(e) =>
                  setDateOfBirth(e.target.value)
                }
              />
            )}
          </div>
          <div>
            government id: {patient[0].government_id}
            {typeUser === "admin" && (
              <input
                required
                id="outlined-required"
                label="ID Number"
                value={governmentId}
                onChange={(e) =>
                  setGovernmentId(e.target.value)
                }
              />
            )}
          </div>

          <div>
            Marital Status: {patient[0].marital_status}
            {typeUser === "admin" && (
              <TextField
                id="outlined-select-currency"
                required
                select
                label="Marital Status"
                value={maritalStatus}
                onChange={handleChange2}
                helperText="Please select your Marital Status">
                {maritalStatuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </div>
          <div>
            emergency contact number:{" "}
            {patient[0].emergency_contact_number}
            {typeUser === "admin" && (
              <input
                required
                id="outlined-required"
                label="Emergency Contact Number"
                value={emergencyContactNumber}
                onChange={(e) =>
                  setEmergencyContact(e.target.value)
                }
              />
            )}
          </div>
          <div>
            contact number: {patient[0].contact_number}
            {typeUser === "admin" && (
              <input
                required
                id="outlined-required"
                label="Contact Number"
                value={contactNumber}
                onChange={(e) =>
                  setContactNumber(e.target.value)
                }
              />
            )}
          </div>
          <div>
            email: {patient[0].email}
            {typeUser === "admin" && (
              <input
                id="outlined"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>
          <div>
            address: {patient[0].address}
            {typeUser === "admin" && (
              <input
                required
                id="outlined-required"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}
          </div>
          <div>
            optional details: {patient[0].optional_details}
            {typeUser === "admin" && (
              <input
                id="outlined-multiline-static"
                label="Optional Details"
                multiline
                rows={4}
                value={optionalDetails}
                onChange={(e) =>
                  setOptionalDetails(e.target.value)
                }
              />
            )}
          </div>
        </div>
        {typeUser === "admin" && (
          <div>
            <Button
              variant="contained"
              onClick={modifyPatient}>
              Save Changes
            </Button>
            <Button
              variant="contained"
              onClick={deletePatient}>
              Delete
            </Button>
            <Link to="/personalAdmin">
              <Button variant="contained">Go Back</Button>
            </Link>
          </div>
        )}
        {typeUser === "patient" && (
          <Link to="/">
            <Button variant="contained">Go Back</Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default PersonalPatient;
