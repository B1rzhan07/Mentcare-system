import React from "react";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
import Card from "../../Components/Card/Card";

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Main Content will come later...</h1>
      <h1>Wait us:)</h1>
      <div className="flex">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
