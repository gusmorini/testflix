import React, { useEffect, useState } from "react";
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
