import React from "react";
import "./style.css";

const Header = ({ dark = false }) => {
  return (
    <header className={dark ? "dark" : ""}>
      <div className="header--content container">
        <a className="logo" href="/">
          testflix
        </a>
        <div className="header--user">
          <a href="#">user</a>
          <img src="/img/profile1.png" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
