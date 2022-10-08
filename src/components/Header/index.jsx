import React from "react";
import "./style.css";

const Header = ({ dark = false }) => {
  return (
    <header className={dark ? "dark" : ""}>
      <div className="header--content container">
        <h1>testflix</h1>
        <div className="header--user">
          <h2>user</h2>
          <img src="/img/user.png" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
