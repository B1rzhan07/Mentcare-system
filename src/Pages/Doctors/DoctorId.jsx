import React, { useEffect } from "react";
import classes from "./DoctorId.module.scss";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

const DoctorId = () => {
  const { departments } = useSelector(
    (state) => state.department
  );
  const { doctor } = useSelector(
    (state) => state.department
  );
  const dep = departments.find(
    (department) => department.id == doctor.departmentId
  );
  const department = dep?.department_name;

  return (
    <>
      <Header />
      <section
        className="vh-100"
        style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" className="mb-4 mb-lg-0 h-100">
              <MDBCard
                className="mb-3"
                style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="text-center border-end"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}>
                    <MDBCardImage
                      src={`http://localhost:8800/${doctor.photo}`}
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <MDBTypography tag="h5">
                      {doctor.name} {doctor.surname}
                    </MDBTypography>
                    <MDBCardText>
                      Department: {department}
                    </MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">
                        Personal Information
                      </MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Category
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {doctor.category
                              .charAt(0)
                              .toUpperCase() +
                              doctor.category.slice(1)}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Experience
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {doctor.experience_in_year +
                              " years"}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Rating
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {doctor.rating}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Degree
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {doctor.degree}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography
                        tag="h6"
                        className="mt-4">
                        Services Provided
                      </MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        {doctor.services.map((service) => (
                          <MDBCol size="6" className="mb-3">
                            <MDBCardText className="text-muted border border-secondary rounded p-2">
                              Service Name:{" "}
                              {service.service_name}{" "}
                              <br></br> Price: $
                              {service.price} <br></br>
                              Duration: {
                                service.duration
                              }{" "}
                              minutes
                            </MDBCardText>
                          </MDBCol>
                        ))}
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};

export default DoctorId;
