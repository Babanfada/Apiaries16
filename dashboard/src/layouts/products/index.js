import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
// import employeesTableData from "layouts/tables/data/employeesTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
// import { useSingleEmployee } from "features/employees/employeesThunk";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Email } from "@mui/icons-material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Header from "./profile/components/Header";
import PlatformSettings from "./profile/components/PlatformSettings";
import { useDispatch, useSelector } from "react-redux";
// import { useUploadEmployeeImages } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import PaginationControlled from "components copy/component's_Tables/Pagination";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
// import { changePage } from "features/pollination/polservicesSlice";
// import { resetValues } from "features/pollination/polservicesSlice";
// import { usePolServiceInputs } from "hooks/ServicesDetails";
// import { useUpdatePolServices } from "features/pollination/polservicesThunk";
// import { useCreatePolServices } from "features/pollination/polservicesThunk";
// import { PolServSearchModal } from "components copy";
// import pollinationTableData from "./data/productsTableData";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import productsTableData from "./data/productsTableData";
import { changePage } from "features/products/productsSlice";
import { resetValues } from "features/products/productsSlice";
import { useProductsInputs } from "hooks/DashDetails";
import ProductSearchModal from "components copy/searchModals/ProductSearchModal";
import { useUpdateProduct } from "features/products/productthunk";
import { useCreateProduct } from "features/products/productthunk";
import { useSinglProduct } from "features/products/productthunk";
function Products() {
  const dispatch = useDispatch();
  const {
    rows,
    numOfPages,
    refetch,
    count,
    columns,
    totalProducts,
    totalQuantity,
    isGettingAllProducts,
  } = productsTableData();
  const {
    sort,
    pages,
    product_id,
    product_name,
    product_type,
    quantity,
    unit,
    price,
    total_in_stock,
    averageRating,
    description,
    harvest_year,
    packaging_type,
    numOfReviews,
    numOfTimesSold,
    priceRangePP,
  } = useSelector((store) => store.products);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    product_id,
    product_name,
    product_type,
    quantity,
    unit,
    price,
    total_in_stock,
    averageRating,
    description,
    harvest_year,
    packaging_type,
    numOfReviews,
    numOfTimesSold,
    sort,
    priceRangePP,
  ]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography className={styles.wrapper} variant="h6" color="white">
                  <MDBox className={styles.inner}>
                    <MDTypography color="white">Products</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalProducts}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to={`/createupdateproduct/add`}>
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add a new product"
                      />
                    </Link>
                    <ProductSearchModal isGettingAllProducts={isGettingAllProducts} />
                  </MDBox>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
            <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Products;

export const CreateUpdateProduct = () => {
  const { id } = useParams();
  const { productDetails } = useProductsInputs();
  const { isUpdatingProduct, updateProduct } = useUpdateProduct();
  const { createProduct, isCreatingProduct } = useCreateProduct();
  const {
    isEdit,
    product_name,
    product_type,
    quantity,
    unit,
    price,
    total_in_stock,
    description,
    harvest_year,
    packaging_type,
    // product_id,
    // available,
    // averageRating,
    // product_images,
    // numOfReviews,
    // numOfTimesSold,
    // product_colors,
  } = useSelector((store) => store.products);
  const productdetails = {
    product_name,
    product_type,
    quantity,
    unit,
    price,
    total_in_stock,
    description,
    harvest_year,
    packaging_type,
    // available,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.entries(productdetails).every(
      ([key, value]) =>
        key === "harvest_year" || (value !== undefined && value !== null && value !== "")
    );

    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }

    if (isEdit) {
      return updateProduct({ productdetails, id });
    }

    createProduct(productdetails);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox mb={2} /> */}
      {/* <Header info={{ image, first_name, last_name, role }}> */}
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          {/* <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
          <div>
            <div>
              <Link to="/products">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update product ${product_name} details` : "Create a new product"} </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {productDetails
                .filter((detail) => detail.name !== "sort" && detail.name !== "priceRangePP")
                .map((detail) => {
                  const { name, TextField } = detail;
                  return <div key={name}>{TextField}</div>;
                })}
              <CustomButton
                background={"inherit"}
                backgroundhover={"grey"}
                size={"100%"}
                height={"3vh"}
                type="submit"
                // disabled={!isValid}
              >
                {isCreatingProduct === "pending" || isUpdatingProduct === "pending" ? (
                  <Loader1 />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </CustomButton>
            </form>
          </div>
          {/* <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid> */}
        </Grid>
      </MDBox>
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
};

export function SingleProduct() {
  const { id } = useParams();
  const { isGettingSingleProduct, singleproduct, refetch } = useSinglProduct(id);
  const { product } = singleproduct || {};
  // console.log(product);
  const {
    product_id,
    product_name,
    product_type,
    description,
    quantity,
    unit,
    price,
    total_in_stock,
    harvest_year,
    packaging_type,
    averageRating,
    numOfReviews,
    numOfTimesSold,
    product_images,
    product_colors,
  } = product ?? {};
  const { image0, image1, image2 } = product_images?.[0] || {};
  const { color0, color1, color2 } = product_colors?.[0] || {};
  const colorArray = [color0, color1, color2];
  const imageArray = [image0, image1, image2];
  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image: image0, product_name, price, colorArray, imageArray }}>
        <MDBox mt={5} mb={3}>
          <Link to="/products">
            {" "}
            <ArrowBackIcon />
          </Link>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  product_id,
                  product_name,
                  product_type,
                  quantity,
                  unit,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  price,
                  total_in_stock,
                  harvest_year,
                  packaging_type,
                  averageRating,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  numOfReviews,
                  numOfTimesSold,
                  description,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}
