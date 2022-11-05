import React from "react";
import Header from "../../Components/Header";
import Card from "../../Components/Card/Card";
import Search from "../../Components/Search/Search";
import classes from "./Home.module.scss";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";
const Home = () => {
  const { departments } = useSelector(
    (state) => state.department
  );
  const photos = [
    "../../img/1.jpg",
    "../../img/2.jpg",
    "../../img/3.jpg",
    "../../img/4.jpg",
    "../../img/5.jpg",
    "../../img/6.jpg",
    "../../img/7.jpg",
    "../../img/8.jpg",
    "../../img/9.jpg",
    "../../img/10.jpg",
    "../../img/11.jpg",
    "../../img/12.jpg",
    "../../img/13.jpg",
    "../../img/14.jpg",
  ];
  return (
    <>
      <Header />
      <div className={classes.input}>
        <Search />
      </div>
      <hr />
      <div className={classes.card}>
        {departments.map((department) => (
          <Card
            key={department.id}
            departmentName={department.department_name}
            photoDepartment={photos[department.id - 1]}
            id={department.id}
          />
        ))}
      </div>
      <hr />
      <Footer />
    </>
  );
};

export default Home;
