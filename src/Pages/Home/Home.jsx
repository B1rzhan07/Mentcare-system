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
    "../../img/1.png",
    "../../img/2.png",
    "../../img/3.png",
    "../../img/4.png",
    "../../img/5.png",
    "../../img/6.png",
    "../../img/7.png",
    "../../img/8.png",
    "../../img/9.png",
    "../../img/10.png",
    "../../img/11.png",
    "../../img/12.png",
    "../../img/13.png",
    "../../img/14.png",
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
