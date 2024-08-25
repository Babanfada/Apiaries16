import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  //   validationError: false,
  fullname: "",
  password: "",
  address: "",
  phone: "",
  gender: "",
  emailNotification: true,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    handelChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    //   console.log({
    //     email: state.email,
    //     fullname: state.fullname,
    //     password: state.password,
    //     address: state.address,
    //     phone: state.phone,
    //     gender: state.gender,
    //     emailNotification: state.emailNotification,
    //   });
    },
    handlePhoneInput: (state, { payload }) => {
      //   console.log({ phone: state.phone });
      return {
        ...state,
        phone: payload,
      };
    },
  },
});

export const { handelChange, handlePhoneInput } = userSlice.actions;
export default userSlice.reducer;
