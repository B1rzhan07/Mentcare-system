import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
const Department = () => {
  const { departments } = useSelector(
    (state) => state.department
  );

  const { id } = useParams();
  const department = departments.find(
    (department) => department.id == id
  );

  return (
    <div>
      <Header />
      {department.department_name}
      <div>{department.department_info}</div>
    </div>
  );
};

export default Department;
