const KEY = import.meta.env.VITE_API_KEY || "89cf7012bc836682d0801fbc799b312b";
const API_BASE = "https://api.themoviedb.org/3";
const options = ["language=pt-BR"];
const ADDONS = `?api_key=${KEY}&${options.join("&")}`;

const getData = async (endpoint, query = []) => {
  return fetch(API_BASE + endpoint + ADDONS + "&" + query.join("&"))
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((err) => err);
};

const getDataGenrers = async () => {
  const { genres } = await getData("/genre/movie/list");
  const promises = genres.map(async (item) => {
    return {
      slug: item.name,
      title: item.name,
      items: await getData("/discover/movie", [`with_genres=${item.id}`]),
    };
  });
  return await Promise.all(promises);
};

export const getSimilar = async (id, type = "movie") => {
  return await getData(`/${type}/${id}/similar`);
};

export const getRecommendations = async (id, type = "movie") => {
  return await getData(`/${type}/${id}/recommendations`);
};

export const getFeature = async (id, title) => {
  let type = "movie";
  let feature = await getData(`/${type}/${id}`);
  if (!feature.original_title || feature.original_title !== title) {
    type = "tv";
    feature = await getData(`/${type}/${id}`);
  }

  feature.slug = type;

  return { feature };
};

export const homeList = async () => {
  const custom = [
    {
      slug: "toprated_tv",
      title: "séries em alta",
      items: await getData("/tv/top_rated"),
    },
    {
      slug: "toprated_movie",
      title: "filmes em alta",
      items: await getData("/movie/top_rated"),
    },
    {
      slug: "series",
      title: "séries",
      items: await getData("/discover/tv"),
    },
    {
      slug: "movies",
      title: "filmes",
      items: await getData("/discover/movie"),
    },
    {
      slug: "trending",
      title: "recomendados para você",
      items: await getData("/trending/all/week"),
    },
  ];

  const genres = await getDataGenrers();

  const result = custom.concat(genres);

  return result;
};
