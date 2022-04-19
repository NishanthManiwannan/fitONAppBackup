import React, { useState } from "react";
import { Upgrade } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckOutProducts } from "../../redux/action/productsAction";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

function OrderStatusForm({ orderData }) {
  var dispatch = useDispatch();

  //drop down
  const [orderStatus, setOrderStatus] = useState([
    "",
    "Shipping",
    "Waiting for deliver",
    "Delivered",
  ]);

  //update order status
  const [productData, setProductData] = useState({
    productId: orderData._id,
    status: orderData.status,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateCheckOutProducts(productData));

    toast.success("Order status successfully update", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };

  const getDropdownVal = (e) => {
    setProductData({ ...productData, status: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <select
          style={{ cursor: "pointer" }}
          value={productData.status}
          onChange={(e) => getDropdownVal(e)}
        >
          {orderStatus.map((address, key) => (
            <option key={key} value={address}>
              {address}
            </option>
          ))}
        </select>
        <Button
          style={{
            margin: "10px",
            cursor: "pointer",
            color: "white",
            backgroundColor: "black",
          }}
          type="submit"
        >
          <Upgrade />
        </Button>
      </form>
    </>
  );
}

export default OrderStatusForm;
