import Lottie from "lottie-react";
import React from "react";
import todoanime from "./animation/todo.json";
const Header = () => {
  return (
    <header>
      <div className="lottie">
        <Lottie
          loop={true}
          style={{ height: "100px", width: "150px" }}
          animationData={todoanime}
        />
      </div>
      <h1 className="header"> قـائمـة المهـام</h1>
    </header>
  );
};

export default Header;
