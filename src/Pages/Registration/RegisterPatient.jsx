import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./RegisterPatient.module.scss";
import Header from "../../Components/Header";
import { Button } from "@mui/material";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { maritalStatuses } from "../../assets/Personal/personal";
import { bloodGroups } from "../../assets/Personal/personal";

const RegisterPatient = () => {
  const [bloodGroup, setBloodGroup] = React.useState("");
  const handleChange1 = (event) => {
    setBloodGroup(event.target.value);
  };
  const [maritalStatus, setMaritalStatus] =
    React.useState("");
  const handleChange2 = (event) => {
    setMaritalStatus(event.target.value);
  };
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [emergencyContactNumber, setEmergencyContact] =
    React.useState("");
  const [contactNumber, setContactNumber] =
    React.useState("");
  const [iin, setIin] = React.useState("");
  const [governmentId, setGovernmentId] =
    React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [optionalDetails, setOptionalDetails] =
    React.useState("");

  const registerPatient = async () => {
    console.log(
      localStorage.getItem("token"),
      "it is from registerPatient"
    );
    try {
      const response = await axios.post(
        "http://localhost:8800/api/myPage/admin/patient",
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
      setAddress("");
      setEmail("");
      setMaritalStatus("");
      setOptionalDetails("");
      setName("");
      setSurname("");
      setMiddleName("");
      setBloodGroup("");
      setEmergencyContact("");
      setContactNumber("");
      setIin("");
      setGovernmentId("");
      setDateOfBirth("");
      if (response.status === 200) {
        alert("Patient registered successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.main}>
      <Header />
      <div className={classes.mainText}>
        <h1>Registering a Patient</h1>
      </div>
      <div className={classes.secondaryText}>
        <h3>
          Please, enter the following details to register
          the patient:
        </h3>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className={classes.form}>
        <div>
          <p>Personal Information:</p>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            required
            id="outlined-required"
            label="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="IIN Number"
            value={iin}
            onChange={(e) => setIin(e.target.value)}
          />
          <TextField
            required
            type="date"
            id="outlined-required"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="ID Number"
            value={governmentId}
            onChange={(e) =>
              setGovernmentId(e.target.value)
            }
          />
          <TextField
            id="outlined-select-currency"
            required
            select
            label="Blood Group"
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

          <p className={classes.text}>
            Contact Information:
          </p>
          <TextField
            required
            id="outlined-required"
            label="Emergency Contact Number"
            value={emergencyContactNumber}
            onChange={(e) =>
              setEmergencyContact(e.target.value)
            }
          />
          <TextField
            required
            id="outlined-required"
            label="Contact Number"
            value={contactNumber}
            onChange={(e) =>
              setContactNumber(e.target.value)
            }
          />
          <TextField
            id="outlined"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className={classes.text}>
            Additional Information:
          </p>
          <TextField
            id="outlined-multiline-static"
            label="Optional Details"
            multiline
            rows={4}
            value={optionalDetails}
            onChange={(e) =>
              setOptionalDetails(e.target.value)
            }
          />
          <Button
            onClick={registerPatient}
            variant="contained">
            Register
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default RegisterPatient;
