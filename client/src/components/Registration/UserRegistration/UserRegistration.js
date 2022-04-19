import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllClientDetails } from "../../../redux/action/productsAction";

function UserRegistration() {
  const classesCss = useStyles();
  const dispatch = useDispatch();
  let navigator = useNavigate();

  //Signin out
  const status = localStorage.getItem("LoginClientActive");

  if (status === "true") {
    localStorage.setItem("LoginClientActive", "false");
    localStorage.setItem("LoginClientId", "");
    localStorage.setItem("onlyForViewProducts", "true");
    window.location.reload(false);
  }

  useEffect(() => {
    dispatch(getAllClientDetails());
  }, [dispatch]);

  const getAllClientData = useSelector((state) => state.getClientDetails);
  const { clientDetails } = getAllClientData;

  let [clientLoginFormData, setClientLoginFormData] = useState({
    email: "",
    password: "",
  });

  //error validations
  let [validationError, setValidationError] = useState({
    loginError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrorValidationData();

    if (
      clientLoginFormData.email === "" ||
      clientLoginFormData.password === ""
    ) {
      setValidationError({
        ...validationError,
        loginError: "Fields can not be empty",
      });
    } else {
      clientDetails.map((clientData) => {

        if (
          clientLoginFormData.email === clientData.emailAddress &&
          clientLoginFormData.password === clientData.password
        ) {
          localStorage.setItem("LoginClientId", clientData._id);
          localStorage.setItem("onlyForViewProducts", "false");

          setTimeout(() => {
            navigator("/products");
            window.location.reload(false);
          }, 500);
        } else {
          setValidationError({
            ...validationError,
            loginError: "incorrect username or password",
          });
        }
      });
    }
  };

  const clearErrorValidationData = () => {
    setValidationError({
      loginError: "",
    });
  };

  return (
    <div>
      <div class="row">
        <div class="col-6" style={{ margin: "auto" }}>
          <form
            className={classesCss.formContainer}
            autoComplete="off"
            onSubmit={handleSubmit}
            noValidate
          >
            <div style={{ margin: "10px", textAlign:"center"}}>
              <h4>Welcome to DressUp</h4>
            </div>
            <div style={{ margin: "10px" }}>
              <p style={{ color: "red" }}>{validationError.loginError}</p>
            </div>
            <div style={{ margin: "10px" }}>
              <TextField
                name="email"
                variant="outlined"
                label="Email address"
                size="small"
                spacing={3}
                fullWidth
                value={clientLoginFormData.email}
                onChange={(e) =>
                  setClientLoginFormData({
                    ...clientLoginFormData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="password"
                variant="outlined"
                label="Enter password"
                size="small"
                type="password"
                spacing={3}
                fullWidth
                value={clientLoginFormData.password}
                onChange={(e) =>
                  setClientLoginFormData({
                    ...clientLoginFormData,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div style={{ margin: "10px" }}>
              <Link to="/user-registration">
                <p>Don't have an account : click here! </p>
              </Link>
            </div>
            <div style={{ margin: "10px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#000000" }}
                size="large"
                type="submit"
                fullWidth
              >
                LogIn
              </Button>
            </div>

            <div style={{ margin: "10px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#ffff", color: "#000" }}
                size="large"
                onClick={""}
                fullWidth
              >
                Clear
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;
