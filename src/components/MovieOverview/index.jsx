import React from "react";
import "./style.css";

import { limitText } from "../../helpers/index";

const MovieOverview = ({ item }) => {
  const cont = window.innerHeight <= 360 ? 100 : 360;
  return (
    <div className="overview">{limitText(item.overview || "...", cont)}</div>
  );
};

export default MovieOverview;
