import * as React from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-number-input";

// import * as React from "react";
// import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import PropTypes from "prop-types";
// const label = { inputProps: { "aria-label": "Checkbox demo" } };
import Checkbox from "@mui/material/Checkbox";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import MarkEmailReadTwoToneIcon from "@mui/icons-material/MarkEmailReadTwoTone";
import UnsubscribeTwoToneIcon from "@mui/icons-material/UnsubscribeTwoTone";
import VerifiedIcon from "@mui/icons-material/Verified";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";
// import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
// color picker
// import { useState } from "react";
// import { ChromePicker } from "react-color";
import { Popover, Tooltip } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setDefaultSearch,
//   removeColor,
//   setColorsArray,
//   setSearchInput,
//   updatePriceRange,
//   updateRatingRange,
// } from "../features/products/productSlice";
// import AddIcon from "@mui/icons-material/Add";
// import CheckIcon from "@mui/icons-material/Check";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import { useLocation } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
// import { MdCancel, MdColorLens } from "react-icons/md";
// import { FcShipped } from "react-icons/fc";
// import { FaFeatherAlt, FaShippingFast } from "react-icons/fa";
// import styles from "../styles/pages/registeration.module.scss";
// function valuetext(value) {
//   return `${value}°C`;
// }
// const capitalizeFirstLetter = (str) => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

// const inputStyle = {
//   fontSize: "small",
//   fontFamily: '"Quicksand", sans-serif',
// };

export function UserInput({
  name,
  value,
  type,
  handleChange,
  validationError,
  message,
}) {
  return (
    <div>
      <TextField
        error={validationError}
        name={name}
        value={value}
        type={type}
        // defaultValue="Small"
        size="small"
        id="filled-required"
        label={name}
        required
        variant="filled"
        onChange={handleChange}
        helperText={validationError ? message : ""}
      />
    </div>
  );
}

export function PhoneInputs({ type, value, handleChange }) {
  // const { theme } = useThemeContext();
  // const isDarkMode = theme === "dark-theme";
  const customCountryListStyle = {
    // ...inputStyle,
    // outline: `${isDarkMode && "1px solid #38bdf2"}`,
    // borderRadius: `${isDarkMode && "5px"}`,
    // paddingLeft: `${isDarkMode && "5px"}`,
    // outline:"1px solid red"
    // border: "1px solid red",
    // fontSize: "small"
    // fontFamily:"",
  };
  return (
    <PhoneInput
      style={customCountryListStyle}
      // className={styles.phoneinputstyle}
      placeholder="Enter phone number"
      defaultCountry="NG"
      // required
      countryCallingCodeEditable={false}
      international
      onChange={(phone) => {
        handleChange(phone);
      }}
      value={value}
      type={type}
    />
  );
}

export function MultiLineInput({ name, value, type, handleChange }) {
  const id = `input-${name}`;
  // const { theme } = useThemeContext();
  // const isDarkMode = theme === "dark-theme";

  return (
    <TextField
      sx={{
        width: "100%",
        fontFamily: '"Quicksand", sans-serif',
        // outline: `${isDarkMode && "1px solid #38bdf2"}`,
        // borderRadius: `${isDarkMode && "5px"}`,

        "& textarea": {
          // ...inputStyle,
          // color: `${isDarkMode && "white"}`,
        },
        "& label": {
          // ...inputStyle,
          // color: `${isDarkMode && "white"}`,
        },
      }}
      id={id}
      label={name}
      variant="outlined"
      required
      name={name}
      value={value}
      type={type}
      multiline
      rows={4}
      onChange={(e) => handleChange(e)}
    />
  );
}

