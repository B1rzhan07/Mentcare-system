import React from "react";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
const Home = () => {
  const { type, isAuth } = useSelector(
    (state) => state.user
  );

  return (
    <div>
      <Header />
      <h1>Main Content will come later...</h1>
      <h1>Wait us:)</h1>
    </div>
  );
};

export default Home;
