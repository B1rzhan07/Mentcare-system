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
  var doctor = [];

  if (typeUser == "doctor") {
    doctor = doctors;
  }
  if (typeUser == "admin") {
    doctor = doctors.filter((doctor) => doctor.id == id);
  }

  const [category, setCategory] = React.useState(
    `${doctor[0].category}`
  );
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const { departments } = useSelector(
    (state) => state.department
  );

  const [name, setName] = React.useState(
    `${doctor[0].name}`
  );
  const [surname, setSurname] = React.useState(
    `${doctor[0].surname}`
  );
  const [middleName, setMiddleName] = React.useState(
    `${doctor[0].middle_name}`
  );
  const [contactNumber, setContactNumber] = React.useState(
    `${doctor[0].contact_number}`
  );
  const [iin, setIin] = React.useState(`${doctor[0].iin}`);
  const [governmentId, setGovernmentId] = React.useState(
    `${doctor[0].government_id}`
  );
  const [dateOfBirth, setDateOfBirth] = React.useState(
    `${doctor[0].date_of_birth}`
  );
  const [address, setAddress] = React.useState(
    `${doctor[0].address}`
  );
  const [email, setEmail] = React.useState(
    `${doctor[0].email}`
  );
  const [optionalDetails, setOptionalDetails] =
    React.useState("kabdik mal");
  const [departmentID, setDepartmentID] = React.useState(
    `${doctor[0].departmentId}`
  );
  const [
    specializationDetailsID,
    setSpecializationDepartmentID,
  ] = React.useState(1);
  const [experienceInYear, setExperienceInYear] =
    React.useState(`${doctor[0].experience_in_year}`);
  const [degree, setDegree] = React.useState(
    `${doctor[0].degree}`
  );
  const [rating, setRating] = React.useState(
    `${doctor[0].rating}`
  );
  const [file, setFile] = React.useState(
    `${doctor[0].photo}`
  );

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
      await axios({
        method: "delete",
        url: `http://localhost:8800/api/myPage/admin/user/${doctor[0].userId}`,
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
  console.log(doctor[0].photo);

  return (
    <div>
      <Header />
      <div className={classes.wrapper}>
        <h1>Personal Doctor {doctor[0].name}</h1>
        <div>
          <img
            src={`http://localhost:8800/${doctor[0].photo}`}
            alt="here"
          />
          {type === "admin" && (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}
        </div>
        <div>
          Name: {doctor[0].name}
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
          Surname: {doctor[0].surname}
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
          Middle Name: {doctor[0].middle_name}
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
          email: {doctor[0].email}
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
          iin: {doctor[0].iin}
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
          dateOfBirth: {doctor[0].date_of_birth}
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
          Goverment Id: {doctor[0].government_id}
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
          departmentId: {doctor[0].departmentId}
          {type === "admin" && (
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
              >
            </TextField>
          )}
        </div>
        <div>
          contactNumber: {doctor[0].contact_number}
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
          address: {doctor[0].address}
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
          {doctor[0].specializationDetailsId}
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
          experienceInYear: {doctor[0].experience_in_year}
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
          category: {doctor[0].category}
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
          degree: {doctor[0].degree}
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
          rating: {doctor[0].rating}
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
