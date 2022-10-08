import React from "react";
import "./style.css";

const MovieRow = ({ title, items }) => {
  const base_image = "https://image.tmdb.org/t/p/w200";

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--listarea">
        {items.results.length > 0 &&
          items.results.map((item, key) => (
            <div key={key} className="movieRow--item">
              <img
                src={base_image + item.poster_path}
                alt={item.original_title}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieRow;
