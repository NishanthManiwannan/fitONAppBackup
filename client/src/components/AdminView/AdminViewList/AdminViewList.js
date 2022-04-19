import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../../../redux/action/productsAction";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Card,
} from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

function AdminViewList({ productData, setCurrentProductId }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={productData.imgFile} />

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {productData.prodectName}
          </Typography>
          <p>Product Amount - {productData.prize} Rs</p>
          {productData.qty === "0" ? (
            <p style={{ color: "red" }}>Out of stocks</p>
          ) : (
            <p>Available qty - {productData.qty}</p>
          )}
        </CardContent>

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setCurrentProductId(productData._id);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            Update
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={() =>
              dispatch(
                deleteProduct(productData._id),
                window.location.reload(false)
              )
            }
          >
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default AdminViewList;
