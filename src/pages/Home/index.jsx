import React, { useState, useEffect } from "react";
import "./style.css";

import MovieRow from "../../components/MovieRow";
import MovieFeature from "../../components/MovieFeature";
import Loader from "../../components/Loader";

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
    getFeatureItem(randomFeatureItem);
  };

  /** get feature */
  const getFeatureItem = async (item) => {
    const data = await getFeature(item);
    setFeature(data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
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
      {list.length <= 0 && <Loader />}
    </div>
  );
};

export default Home;
