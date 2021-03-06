import { useSelector } from "react-redux";
import ErrorFilterPageCustom from "../../CustomComponents/ErrorFilterPageCustom";

const ErrorFilterTvKidsPage = () => {
  const search = useSelector((state) => state.appData.search);
  return <ErrorFilterPageCustom search={search} />;
};

export default ErrorFilterTvKidsPage;
