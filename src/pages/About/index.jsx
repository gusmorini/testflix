import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./style.css";

import { getFeature, getSimilar, getRecommendations } from "../../api/Tmdb";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import MovieTitle from "../../components/MovieTitle";
import MovieInfo from "../../components/MovieInfo";
import MovieGenres from "../../components/MovieGenres";
import MovieList from "../../components/MovieList";
import Trailer from "../../components/Trailer";

import Loader from "../../components/Loader";

const About = () => {
  const { id, title } = useParams();
  const [item, setItem] = useState({});
  const [itemSimilar, setItemSimilar] = useState([]);
  const [listRecommends, setListRecommends] = useState([]);
  const [background, setBackground] = useState("");
  const [poster, setPoster] = useState("");

  const [loader, setLoader] = useState(true);

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

    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    setLoader(false);
  };

  useEffect(() => {
    if (id && title) {
      setLoader(true);
      getList(id, title);
    }
  }, [id, title]);

  return (
    <div>
      {loader && <Loader />}
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
            draggable="false"
          />
          <div className="content">
            <MovieTitle item={item} />
            <MovieInfo item={item} />
            <p className="overview">{item.overview || "..."}</p>
            <MovieGenres item={item} />
            <Trailer item={item} />
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
