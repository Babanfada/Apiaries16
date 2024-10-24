import * as React from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-number-input";
import PropTypes from "prop-types";
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
import { Box, FilledInput, Popover, Slider, Tooltip, Typography } from "@mui/material";
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
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const inputStyle = {
  fontSize: "small",
  fontFamily: '"Quicksand", sans-serif',
};

export function UserInput({ name, value, type, handleChange, validationError, message }) {
  return (
    <TextField
      error={validationError}
      name={name}
      value={value}
      type={type}
      size="small"
      id={name}
      label={capitalizeFirstLetter(name)}
      required
      variant="filled"
      onChange={handleChange}
      sx={{ ...inputStyle, width: "100%" }}
      helperText={validationError ? message : ""}
    />
  );
}

export function PhoneInputs({ type, value, handleChange }) {
  // const { theme } = useThemeContext();
  // const isDarkMode = theme === "dark-theme";
  const customCountryListStyle = {
    ...inputStyle,
    // outline: `${isDarkMode && "1px solid #38bdf2"}`,
    // borderRadius: `${isDarkMode && "5px"}`,
    // paddingLeft: `${isDarkMode && "5px"}`,
    // outline:"1px solid red"
    // border: "1px solid red",
    fontSize: "small",
    // fontFamily:"",
  };
  return (
    <PhoneInput
      style={customCountryListStyle}
      className={styling.phoneinputstyle}
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
      variant="filled"
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
  const location = useLocation();
  const currentPathname = location.pathname;
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
      variant="filled"
      helperText={helpertext}
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
      <FilledInput
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
      {currentPathname === "/authentication/sign-up" ? (
        <span style={{ fontFamily: '"Quicksand", sans-serif', fontSize: "small" }}>
          {helpertext}
        </span>
      ) : (
        ""
      )}
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
      <InputLabel
        sx={{
          ...inputStyle,
          //  color: `${isDarkMode && "white"}`
        }}
        id={name}
      >
        {capitalizeFirstLetter(name)}
      </InputLabel>

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
        labelId={name}
        id="demo-simple-select"
        // label={name}
        name={name}
        value={value}
        type={type}
        onChange={(e) => handleChange(e)}
        required
        variant="filled"
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
    <span style={{ ...inputStyle }}>
      You can unsubscribe by going to the `update details` section in your profile
    </span>
    // <span>You can unsubscribe by going to the `update details` section in your profile</span>
  );

  const helpertext = (
    <span>
      Send me hilarious emails.
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

      <span style={{ ...inputStyle }}>{helpertext}</span>
    </>
  );
}

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../layouts/styles/thead.module.scss";
import styling from "../layouts/styles/createupdate.module.scss";
export function DateRegister({ name, value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange({ target: { name, value: date } });
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid grey",
        backgroundColor: "#f5f5f5",
      }}
    >
      <InputLabel sx={{ ...inputStyle, marginBottom: "2px", padding: "2px" }} htmlFor={name}>
        {capitalizeFirstLetter(name) || "Select Date"}
      </InputLabel>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showIcon
        toggleCalendarOnIconClick
        isClearable={false}
        placeholderText={moment(new Date()).format("YYYY-MM-DD")}
        closeOnScroll={true}
        dateFormat="yyyy-MM-dd"
        className={styles.datepicker}
        style={{ width: "100%" }}
      >
        {" "}
        <div style={{ color: "red" }}>Select the correct {name}!</div>
      </DatePicker>
    </Box>
  );
}

// import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Loader1 } from "./Loader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { updateSalaryRange } from "../features/employees/employeesSlice";
import { updatePriceRange } from "../features/apiarySetup/setupCompSlice";
import { updatePriceRangeConsultation } from "../features/consultation/consultationSlice";
import { updatePriceRangePolServ } from "../features/pollination/polservicesSlice";
import { updatePriceRangeProvision } from "../features/supplyProvision/supplyProvSlice";
import moment from "moment";
import { CustomButton } from "./Button";
import { useLocation } from "react-router-dom";
import { updatePriceRangeProduct } from "features/products/productsSlice";
import { MdColorLens } from "react-icons/md";
// import LoadingButton from "@mui/lab/LoadingButton";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function InputFileUpload({ name, handleChange, uploading }) {
  return (
    // <Button
    //   component="label"
    //   role={undefined}
    //   variant="contained"
    //   tabIndex={-1}
    //   startIcon={uploading === "pending" ? <Loader1 /> : <CloudUploadIcon />}
    //   sx={{}}
    // >
    //   {/* Upload files */}
    //   <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
    // </Button>

    <CustomButton
      background={"inherit"}
      backgroundhover={"grey"}
      height={"4vh"}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      size={"small"}
      title={`upload ${name}`}
      startIcon={uploading === "pending" ? <Loader1 /> : <CloudUploadIcon />}
    >
      {uploading === "pending" ? `uploading ${name}` : `upload ${name}`}
      <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
    </CustomButton>
  );
}

