import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  TextField,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  addCheckOutDetails,
  getAllClientDetails,
} from "../../redux/action/productsAction";
import { useDispatch, useSelector } from "react-redux";
import DeleteCart from "./DeleteCart";
import { toast } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const [validation, setValidation] = useState(false);

  const clientID = localStorage.getItem("LoginClientId");

  const [send, setSend] = useState(false);
  let [text, setText] = useState("");
  let [totalCheckOut, setTotalCheckOut] = useState(0);

  const [checkOutData, setCheckOutData] = useState({
    clientId: "",
    totalPrice: "",
    checkOutProducts: [],
    shippingDetails: [],
    paymentMethod: "",
    status: "Shipping",
  });

  const [shippingData, setShippingData] = useState({
    address: "",
    mailAddress: "",
    contactDetails: "",
  });

  const [products, serProdcucts] = useState([]);

  //get all client data
  useEffect(() => {
    dispatch(getAllClientDetails());
  }, [dispatch]);

  const getAllClientData = useSelector((state) => state.getClientDetails);
  const { clientDetails } = getAllClientData;

  clientDetails.map((clientData) => {
    if (clientData._id === clientID) {
      shippingData.address = clientData.address;
      shippingData.mailAddress = clientData.emailAddress;
      shippingData.contactDetails = clientData.contactNumber;
    }
  });

  let cartDetails = JSON.parse(
    localStorage.getItem("CartDetails" + clientID) || "[]"
  );
  cartDetails.map((data) => {
    text =
      text +
      ("Product Name : " + data.prodectName + " Qty : " + data.qty + "\n");
  });

  //drop down data
  const [paymentMethod, setPaymentMethod] = useState([
    "",
    "Cash on delivery",
    "Card payment",
  ]);

  const getDropdownVal = (e) => {
    setCheckOutData({
      ...checkOutData,
      paymentMethod: e.target.value,
    });
  };

  //save order details
  const handleSend = async (e) => {
    e.preventDefault();

    if (checkOutData.paymentMethod === "") {
      setValidation(true);
    } else {
      checkOutData.clientId = clientID;
      checkOutData.totalPrice = totalCheckOut;
      checkOutData.shippingDetails = [shippingData];
      checkOutData.checkOutProducts.push(cartDetails);

      checkOutData.checkOutProducts.map((data) => {
        data.map((data) => {
          products.push(data)
        });
      });
      var productdata = checkOutData.checkOutProducts;
      toast.success("Order placed successfully", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(addCheckOutDetails(checkOutData));

      text = text + ("\n" + "total Price : " + totalCheckOut);
      localStorage.removeItem("CartDetails" + clientID);

      setSend(true);
      try {
        //(need to formate the text)
        await axios.post(
          `${process.env.REACT_APP_LOCALHOST}/${process.env.REACT_APP_INVOICE_MAIL}`,
          {
            checkOutData,
            products,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeCartQty = (cartId, newQty) => {
    cartDetails.map((data) => {
      if (data.cardId === cartId) {
        let newCartId = (Math.random() + "").split(".")[1];
        data.qty = newQty;
        data.cardId = newCartId;
        data.prize = newQty * data.singleProductPrice;

        cartDetails.push(data);
        localStorage.setItem(
          "CartDetails" + clientID,
          JSON.stringify(cartDetails)
        );

        const deleteItemIndex = cartDetails.findIndex(
          (product) => product.cardId === cartId
        );
        if (deleteItemIndex >= -1) {
          cartDetails.splice(deleteItemIndex, 1);
        }
        localStorage.setItem(
          "CartDetails" + clientID,
          JSON.stringify(cartDetails)
        );
        window.location.reload(false);
      }
    });
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          {cartDetails.length >= 1 ? (
            <>
              <div class="col">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Total qty</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails.map((data) => (
                      <tr>
                        <th key={data.cardId} scope="row">
                          <img
                            style={{ height: "40px", weight: "45px" }}
                            src={data.imgFile}
                          />
                        </th>
                        <td>{data.prodectName}</td>
                        <td hidden>
                          {(totalCheckOut = totalCheckOut + data.prize)}
                        </td>
                        <td>
                          <select
                            value={data.qty}
                            onChange={(e) =>
                              changeCartQty(data.cardId, e.target.value)
                            }
                          >
                            {[...Array(data.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{data.prize}</td>
                        <td style={{ cursor: "pointer" }}>
                          <DeleteCart cartItemID={data.cardId} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="col col-lg-4">
                <div style={{ margin: "10px" }} class="row">
                  <div class="col-8 col-sm-6">Sub total</div>
                  <div class="col-8 col-sm-6">{totalCheckOut} Rs</div>
                </div>

                <form onSubmit={handleSend}>
                  <div style={{ margin: "10px" }} class="row">
                    <input hidden value={text}></input>
                    <div class="col-10 col-sm-10">
                      {cartDetails.length ? (
                        <>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>Shipping Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div style={{ margin: "10px" }}>
                                <TextField
                                  name="discription"
                                  variant="outlined"
                                  label="Address"
                                  fullWidth
                                  size="small"
                                  value={shippingData.address}
                                  onChange={(e) =>
                                    setShippingData({
                                      ...shippingData,
                                      address: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div style={{ margin: "10px" }}>
                                <TextField
                                  name="discription"
                                  variant="outlined"
                                  label="E-mail address"
                                  fullWidth
                                  size="small"
                                  value={shippingData.mailAddress}
                                  onChange={(e) =>
                                    setShippingData({
                                      ...shippingData,
                                      mailAddress: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div style={{ margin: "10px" }}>
                                <TextField
                                  name="discription"
                                  variant="outlined"
                                  label="Contact details"
                                  fullWidth
                                  size="small"
                                  value={shippingData.contactDetails}
                                  onChange={(e) =>
                                    setShippingData({
                                      ...shippingData,
                                      contactDetails: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </AccordionDetails>
                          </Accordion>

                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>Payment method</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div style={{ margin: "10px" }}>
                                <select
                                  id="catagory"
                                  onChange={(e) => getDropdownVal(e)}
                                >
                                  {paymentMethod.map((address, key) => (
                                    <option key={key} value={address}>
                                      {address}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                          {validation ? (
                            <p style={{ color: "red" }}>
                              Payment method not selected
                            </p>
                          ) : (
                            ""
                          )}
                          <div style={{ margin: "10px" }}>
                            <button class="btn btn-dark" type="submit">
                              Place Order
                            </button>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <h4>Cart items are not found</h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
