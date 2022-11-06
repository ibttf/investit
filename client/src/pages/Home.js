import React from "react";
import { Link } from "react-router-dom";

import "../styles/Home.css";
const Home = ({ user, setUser }) => {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  if (user) {
    return (
      <div className="home">
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    );
  }

  return <div className="home"></div>;
};

export default Home;
