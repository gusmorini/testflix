import React from "react";
import Routes from "./routes";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default () => {
  return (
    <div className="page">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};
