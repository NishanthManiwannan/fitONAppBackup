import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function DeleteCart({ cartItemID }) {
  const clientID = localStorage.getItem("LoginClientId");

  //delete card item
  const deleteCartItem = (e) => {
    e.preventDefault();
    let cartDetails = JSON.parse(
      localStorage.getItem("CartDetails" + clientID) || "[]"
    );
    const deleteItemIndex = cartDetails.findIndex(
      (product) => product.cardId === cartItemID
    );
    if (deleteItemIndex >= -1) {
      cartDetails.splice(deleteItemIndex, 1);
    }
    localStorage.setItem("CartDetails" + clientID, JSON.stringify(cartDetails));
    window.location.reload(false);
  };

  return (
    <div>
      <form onSubmit={deleteCartItem}>
        <Button style={{ color: "black" }} size="small" type="submit">
          <DeleteIcon />
        </Button>
      </form>
    </div>
  );
}

export default DeleteCart;
