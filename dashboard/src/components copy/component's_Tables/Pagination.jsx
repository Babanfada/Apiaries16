// import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
// import { useThemeContext } from "../../hooks/ThemeContext";

export default function PaginationControlled({ pageDetails }) {
  const { handleChange, numOfPages, pages } = pageDetails;
  // page
  //   const { theme } = useThemeContext();
  //   const isDarkMode = theme === "dark-theme";
  //   const customStyle = {
  //     "& .MuiPaginationItem-root": {
  //       color: isDarkMode ? " #38bdf2" : "default",
  //     },
  //     "& .MuiPaginationItem-ellipsis": {
  //       color: isDarkMode ? " #38bdf2" : "default",
  //     },
  //   };
  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {pages}</Typography> */}
      <Pagination
        showFirstButton
        showLastButton
        // hidePrevButton
        // hideNextButton
        size="small"
        color={"primary"}
        variant="outlined"
        shape="rounded"
        count={numOfPages}
        onChange={handleChange}
        // sx={customStyle}
      />
    </Stack>
  );
}
// PaginationControlled.propTypes = {
//   pageDetails: PropTypes.shape({
//     handleChange: PropTypes.func.isRequired,
//     numOfPages: PropTypes.number.isRequired,
//     page: PropTypes.number.isRequired,
//   }).isRequired,
// };
PaginationControlled.propTypes = {
  pageDetails: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    numOfPages: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
  }).isRequired,
};