import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

import { getFeature, getSimilar, getRecommendations } from "../../api/Tmdb";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import MovieTitle from "../../components/MovieTitle";
import MovieInfo from "../../components/MovieInfo";
import MovieGenres from "../../components/MovieGenres";
import MovieList from "../../components/MovieList";

import Loader from "../../components/Loader";

const About = () => {
  const { id, title } = useParams();
  const [item, setItem] = useState({});
  const [itemSimilar, setItemSimilar] = useState([]);
  const [listRecommends, setListRecommends] = useState([]);
  const [background, setBackground] = useState("");
  const [poster, setPoster] = useState("");

  const getList = async (id, title) => {
    const { feature } = await getFeature(id, title);

    const similar = await getSimilar(feature.id, feature.slug);
    const recommendations = await getRecommendations(feature.id, feature.slug);

    setItem(feature);
    setItemSimilar(similar.results);
    setListRecommends(recommendations.results);

    setBackground(
      "https://image.tmdb.org/t/p/original" + feature.backdrop_path
    );
    setPoster("https://image.tmdb.org/t/p/w300" + feature.poster_path);
  };

  useEffect(() => {
    if (id && title) {
      getList(id, title);
    }
  }, []);

  return (
    <div>
      {!itemSimilar.length > 0 && !background && <Loader />}
      <Header />
      <div
        className="about--hero"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div
        className="about container"
        style={{
          transform: `translateY(-${window.innerHeight / 3}px)`,
        }}
      >
        <div className="box">
          <img
            src={poster}
            alt={item.original_name || item.original_title}
            className="poster"
          />
          <div className="content">
            <MovieTitle item={item} />
            <MovieInfo item={item} />
            <p className="overview">{item.overview || "..."}</p>
            <MovieGenres item={item} />
          </div>
        </div>

        <hr />

        <MovieList items={listRecommends} title="recomendados" />
        <MovieList items={itemSimilar} title="similares" />
      </div>

      <Footer />
    </div>
  );
};

export default About;
