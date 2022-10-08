import React, { useEffect, useState } from "react";
import "./style.css";

const MovieRow = ({ title, items }) => {
  const base_image = "https://image.tmdb.org/t/p/w200";

  const [scrollX, setScrollX] = useState(0);

  const range = Math.round(window.innerWidth / 2);
  const itemW = 180;
  const listW = items.results.length * itemW;

  const handleLeft = () => {
    let x = scrollX + range;
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRight = () => {
    let x = scrollX - range;
    const screenW = Math.round(window.innerHeight);
    const limit = screenW - listW;
    console.log(x, screenW, listW, limit);
    if (limit > x) {
      x = limit - 200;
    }
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <div className="movieRow--title">
        <h2>{title}</h2>
        <div className="movieRow--buttons">
          <button onClick={handleLeft}>⟨</button>
          <button onClick={handleRight}> ⟩ </button>
        </div>
      </div>
      <div
        className="movieRow--listarea"
        style={{
          marginLeft: `${scrollX}px`,
          width: `${listW}px`,
        }}
      >
        {items.results.length > 0 &&
          items.results.map((item, key) => (
            <div
              key={key}
              className="movieRow--item"
              style={{ width: `${itemW}px` }}
            >
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
