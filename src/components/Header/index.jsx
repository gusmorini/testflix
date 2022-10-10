import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  const [headerDark, setHeaderDark] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY >= 100) {
        setHeaderDark(true);
      } else {
        setHeaderDark(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.addEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <header className={headerDark ? "dark" : ""}>
      <div className="header--content container">
        <Link to="/" className="logo">
          testflix
        </Link>
        <div className="header--user">
          <a href="#">user</a>
          <img src="/img/profile1.png" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
