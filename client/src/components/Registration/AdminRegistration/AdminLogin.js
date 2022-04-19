import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminDetails } from "../../../redux/action/productsAction";

function AdminLogin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigator = useNavigate();

  const status = localStorage.getItem("LoginAdminActive");

  if (status === "true") {
    localStorage.setItem("LoginAdminActive", "false");
    localStorage.setItem("LoginAdminId", "");
    window.location.reload(false);
  }

  const [adminLoginFormData, setAdminLoginFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getAllAdminDetails());
  }, [dispatch]);

  const getAllAdminData = useSelector((state) => state.getAdminDetails);
  const { adminDetails } = getAllAdminData;

  //error validations
  let [validationError, setValidationError] = useState({
    loginError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (adminLoginFormData.email === "" || adminLoginFormData.password === "") {
      setValidationError({
        ...validationError,
        loginError: "Fields can not be empty",
      });
    } else {
      adminDetails.map((adminData) => {
        if (
          adminLoginFormData.email === adminData.emailAddress &&
          adminLoginFormData.password === adminData.password
        ) {
          setTimeout(() => {
            localStorage.setItem("LoginAdminId", adminData._id);
            localStorage.setItem("LoginAdminActive", "true");
            navigator("/admin");
            window.location.reload(false);
          }, 500);
        } else {
          setValidationError({
            ...validationError,
            loginError: "Incorrect username or password",
          });
        }
      });
    }
  };

  return (
    <div>
      <div class="row">
        <div class="col-6" style={{ margin: "auto" }}>
          <form
            className={classes.formContainer}
            autoComplete="off"
            onSubmit={handleSubmit}
            noValidate
          >
            <div style={{ margin: "10px", textAlign: "center" }}>
              <h4>Welcome to DressUp</h4>
            </div>
            <div style={{ margin: "10px" }}>
              <p style={{ color: "red" }}>{validationError.loginError}</p>
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="email"
                type="email"
                variant="outlined"
                label="Email address"
                size="small"
                spacing={3}
                fullWidth
                value={adminLoginFormData.email}
                onChange={(e) =>
                  setAdminLoginFormData({
                    ...adminLoginFormData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="password"
                type="password"
                variant="outlined"
                label="Enter password"
                size="small"
                spacing={3}
                fullWidth
                value={adminLoginFormData.password}
                onChange={(e) =>
                  setAdminLoginFormData({
                    ...adminLoginFormData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div style={{ margin: "10px" }}>
              <Link to="/admin-registration">
                <p>Dont have an account : click here! </p>
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
                Login
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

export default AdminLogin;
