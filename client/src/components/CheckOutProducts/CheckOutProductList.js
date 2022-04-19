import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCheckOutDetails } from "../../redux/action/productsAction";

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderStatusForm from "./OrderStatusForm";

function CheckOutProductList({ viewid }) {
  const customerId = localStorage.getItem("LoginClientId");

  var dispatch = useDispatch();

  // get all order details
  useEffect(() => {
    dispatch(getCheckOutDetails());
  }, [dispatch]);

  const getOrderDetails = useSelector(
    (state) => state.getCheckOutDetailsReducer
  );
  const { productItem } = getOrderDetails;

  const orderDetailsByCustomer = [];

  productItem.map((orderData) => {
    if (orderData.clientId === customerId) {
      orderDetailsByCustomer.push(orderData);
    }
  });

  return (
    <div>
      <div class="row">
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th scope="col">Ordered Items</th>
                <th scope="col">Customer delivery details</th>
                <th scope="col">Order status</th>
              </tr>
            </thead>
            <tbody>
              {viewid === 1
                ? productItem.map((data) => (
                    <tr>
                      <th key={data._id} scope="row"></th>
                      <td>
                        <Accordion
                          style={
                            data.status === "Delivered"
                              ? { background: "rgb(0, 208, 111)" }
                              : { background: "#FF955550" }
                          }
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              Check here :
                              <span
                                style={
                                  data.status === "Delivered"
                                    ? { color: "white" }
                                    : { color: "red" }
                                }
                              >
                                Total amount - {data.totalPrice} Rs
                              </span>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div style={{ margin: "10px" }}>
                              {data.checkOutProducts.map((data) =>
                                data.map((data) => (
                                  <>
                                    <div class="row">
                                      <div class="col">
                                        <p>Product Name : {data.prodectName}</p>
                                        <p>Price : {data.prize} Rs</p>
                                        <p>qty : {data.qty}</p>
                                        <hr />
                                      </div>
                                      <div class="col">
                                        <img
                                          style={{
                                            width: "120px",
                                            height: "110px",
                                            objectFit: "cover",
                                          }}
                                          src={data.imgFile}
                                        />
                                      </div>
                                    </div>
                                  </>
                                ))
                              )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </td>
                      <td>
                        <Accordion>
                          <AccordionDetails>
                            <div style={{ margin: "10px" }}>
                              {data.shippingDetails.map((data) => (
                                <>
                                  <p>Address : {data.address}</p>
                                  <p>Email address : {data.mailAddress}</p>
                                  <p>Contact details : {data.contactDetails}</p>
                                </>
                              ))}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </td>
                      <td>
                        {viewid === 1 ? (
                          <OrderStatusForm orderData={data} />
                        ) : (
                          data.status
                        )}
                      </td>
                    </tr>
                  ))
                : orderDetailsByCustomer.map((data) => (
                    <tr>
                      <th key={data._id} scope="row"></th>
                      <td>
                        <Accordion
                          style={
                            data.status === "Delivered"
                              ? { background: "rgb(0, 208, 111)" }
                              : { background: "#FF955550" }
                          }
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>
                              Check here :
                              <span
                                style={
                                  data.status === "Delivered"
                                    ? { color: "white" }
                                    : { color: "red" }
                                }
                              >
                                Total amount - {data.totalPrice} Rs
                              </span>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div style={{ margin: "10px" }}>
                              {data.checkOutProducts.map((data) =>
                                data.map((data) => (
                                  <>
                                    <div class="row">
                                      <div class="col">
                                        <p>Product Name : {data.prodectName}</p>
                                        <p>Price : {data.prize} Rs</p>
                                        <p>qty : {data.qty}</p>
                                        <hr />
                                      </div>
                                      <div class="col">
                                        <img
                                          style={{
                                            width: "120px",
                                            height: "110px",
                                            objectFit: "cover",
                                          }}
                                          src={data.imgFile}
                                        />
                                      </div>
                                    </div>
                                  </>
                                ))
                              )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </td>
                      <td>
                        <Accordion>
                          <AccordionDetails>
                            <div style={{ margin: "10px" }}>
                              {data.shippingDetails.map((data) => (
                                <>
                                  <p>Address : {data.address}</p>
                                  <p>Email address : {data.mailAddress}</p>
                                  <p>Contact details : {data.contactDetails}</p>
                                </>
                              ))}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </td>
                      <td>
                        {viewid === 1 ? (
                          <OrderStatusForm orderData={data} />
                        ) : (
                          data.status
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckOutProductList;
