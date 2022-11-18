import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";
import { setName } from "../../Redux/Slices/departmentSlice";
const Department = () => {
  const { departments } = useSelector(
    (state) => state.department
  );
  const dispatch = useDispatch();

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

  const clickService = (name) => {
    dispatch(setName(name));
  };

  return (
    <div>
      <Header />
      {department.department_name}
      <div>{department.department_info}</div>
      <h1>Services</h1>
      <div>
        {service.map((service) => (
          <div>
            <Link to={`/services/${service.id}`}>
              {service.service_name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
