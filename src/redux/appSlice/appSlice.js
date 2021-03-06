import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appData",
  initialState: {
    data: [],
    featuredData: [],
    loading: false,
    error: "",
    search: "",
    isInputActive: false,
    featuredDetails: false,
    isScrolled: false,
    width: window.innerWidth,
    toggle: false,
    like: false,
    disLike: false,
    filter: "all",
    isLinkActive: false,
  },
  reducers: {
    setData: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    },
    setFeaturedData: (state, action) => {
      return {
        ...state,
        featuredData: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
        error: false,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
    setSearch: (state, action) => {
      return {
        ...state,
        search: action.payload,
      };
    },
    setActive: (state, action) => {
      return {
        ...state,
        isInputActive: action.payload,
      };
    },
    setScrolled: (state, action) => {
      return {
        ...state,
        isScrolled: action.payload,
      };
    },
    setFeaturedDetails: (state, action) => {
      return {
        ...state,
        featuredDetails: action.payload,
      };
    },
    setWidth: (state, action) => {
      return {
        ...state,
        width: action.payload,
      };
    },
    setToggle: (state, action) => {
      return {
        ...state,
        toggle: action.payload,
      };
    },
    setLike: (state, action) => {
      return {
        ...state,
        like: action.payload,
      };
    },
    setDisLike: (state, action) => {
      return {
        ...state,
        disLike: action.payload,
      };
    },
    setFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload,
      };
    },
    setIsLinkActive: (state, action) => {
      return {
        ...state,
        isLinkActive: action.payload,
      };
    },
  },
});

export const {
  setData,
  setFeaturedData,
  setLoading,
  setError,
  setSearch,
  setActive,
  setScrolled,
  setFeaturedDetails,
  setWidth,
  setToggle,
  setLike,
  setDisLike,
  setFilter,
  setIsLinkActive,
} = appSlice.actions;
export default appSlice.reducer;
