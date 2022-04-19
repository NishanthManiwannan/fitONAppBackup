import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/action/productsAction";
import { Grid } from "@material-ui/core";
import AdminViewList from "./AdminViewList/AdminViewList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

function AdminView({ setCurrentProductId }) {
  const dispatch = useDispatch();

  //get all products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const getProduct = useSelector((state) => state.getProducts);
  const { productItem } = getProduct;

  //product catagories array
  const catagory = ["Male Wears", "Female Wears", "Kids Wears", "Sports Wears"];

  return (
    <div>
      {catagory.map((catagory) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{catagory}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {productItem.map((productData) =>
              productData.catagory === catagory ? (
                <Grid key={productData._id} item xs={12}>
                  <AdminViewList
                    productData={productData}
                    setCurrentProductId={setCurrentProductId}
                  />
                </Grid>
              ) : (
                ""
              )
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AdminView;
