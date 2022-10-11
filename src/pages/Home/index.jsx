import React, { useState, useEffect } from "react";
import "./style.css";

import MovieRow from "../../components/MovieRow";
import MovieFeature from "../../components/MovieFeature";
import Loader from "../../components/Loader";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { homeList, getFeature } from "../../api/Tmdb";
import { randomArray } from "../../helpers/index";

const Home = () => {
  const [list, setList] = useState([]);
  const [feature, setFeature] = useState(null);

  /** get all items */
  const getAll = async () => {
    // list
    const list = await homeList();
    setList(list);
    // feature
    const randomFeature = randomArray(list);
    const randomFeatureItem = randomArray(randomFeature.items.results);
    getFeatureItem(
      randomFeatureItem.id,
      randomFeatureItem.original_title || randomFeatureItem.original_name
    );
  };

  /** get feature */
  const getFeatureItem = async (id, title) => {
    const { feature } = await getFeature(id, title);
    setFeature(feature);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <Header />
      {feature && <MovieFeature item={feature} />}
      <section className="page--list container">
        {list.map((item, key) => (
          <MovieRow
            key={key}
            title={item.title}
            items={item.items}
            getFeatureItem={getFeatureItem}
          />
        ))}
      </section>
      {list.length <= 0 && !feature && <Loader />}
      <Footer />
    </div>
  );
};

export default Home;
