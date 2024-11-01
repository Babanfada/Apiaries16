import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  product_id: 1,
  user_id: 1,
  rating: 5,
  title: "",
  comment: "",
  //   review_id,
  //   review_images,
};
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    handleChangeReviews: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateReview: (state, { payload }) => {
      const { available } = payload;
      return {
        ...state,
        ...payload,
        isEdit: true,
      };
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
  },
});

export const { handleChangeReviews, handleReset, setUpdateReview, resetValues, changePage } =
  reviewSlice.actions;
export default reviewSlice.reducer;
