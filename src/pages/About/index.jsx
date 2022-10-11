import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import { getFeature } from "../../api/Tmdb";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const About = () => {
  const { id, title } = useParams();
  const [item, setItem] = useState({});
  const [background, setBackground] = useState("");
  const [poster, setPoster] = useState("");
  const [genres, setGenres] = useState([]);

  const getList = async (id, title) => {
    const data = await getFeature(id, title);
    console.log("DATA -- ", data);
    setItem(data);
    setBackground("https://image.tmdb.org/t/p/original" + data.backdrop_path);
    setPoster("https://image.tmdb.org/t/p/w300" + data.poster_path);

    let gen = [];
    for (let x in data.genres) {
      gen.push(data.genres[x].name);
    }
    setGenres(gen);
  };

  useEffect(() => {
    if (id && title) {
      getList(id, title);
    }
  }, []);

  return (
    <div>
      <Header />
      <div
        className="about--hero"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      {/* <MovieFeature item={list} /> */}
      <div
        className="about container"
        style={{
          transform: `translateY(-${window.innerHeight / 2}px)`,
        }}
      >
        <img
          src={poster}
          alt={item.original_name || item.original_title}
          className="poster"
        />
        <div className="content">
          <h1 className="title">{item.title || item.name}</h1>
          <h4 className="original">
            {item.original_title || item.original_name}
          </h4>
          <p className="overview">{item.overview || "..."}</p>
          <h4 className="genres">Genero: {genres.join(", ")}</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
