import React, { useState } from "react";

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
    //IF USER IS LOGGED IN
    return <div className="home"></div>;
  }

  return <div className="home"></div>;
};

export default Home;
