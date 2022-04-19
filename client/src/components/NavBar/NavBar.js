import React from "react";
import "./style.css";
import {
  ShoppingBag,
  ShoppingCart,
  SupervisorAccount,
  PowerSettingsNew,
  PlaylistAdd,
  Summarize,
} from "@mui/icons-material";
function NavBar() {
  const adminActiveStatus = localStorage.getItem("LoginAdminActive");
  const clientActiveStatus = localStorage.getItem("LoginClientActive");

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        <img src="../img/logo.png" style={{ width: "100px", height: "40px" }} />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse navbar-center"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav">
          {clientActiveStatus === "true" ? (
            <>
              <a class="nav-item nav-link" href="/products">
                <ShoppingBag />
              </a>
              <a class="nav-item nav-link" href="/carts">
                <ShoppingCart />
              </a>
              <a class="nav-item nav-link" href="/client-orders">
                <Summarize />
              </a>
              <a type="submit" class="nav-item nav-link" href="/user">
                <PowerSettingsNew />
              </a>
            </>
          ) : (
            ""
          )}

          {adminActiveStatus === "true" ? (
            <>
              <a class="nav-item nav-link" href="/admin">
                <PlaylistAdd />
              </a>
              <a class="nav-item nav-link" href="/admin-orders">
                <Summarize />
              </a>
              <a type="submit" class="nav-item nav-link" href="/admin-login">
                <PowerSettingsNew />
              </a>
            </>
          ) : (
            ""
          )}

          {adminActiveStatus === "false" && clientActiveStatus === "false" ? (
            <>
              <a class="nav-item nav-link" href="/products">
                <ShoppingBag />
              </a>
              <a class="nav-item nav-link" href="/registration">
                <SupervisorAccount />
              </a>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