export function PasswordInput({ name, value, handleChange }) {
  // const location = useLocation();
  // const currentPathname = location.pathname;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const { theme } = useThemeContext();
  // const isDarkMode = theme === "dark-theme";
  const helpertext =
    " Try make it at least 8 characters, including 1 uppercase letter, 1 lowercase letter and 1 digit (0-9). just to make it very secure, you know !!.";
  return (
    <FormControl
      size={"small"}
      // variant="outlined"
      variant="filled"
      // helperText={helpertext}
      sx={{
        width: "100%",
        fontFamily: '"Quicksand", sans-serif',
        // outline: `${
        //   isDarkMode && currentPathname !== "/register" && "1px solid #38bdf2"
        // }`,
        // borderRadius: `${isDarkMode && "5px"}`,
        // "& input": {
        //   fontFamily: '"Quicksand", sans-serif',
        //   color: `${isDarkMode && "white"}`,
        //   outline: `${
        //     isDarkMode && currentPathname === "/register" && "1px solid #38bdf2"
        //   }`,
        //   borderRadius: `${
        //     isDarkMode && currentPathname === "/register" && "5px"
        //   }`,
        // },
        // "& label": {
        //   fontFamily: '"Quicksand", sans-serif',
        //   fontSize: "small",
        //   color: `${isDarkMode && "white"}`,
        // },
      }}
    >
      <InputLabel htmlFor="outlined-adornment-password">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </InputLabel>
      <OutlinedInput
        id={name}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              // sx={{
              //   color: isDarkMode && "#38bdf2",
              // }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        // required
        label={name.charAt(0).toUpperCase() + name.slice(1)}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        required
      />
      {/* {currentPathname === "/register" ? (
        <span
          style={{ fontFamily: '"Quicksand", sans-serif', fontSize: "small" }}
        >
          {helpertext}
        </span>
      ) : (
        ""
      )} */}
    </FormControl>
  );
}

export function GenderInput({ name, value, type, handleChange, gender }) {
  // const { categoryA } = useSelector((store) => store.products);
  // const location = useLocation();
  // const currentPathname = location.pathname;
  // const { theme } = useThemeContext();
  // const isDarkMode = theme === "dark-theme";
  // const categoryAWithoutSpaces = categoryA.replace(/\s+/g, "");
  // const isCategoryRoute =
  //   `/products/${categoryAWithoutSpaces}` === currentPathname ||
  //   currentPathname === `/products/all`;

  return (
    <>
      {/* {!isCategoryRoute && (
        <InputLabel
          sx={{ ...inputStyle, color: `${isDarkMode && "white"}` }}
          id="demo-simple-select-label"
        >
          {capitalizeFirstLetter(name)}
        </InputLabel>
      )} */}

      <Select
        sx={{
          width: "100%",
          // ...inputStyle,
          // outline: `${isDarkMode && "1px solid #38bdf2"}`,
          // borderRadius: `${isDarkMode && "5px"}`,
          // color: `${isDarkMode && "white"}`,
          // background: isDarkMode && "black",
        }}
        size="small"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={name}
        name={name}
        value={value}
        type={type}
        onChange={(e) => handleChange(e)}
        required
      >
        {gender.map((gender, index) => {
          return (
            <MenuItem
              sx={
                {
                  // ...inputStyle,
                  // background: isDarkMode && "black",
                  // color: isDarkMode && "white",
                }
              }
              key={index}
              value={gender}
            >
              {gender}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

export function Subscribe({ name, value, type, handleChange, show }) {
  // const isDarkMode = localStorage.getItem("theme") === "dark-theme";
  // const location = useLocation();
  // const currentPathname = location.pathname;
  const tooltipContent = (
    // <span style={{ ...inputStyle }}>
    //   You can unsubscribe by going to the `update details` section in your
    //   profile
    // </span>
    <span>
      You can unsubscribe by going to the `update details` section in your
      profile
    </span>
  );

  const helpertext = (
    <span>
      Send me hilarious marketing emails. If I don&apos;t giggle, I&apos;ll
      unsubscribe.
      <Tooltip title={tooltipContent} placement="top" arrow>
        <IconButton>
          <BsInfoCircle
            style={{
              fontSize: "small",
              // border: "1px solid red",
              paddingBottom: 2,
            }}
          />
        </IconButton>
      </Tooltip>
    </span>
  );

  return (
    <>
      <Checkbox
        // {...label}
        icon={show ? <HighlightOffIcon /> : <UnsubscribeTwoToneIcon />}
        checkedIcon={show ? <VerifiedIcon /> : <MarkEmailReadTwoToneIcon />}
        name={name}
        value={value}
        type={type}
        onChange={(e) => handleChange(e)}
        sx={{
          padding: 0,
          marginRight: 1,
          // color: `${
          //   isDarkMode && currentPathname !== "/register"
          //     ? "#38bdf2"
          //     : "#38bdf2"
          // }`,
        }}
      />
      {/* {currentPathname === "/register" && name === "emailNotification" ? (
        <span style={{ ...inputStyle }}>{helpertext}</span>
      ) : (
        ""
      )} */}
    </>
  );
}
