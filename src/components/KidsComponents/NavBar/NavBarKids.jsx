import { Search } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToggle, setWidth } from "../../../redux/homeSlice/homeSlice";
import {
  setIsActive,
  setScrolled,
  setSearch,
} from "../../../redux/kidsSlice/kidsSlice";

const NavBarKids = () => {
  const search = useSelector((state) => state.kidsData.search);
  const isInputActive = useSelector((state) => state.kidsData.isInputActive);
  const isHomeScrolled = useSelector((state) => state.kidsData.isHomeScrolled);
  const width = useSelector((state) => state.homeData.width);
  const quantity = useSelector((state) => state.myListData.quantity);
  const dispatch = useDispatch();

  const ref = useRef();

  window.onscroll = () => {
    dispatch(setScrolled(window.pageYOffset === 0 ? false : true));
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isInputActive && ref.current && !ref.current.contains(e.target)) {
        dispatch(setIsActive(false));
      }
    };

    const changeWidth = () => {
      dispatch(setWidth(window.innerWidth));
      if (window.innerWidth >= 1024) {
        dispatch(setToggle(false));
      }
    };
    window.addEventListener("resize", changeWidth);
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
      window.removeEventListener("resize", changeWidth);
    };
  }, [isInputActive, dispatch]);

  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(setSearch(e.target.value));
  };

  return (
    <div
      className={isHomeScrolled ? "navbar scrolledIn" : "navbar scrolledOut"}
    >
      <div className="flex items-center justify-between px-5 md:px-8 xl:px-10">
        <div className="flex items-center ">
          <Link to="/home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
              className="md:w-24"
              width="48"
            />
          </Link>
          {width >= 1024 ? (
            <ul className="flex">
              <li className="mr-5 ml-12 text-sm active">
                <Link to="/home">Home</Link>
              </li>
              <li className="mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out">
                <Link to="/tv-shows">TV Shows</Link>
              </li>
              <li className="mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out">
                <Link to="/movie">Movies</Link>
              </li>
              <li className="mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out">
                <Link to="/latest">New and Popular</Link>
              </li>
              <div className="relative">
                <li className="mr-5 text-sm hover:text-gray-300 transition-all duration-200 ease-in-out">
                  <Link to="/my-list">My List</Link>
                </li>
                {quantity > 0 && (
                  <div className="bg-red-700 rounded-full absolute h-5 w-5 -top-3 right-1 text-sm flex justify-center items-center">
                    <span className="">{quantity}</span>
                  </div>
                )}
              </div>
            </ul>
          ) : (
            <div class="relative inline-block text-center group">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full text-sm font-medium text-gray-100 ml-4 py-2 md:text-2xl"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Browse
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="absolute right-0 -left-14 border-t border-t-gray-100 mt-2 w-56 invisible group-hover:visible transition-all duration-200 ease-in-out"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div
                  className="py-1 bg-darknet text-gray-400 bg-opacity-95 "
                  role="none"
                >
                  <ul className="flex flex-col justify-center items-center text-sm py-3">
                    <li className="hover:text-gray-100 hover:underline">
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="pt-2 hover:text-gray-100 hover:underline">
                      <Link to="/tv-shows">TV Shows</Link>
                    </li>
                    <li className="pt-2 hover:text-gray-100 hover:underline">
                      <Link to="/movie">Movies</Link>
                    </li>
                    <li className="pt-2 hover:text-gray-100 hover:underline">
                      <Link to="/latest">New and Popular</Link>
                    </li>
                    <li className="pt-2 hover:text-gray-100 hover:underline">
                      <Link to="/kids">Kids</Link>
                    </li>
                    <div className="relative">
                      <li className="pt-2 hover:text-gray-100 hover:underline">
                        <Link to="/my-list">My List</Link>
                      </li>
                      {quantity > 0 && (
                        <div className="bg-red-700 rounded-full absolute h-4 w-4 top-1 -right-3 text-sm flex justify-center items-center text-white">
                          <span className="">{quantity}</span>
                        </div>
                      )}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-5 items-center">
          {width >= 768 && (
            <div className="relative" ref={ref}>
              {isInputActive && (
                <input
                  type="search"
                  placeholder="Titles, people, genres"
                  className="inputSearchOpen"
                  autoFocus
                  value={search}
                  onChange={handleFilter}
                />
              )}

              {!isInputActive && (
                <input
                  type="search"
                  placeholder="Titles, people, genres"
                  className="inputSearchClosed"
                />
              )}
              <span
                className="absolute left-0 top-0 bottom-0 flex items-center pl-2"
                onClick={() => dispatch(setIsActive(!isInputActive))}
              >
                <Search style={{ fontSize: "34px" }} />
              </span>
            </div>
          )}

          <div className="relative cursor-pointer group flex">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="profile"
                className="h-10 rounded object-cover"
                width="40"
              />
            </div>
          </div>
          <Link to="/home" className="bg-red-600 text-sm px-8 py-1 rounded">
            Exit Kids
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarKids;
