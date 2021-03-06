import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarCustom from "../../components/CustomComponents/NavbarCustom";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import ErrorFilterMoviePage from "../../components/MovieComponents/FeaturedData/ErrorMovieFilterPage";
import NapRow from "../../components/NewAndPoPularComponents/NapRow/NapRow";
import getTopRatedList from "../../newAndPopular";
import { setError, setLoading } from "../../redux/appSlice/appSlice";

const NewAndPopularPage = () => {
  const search = useSelector((state) => state.appData.search);
  const loading = useSelector((state) => state.appData.loading);
  const error = useSelector((state) => state.appData.error);
  const dispatch = useDispatch();

  const [NaPdata, setNaPdata] = useState([]);

  const newFeaturedData = NaPdata.filter((item) => {
    const filteredMovie = [];

    for (let i = 0; i < NaPdata.length; i++) {
      filteredMovie.push(item.items.data.results[i].title);
      filteredMovie.push(item.title);
    }

    return filteredMovie
      .toString()
      .toLowerCase()
      .includes(search.toString().toLowerCase());
  });

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const result = await getTopRatedList();

        setNaPdata(result);

        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const filterMovie = newFeaturedData.toString().toLocaleLowerCase();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-darknet min-h-screen">
          {error && <p>{error}</p>}
          <NavBarCustom active="Nap" />
          {!filterMovie ? (
            <ErrorFilterMoviePage search={search} />
          ) : (
            <>
              <NapRow newFeaturedData={newFeaturedData} />
            </>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default NewAndPopularPage;
