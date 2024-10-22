import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { useUploadProductImages } from "features/products/productthunk";
import { InputFileUpload } from "components copy";

function Header({ info, children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const { image = "", product_name, price, colorArray, imageArray, id } = info;
  const [color0, color1, color2] = colorArray;
  const [image0, image1, image2] = imageArray;

  // const { uploadProductImgs, isUploadingProductImages } = useUploadProductImages(id);
  // const uploadProductImages = (e) => {
  //   const files = e.target.files;
  //   const formData = new FormData();
  //   if (files.length > 0) {
  //     // Loop through each file and append it to the FormData object
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append(`image${i}`, files[i]); // "images" can be any key name you prefer
  //     }
  //     // Call the function to upload the images
  //     uploadProductImgs(formData);
  //     // console.log(files, formData);
  //   } else {
  //     alert("Please select at least one file to upload.");
  //   }
  // };
  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={image} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {product_name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {price}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid
            // style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   gap: "4px",
            //   border: "1px solid red",
            // }}
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ ml: "auto" }}
          >
            <AppBar position="static">
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color0,
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color1,
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color2,
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            </AppBar>
            <div style={{ display: "flex" }}>
              <MDAvatar src={image1} alt="profile-image" size="md" shadow="sm" />
              <MDAvatar src={image2} alt="profile-image" size="md" shadow="sm" />
              {/* <InputFileUpload
                name={"product images"}
                handleChange={uploadProductImages}
                uploading={isUploadingProductImages}
              /> */}
            </div>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

Header.defaultProps = {
  info: {
    image: "", // Fallback image URL
    product_name: "product Name",
    price: "price",
  },
  children: null,
};

Header.propTypes = {
  info: PropTypes.shape({
    image: PropTypes.string,
    product_name: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.string,
    colorArray: PropTypes.arrayOf(PropTypes.string),
    imageArray: PropTypes.arrayOf(PropTypes.string),
  }),
  children: PropTypes.node,
};
export default Header;
