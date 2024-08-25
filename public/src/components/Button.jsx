import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
const isDarkMode = localStorage.getItem("theme") === "dark-theme";
const  CustomButton = styled(Button)((prop) => ({
  //   type: prop.type || submit,
  // color: `${isDarkMode && currentPathname !== "/register" && "#38bdf2"}`,

  color: `${isDarkMode ? "#38bdf2" : prop.background || "#0063cc"}`,
  width: prop.size || "10vw",
  height: prop.height || "10vh",
  textTransform: "none",
  fontSize: 14,
  fontWeight: "20px",
  padding: "12px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  whiteSpace: "nowrap",
  backgroundColor: prop.background || "#0063cc",
  // borderColor: prop.background || "#0063cc",
  borderColor: `${isDarkMode ? "#38bdf2" : prop.background || "#0063cc"}`,
  fontFamily: [
    "Quicksand",
    "Cabin, Sans-Serif",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: prop.backgroundhover || "#0069d9",
    borderColor: prop.backgroundhover || "#0062cc",
    boxShadow: "none",
    color: "#fff" || prop.colorHover,
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: prop.background,
    borderColor: "#005cbf",
  },
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
  "&:disabled": {
    cursor: "not-allowed",
  },
}));


export {  CustomButton };