function valuetext(value) {
  return `${value}°N`;
}
export default function RangeSlider({ name, value, min, max, step }) {
  // console.log({ name, value, min, max, step });
  // const [value, setValue] = React.useState([20, 37]);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    // Ensure the lower range (newValue[0]) remains static
    console.log(event.target.name);
    const updatedValue = [min, newValue[1]];
    if (event.target.name === "priceRange") {
      dispatch(updatePriceRange(updatedValue));
      return;
    }
    if (event.target.name === "priceRangeC") {
      dispatch(updatePriceRangeConsultation(updatedValue));
      return;
    }
    if (event.target.name === "priceRangeP") {
      dispatch(updatePriceRangePolServ(updatedValue));
      return;
    }
    if (event.target.name === "priceRangeSP") {
      dispatch(updatePriceRangeProvision(updatedValue));
      return;
    }
    if (event.target.name === "priceRangePP") {
      dispatch(updatePriceRangeProduct(updatedValue));
      return;
    }
    // Dispatch the updated value with a static lower range
    dispatch(updateSalaryRange(updatedValue));
  };
  return (
    <Box>
      <Typography sx={{ ...inputStyle }} id={name} gutterBottom>
        {name}
      </Typography>
      <Slider
        aria-labelledby={name}
        name={name}
        label={name}
        getAriaLabel={() => `${name}`}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        step={step}
        size="small"
      />
    </Box>
  );
}
import AddIcon from "@mui/icons-material/Add";
import { ChromePicker } from "react-color";
import { useSelector } from "react-redux";
import { setColorsArray } from "features/products/productsSlice";
import { removeColor } from "features/products/productsSlice";
import { updateProductColors } from "features/products/productthunk";
export const ColorPicker = ({ color_id }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState("#FFFFFF");
  const { colors } = useSelector((store) => store.products);
  const { updateColor, isUpdatingColor } = updateProductColors(color_id);
  const handleColorChange = (newColor) => {
    // setColor(newColor.name);
    setColor(newColor.hex);
  };

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleColorPickerChange = (event) => {
  //   setColor(event.target.value);
  // };

  const handleAddColor = () => {
    dispatch(setColorsArray(color));
  };
  const handleRemoveColor = (c) => {
    dispatch(removeColor(c));
  };
  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      <label style={{ fontSize: "small" }} htmlFor="label">
        Choose Color
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
        id="label"
      >
        <MdColorLens style={{ cursor: "pointer" }} onClick={handleButtonClick} />
        <AddIcon sx={{ cursor: "pointer" }} onClick={handleAddColor} />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {colors.map((c, index) => (
          <div
            key={index}
            title={"Click to remove color"}
            onClick={() => handleRemoveColor(index)}
            style={{
              cursor: "pointer",
              width: "30px",
              height: "30px",
              backgroundColor: c,
              marginRight: "5px",
              borderRadius: "50%",
              border: "1px solid grey",
            }}
          ></div>
        ))}
      </div>
      <CustomButton
        background={"inherit"}
        backgroundhover={"grey"}
        height={"4vh"}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        size={"small"}
        title={`upload colors`}
        startIcon={isUpdatingColor === "pending" ? <Loader1 /> : <CloudUploadIcon />}
        onClick={() => updateColor(colors)}
      >
        {isUpdatingColor === "pending" ? `updating colors` : `update colors`}
      </CustomButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <ChromePicker color={color} onChange={handleColorChange} />
      </Popover>
    </div>
  );
};
// User Input Component
UserInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  validationError: PropTypes.bool,
  message: PropTypes.string,
};
// Color picker
ColorPicker.propTypes = {
  color_id: PropTypes.string,
};
// Phone Input Component
PhoneInputs.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

// MultiLine Input Component
MultiLineInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

// Password Input Component
PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

// Gender Input Component
GenderInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  gender: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Subscribe Component
Subscribe.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

// Date Register Component
DateRegister.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};
InputFileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  uploading: PropTypes.oneOf(["pending", "success", "error"]),
};
RangeSlider.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired, // Assuming value is an array for the range
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};
