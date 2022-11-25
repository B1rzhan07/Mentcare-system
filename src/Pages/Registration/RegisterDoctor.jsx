import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./RegisterPatient.module.scss";
import Header from "../../Components/Header";
import { Button } from "@mui/material";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { categories } from "../../assets/Personal/personal";
import { useSelector } from "react-redux";
import AlertSuccess from "../../Components/Alerts/AlertSuccess";
import AlertFailure from "../../Components/Alerts/AlertFailure";
const RegisterDoctor = () => {
  const [alert, setAlert] = React.useState(null);
  const [category, setCategory] = React.useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
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
  const [departmentID, setDepartmentID] =
    React.useState("");
  const [
    specializationDetailsID,
    setSpecializationDepartmentID,
  ] = React.useState("");
  const [experienceInYear, setExperienceInYear] =
    React.useState("");
  const [degree, setDegree] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [file, setFile] = React.useState(null);
  const registerDoctor = async () => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("middle_name", middleName);
    formData.append("contact_number", contactNumber);
    formData.append("iin", iin);
    formData.append("government_id", governmentId);
    formData.append("date_of_birth", dateOfBirth);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("optional_details", optionalDetails);
    formData.append("departmentId", departmentID);
    formData.append("degree", degree);
    formData.append("rating", rating);
    formData.append("experience_in_year", experienceInYear);
    formData.append("category", category);
    formData.append(
      "specialization_details_id",
      specializationDetailsID
    );

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8800/api/myPage/admin/doctor",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });
      setAddress("");
      setEmail("");
      setCategory("");
      setOptionalDetails("");
      setName("");
      setSurname("");
      setMiddleName("");
      setContactNumber("");
      setIin("");
      setGovernmentId("");
      setDateOfBirth("");
      setDepartmentID("");
      setSpecializationDepartmentID("");
      setExperienceInYear("");
      setDegree("");
      setRating("");
      setFile(null);
      setAlert(true);
    } catch (error) {
      console.log(error);
      setAlert(false);
    }
  };
  const { departments } = useSelector(
    (state) => state.department
  );

  return (
    <div className={classes.main}>
      <Header />
      {alert && <AlertSuccess />}
      {alert == false && <AlertFailure />}
      <div className={classes.mainText}>
        <h1>Registering a Doctor</h1>
      </div>
      <div className={classes.secondaryText}>
        <h3>
          Please, enter the following details to register
          the doctor:
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
          Avatar:
          <input
            required
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
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
            id="outlined"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
            select
            id="outlined-required"
            label="Department ID"
            value={departmentID}
            onChange={(e) =>
              setDepartmentID(e.target.value)
            }
            helperText="Please select Department">
            {departments.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.department_name}
              </MenuItem>
            ))}
          </TextField>
          <p className={classes.text}>
            Contact Information:
          </p>
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
            required
            id="outlined-required"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className={classes.text}>
            Qualification Information:
          </p>
          <TextField
            required
            id="outlined-required"
            label="Specialization Details ID"
            value={specializationDetailsID}
            onChange={(e) =>
              setSpecializationDepartmentID(e.target.value)
            }
          />
          <TextField
            required
            id="outlined-required"
            label="Experience in Years"
            value={experienceInYear}
            onChange={(e) =>
              setExperienceInYear(e.target.value)
            }
          />
          <TextField
            id="outlined-select-currency"
            required
            select
            label="Category"
            value={category}
            onChange={handleChange}
            helperText="Please select your Category">
            {categories.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="outlined-required"
            label="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
          <p className={classes.text}>Other Information:</p>
          <TextField
            required
            id="outlined-required"
            label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Button
            onClick={registerDoctor}
            variant="contained">
            Register
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default RegisterDoctor;
