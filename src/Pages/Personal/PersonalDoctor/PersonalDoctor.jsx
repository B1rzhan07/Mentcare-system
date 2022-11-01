import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { categories } from "../../../assets/Personal/personal";
import classes from "./PersonalDoctor.module.scss";
import Header from "../../../Components/Header";

const PersonalDoctor = () => {
  const { id } = useParams();
  const { doctors } = useSelector((state) => state.user);
  const typeUser = localStorage.getItem("type");
  console.log(doctors);
  var doctor = [];
  if (typeUser === "doctor") {
    doctor = doctors;
    console.log(doctor);
  }
  if (doctors.length === 0) {
    doctor = doctors;
    console.log(doctor);
  }

  if (doctors.length > 1) {
    doctor = doctors.find((doctor) => doctor.id == id);
    console.log(doctor);
  }

  const [category, setCategory] = React.useState(
    `${doctor.category}`
  );
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [name, setName] = React.useState(`${doctor.name}`);
  const [surname, setSurname] = React.useState(
    `${doctor.surname}`
  );
  const [middleName, setMiddleName] = React.useState(
    `${doctor.middle_name}`
  );
  const [contactNumber, setContactNumber] = React.useState(
    `${doctor.contact_number}`
  );
  const [iin, setIin] = React.useState(`${doctor.iin}`);
  const [governmentId, setGovernmentId] = React.useState(
    `${doctor.government_id}`
  );
  const [dateOfBirth, setDateOfBirth] = React.useState(
    `${doctor.date_of_birth}`
  );
  const [address, setAddress] = React.useState(
    `${doctor.address}`
  );
  const [email, setEmail] = React.useState(
    `${doctor.email}`
  );
  const [optionalDetails, setOptionalDetails] =
    React.useState("kabdik mal");
  const [departmentID, setDepartmentID] = React.useState(
    `${doctor.departmentId}`
  );
  const [
    specializationDetailsID,
    setSpecializationDepartmentID,
  ] = React.useState(1);
  const [experienceInYear, setExperienceInYear] =
    React.useState(`${doctor.experience_in_year}`);
  const [degree, setDegree] = React.useState(
    `${doctor.degree}`
  );
  const [rating, setRating] = React.useState(
    `${doctor.rating}`
  );
  const [file, setFile] = React.useState(`${doctor.photo}`);

  const modifyDoctor = async () => {
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
      await axios({
        method: "patch",
        url: `http://localhost:8800/api/myPage/admin/doctor/${id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const type = localStorage.getItem("type");
  const deleteDoctor = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:8800/api/myPage/admin/doctor/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className={classes.wrapper}>
        <h1>Personal Doctor {doctor.name}</h1>
        <div>
          <img src={doctor.photo} alt="here" />
          {type === "admin" && (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}
        </div>
        <div>
          Name: {doctor.name}
          {type === "admin" && (
            <input
              required
              id="outlined-required"
              label="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
        <div>
          Surname: {doctor.surname}
          {type === "admin" && (
            <input
              required
              id="outlined-required"
              label="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          )}
        </div>
        <div>
          Middle Name: {doctor.middle_name}
          {type === "admin" && (
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
        <div>
          email: {doctor.email}
          {type === "admin" && (
            <input
              id="outlined"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </div>
        <div>
          iin: {doctor.iin}
          {type === "admin" && (
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
          dateOfBirth: {doctor.date_of_birth}
          {type === "admin" && (
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
          govermentId: {doctor.government_id}
          {type === "admin" && (
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
          departmentId: {doctor.departmentId}
          {type === "admin" && (
            <input
              required
              id="outlined-required"
              label="Department ID"
              value={departmentID}
              onChange={(e) =>
                setDepartmentID(e.target.value)
              }
            />
          )}
        </div>
        <div>
          contactNumber: {doctor.contact_number}
          {type === "admin" && (
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
          address: {doctor.address}
          {type === "admin" && (
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
          specializationDetailsId:{" "}
          {doctor.specializationDetailsId}
          {type === "admin" && (
            <input
              required
              id="outlined-required"
              label="Specialization Details ID"
              value={specializationDetailsID}
              onChange={(e) =>
                setSpecializationDepartmentID(
                  e.target.value
                )
              }
            />
          )}
        </div>
        <div>
          experienceInYear: {doctor.experience_in_year}
          {type === "admin" && (
            <input
              required
              id="outlined-required"
              label="Experience in Years"
              value={experienceInYear}
              onChange={(e) =>
                setExperienceInYear(e.target.value)
              }
            />
          )}
        </div>
        <div>
          category: {doctor.category}
          {type === "admin" && (
            <TextField
              id="outlined-select-currency"
              required
              select
              label="Category"
              value={category}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 18 } }}
              helperText="Please select your Category">
              {categories.map((option) => (
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
          degree: {doctor.degree}
          {type === "admin" && (
            <input
              required
              id="outlined-required"
              label="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          )}
        </div>
        <div>
          rating: {doctor.rating}
          {type === "admin" && (
            <input
              required
              id="outlined-required"
              label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          )}
        </div>
        {type === "admin" && (
          <>
            <Button
              onClick={modifyDoctor}
              variant="contained">
              Save changes
            </Button>
            <Button
              onClick={deleteDoctor}
              variant="contained">
              Delete
            </Button>
            <Link to="/personalAdmin">
              <Button variant="contained">Go Back</Button>
            </Link>
          </>
        )}

        {typeUser === "doctor" && (
          <Link to="/">
            <Button variant="contained">Go Back</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PersonalDoctor;
