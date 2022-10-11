import React from "react";
import "./style.css";

const MovieTitle = ({ item }) => {
  return (
    <div className="title">
      <h1>{item.name || item.title}</h1>
      <h3>{item.original_name || item.original_title}</h3>
    </div>
  );
};

export default MovieTitle;
