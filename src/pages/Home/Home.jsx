import { useEffect, useState } from "react";
import ErrorFilterPage from "../../components/HomeComponents/InfoMovie/ErrorFilterPage";
import InfoMovie from "../../components/HomeComponents/InfoMovie/InfoMovie";
import MovieRow from "../../components/HomeComponents/MovieRow/MovieRow";
import NavBar from "../../components/HomeComponents/NavBar/NavBar";
import getHomeList, { getMovieInfo } from "../../dataHomeFetch";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../../redux/homeSlice/homeSlice";

const Home = () => {
  const search = useSelector((state) => state.homeData.search);
  const loading = useSelector((state) => state.homeData.loading);
  const error = useSelector((state) => state.homeData.error);
  const dispatch = useDispatch();
  const [homeData, setHomeData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await getHomeList();

        setHomeData(result);

        const random = Math.floor(
          Math.random() * result[0].items.data.results.length
        );
        const randomMovie = result[0].items.data.results[random];
        const chosenInfo = await getMovieInfo(randomMovie.id, "tv");

        setFeaturedData(chosenInfo.data);

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const newData = homeData.filter((item) => {
    const filteredData = [];
    for (let i = 0; i < homeData.length; i++) {
      filteredData.push(item.items.data.results[i].title);
      filteredData.push(item.title);
    }

    return filteredData
      .toString()
      .toLocaleLowerCase()
      .includes(search.toString().toLocaleLowerCase());
  });

  const filterMovie = newData.toString().toLocaleLowerCase();

  return (
    <div className="bg-darknet">
      <NavBar />
      {loading && <Loading />}
      {error && (
        <p className="text-white flex justify-center items-center">{error}</p>
      )}
      {!filterMovie ? (
        <ErrorFilterPage />
      ) : (
        <>
          <InfoMovie featuredData={featuredData} />
          <MovieRow newData={newData} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;