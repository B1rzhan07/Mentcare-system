import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { categories } from "../../../assets/Personal/personal";
import classes from "./PersonalDoctor.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Header from "../../../Components/Header/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Footer from "../../../Components/Footer/Footer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const PersonalDoctor = () => {
  const { id } = useParams();
  const { doctors } = useSelector((state) => state.user);
  const typeUser = localStorage.getItem("type");
  var doctor = [];
  const { patients } = useSelector((state) => state.user);

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
  const { appointments } = useSelector(
    (state) => state.appointment
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [treatment, setTreatment] = React.useState("");
  const sendTreatment = async (id) => {
    try {
      const response = axios.post(
        `http://localhost:8800/api/myPage/doctor/treatment/${id}`,
        {
          text: treatment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );
      setTreatment("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
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
                src={`http://localhost:8800/${doctor[0].photo}`}
              />
              <span className="font-weight-bold mt-3">
                {doctor[0].name} {doctor[0].surname}{" "}
                {doctor[0].middle_name}
              </span>
              <span className="text-black-50">
                {doctor[0].email}
              </span>
              <span className="text-black-50 ">
                IIN: {iin}
              </span>
              <span className="text-black-50">
                Government ID: {governmentId}
              </span>
              <span className="text-black-50">
                DepartmentID: {departmentID}
              </span>
              <span className="text-black-50">
                Contact Number: {contactNumber}
              </span>
              <span className="text-black-50">
                Address: {address}
              </span>
              <span className="text-black-50">
                Specialization ID: {specializationDetailsID}
              </span>
              <span className="text-black-50">
                Experience: {experienceInYear} years
              </span>
              <span className="text-black-50">
                Category: {category}
              </span>
              <span className="text-black-50">
                Degree: {degree}
              </span>
              <span className="text-black-50">
                Rating: {rating}
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
                        Department
                      </label>
                      <TextField
                        className="form-control"
                        required
                        select
                        id="outlined-required"
                        value={departmentID}
                        onChange={(e) =>
                          setDepartmentID(e.target.value)
                        }>
                        {departments.map((option) => (
                          <MenuItem
                            key={option.id}
                            value={option.id}>
                            {option.department_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="col-md-6 mt-1">
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
                    <div className="col-md-4">
                      <label className="labels">
                        Specialization ID
                      </label>
                      <input
                        className="form-control"
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
                    </div>
                    <div className="col-md-4">
                      <label className="labels">
                        Experience
                      </label>
                      <input
                        className="form-control"
                        required
                        id="outlined-required"
                        label="Experience in Years"
                        value={experienceInYear}
                        onChange={(e) =>
                          setExperienceInYear(
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="labels">
                        Category
                      </label>
                      <TextField
                        className="form-control"
                        id="outlined-select-currency"
                        required
                        select
                        value={category}
                        onChange={handleChange}
                        inputProps={{
                          style: { fontSize: 18 },
                        }}>
                        {categories.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 py-5">
                  <div class="col-md-12">
                    <label class="labels">Degree</label>
                    <input
                      class="form-control"
                      required
                      id="outlined-required"
                      label="Degree"
                      value={degree}
                      onChange={(e) =>
                        setDegree(e.target.value)
                      }
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Rating</label>
                    <input
                      class="form-control"
                      required
                      id="outlined-required"
                      label="Rating"
                      value={rating}
                      onChange={(e) =>
                        setRating(e.target.value)
                      }
                    />
                  </div>
                  <div class="col-md-12 mt-3">
                    <label class="labels">Photo</label>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setFile(e.target.files[0])
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="row mt-5 d-flex justify-content-between align-items-center">
                    <Button
                      onClick={modifyDoctor}
                      variant="contained"
                      className="col-md-3">
                      Save changes
                    </Button>
                    <Button
                      onClick={deleteDoctor}
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
      <h3 className={classes.pat}>My patients</h3>
      <TableContainer
        component={Paper}
        className={classes.table}>
        <Table
          sx={{ maxWidth: 900 }}
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Surname</TableCell>
              <TableCell align="right">Treatment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((patient, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}>
                <TableCell component="th" scope="row">
                  {patient.name}
                </TableCell>
                <TableCell align="right">
                  {patient.surname}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={handleOpen}>
                    Send treatment
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        <h3>Treatment:</h3>
                        <TextareaAutosize
                          maxRows={4}
                          aria-label="maximum height"
                          onChange={(e) =>
                            setTreatment(e.target.value)
                          }
                          style={{ width: 350 }}
                        />
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            sendTreatment(
                              patient.patient.id
                            )
                          }>
                          Send
                        </Button>
                      </Typography>
                    </Box>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </div>
  );
};

export default PersonalDoctor;
