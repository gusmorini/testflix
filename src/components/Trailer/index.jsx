import React from "react";
import "./style.css";

const Trailer = ({ item }) => {
  const url = `https://www.youtube.com/results?search_query=${
    item.name || item.title
  }+trailer`;

  console.log("*** ", item);

  return (
    <div className="trailer">
      <a href={url} target="_blank">
        trailer
      </a>
    </div>
  );
};

export default Trailer;
