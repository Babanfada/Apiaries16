import { createSlice } from "@reduxjs/toolkit";
const searchQueryParams = {
  gendersearch: "All",
  isVerified: "All",
  blacklisted: "All",
  subscribed: "All",
  sort: "A-Z",
  pages: 1,
};
const initialState = {
  email: "",
  //   validationError: false,
  fullname: "",
  password: "",
  address: "",
  phone: "",
  gender: "",
  emailNotification: true,
  ...searchQueryParams,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    handelChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
      console.log({
        //     email: state.email,
        //     fullname: state.fullname,
        //     password: state.password,
        //     address: state.address,
        //     phone: state.phone,
        //     gender: state.gender,
        //     emailNotification: state.emailNotification,
        // gendersearch: state.gendersearch,
        // isVerified: state.isVerified,
        // blacklisted: state.blacklisted,
        // subscribed: state.subscribed,
        // sort: state.sort,
      });
    },
    handlePhoneInput: (state, { payload }) => {
      //   console.log({ phone: state.phone });
      return {
        ...state,
        phone: payload,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { handelChange, handlePhoneInput, changePage, resetValues } =
  userSlice.actions;
export default userSlice.reducer;
