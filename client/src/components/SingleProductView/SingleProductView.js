import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../../redux/action/productsAction";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ShoppingCart, Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SingleProductView({ viewid }) {
  //Check Client Status
  const customerId = localStorage.getItem("LoginClientId");
  const viewProductStatus = localStorage.getItem("onlyForViewProducts");

  var [qtyCount, setQtyCount] = useState(1);
  var [qtyOfProduct, setQtyOfProduct] = useState();

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const getProduct = useSelector((state) => state.getProductDetails);
  const { productItem, loading, error } = getProduct;

  const [product, setProduct] = useState(productItem);

  useEffect(() => {
    setProduct(productItem);
    setQtyOfProduct(productItem?.qty);
  }, [productItem]);

  //cart add
  const [cartData, setCartData] = useState({
    cardId: "",
    countInStock: 0,
    prodectName: "",
    imgFile: "",
    prodectId: "",
    prize: "",
    qty: 0,
  });

  const cardHandleSubmit = (e) => {
    e.preventDefault();

    var cartDetails = JSON.parse(
      localStorage.getItem("CartDetails" + customerId) || "[]"
    );

    let cardId = (Math.random() + "").split(".")[1];
    setCartData({
      cardId: cardId,
      prodectName: product?.prodectName,
      countInStock: parseInt(product?.qty),
      singleProductPrice: parseInt(product?.prize),
      imgFile: product?.imgFile,
      prodectId: product?._id,
      prize: qtyCount * product?.prize,
      qty: parseInt(qtyCount),
    });

    cartDetails.push(cartData);

    if (cartData.prodectName === "") {
      console.log("Add Qty");
    } else {
      toast.success("Item added to the cart", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      localStorage.setItem(
        "CartDetails" + customerId,
        JSON.stringify(cartDetails)
      );
      clear();
    }
  };

  const clear = () => {
    setQtyCount(1);
    setCartData({
      customerId: "",
      cardId: "",
      countInStock: 0,
      prodectName: "",
      imgFile: "",
      prodectId: "",
      prize: "",
      qty: 0,
    });
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <form onSubmit={cardHandleSubmit}>
          <Card sx={{ maxWidth: "70%", margin: "auto" }}>
            <div style={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="380"
                image={product?.imgFile}
                alt="green iguana"
              />
            </div>
            <div style={{ display: "flex", width: "100%", height: "200px" }}>
              <CardContent style={{ width: "100%" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product?.prodectName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {product?.discription}
                </Typography>
                <div class="card-body" style={{ display: "flex" }}>
                  {product?.qty === 0 ? (
                    <p style={{ color: "red" }} class="card-text">
                      out of stock
                    </p>
                  ) : (
                    <p class="card-text">
                      Available qty : {product?.qty - qtyCount}
                    </p>
                  )}

                  <hr />
                  <p class="card-text">
                    Available Sizes : {product?.sizes + ""}
                  </p>
                </div>
              </CardContent>

              <CardContent style={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontSize={"20px"}
                >
                  Price : {product?.prize} Rs
                </Typography>
                <div>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        if (qtyCount - 1 >= 1) {
                          setQtyCount((qtyCount = qtyCount - 1));
                        }
                      }}
                    >
                      <Remove style={{ color: "black" }} />
                    </Button>
                    <CardActions>
                      <p>{qtyCount}</p>
                    </CardActions>

                    <Button
                      size="small"
                      onClick={() => {
                        if (qtyCount + 1 <= qtyOfProduct) {
                          setQtyCount((qtyCount = qtyCount + 1));
                        }
                      }}
                    >
                      <Add style={{ color: "black" }} />
                    </Button>
                    {viewProductStatus === "true" ? (
                      <Link to="/user">
                        <Button size="small">
                          <ShoppingCart style={{ color: "black" }} />
                        </Button>
                      </Link>
                    ) : (
                      <>
                        {product?.qty === 0 ? null : (
                          <Button type="submit" size="small">
                            <ShoppingCart style={{ color: "black" }} />
                          </Button>
                        )}
                      </>
                    )}
                  </CardActions>
                </div>
              </CardContent>
            </div>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SingleProductView;
