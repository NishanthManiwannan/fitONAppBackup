import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { addNewAdmin } from "../../../redux/action/productsAction";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CreateNewAdmin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigator = useNavigate();

  const [adminFormData, setAdminFormData] = useState({
    adminName: "",
    emailAddress: "",
    contactNumber: "",
    password: "",
  });

  //formvalidation
  let [validationError, setValidationError] = useState({
    emptyFieldError: "",
    mailValidation: "",
    passwordlength: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    clear();

    if (
      adminFormData.adminName === "" ||
      adminFormData.contactNumber === "" ||
      adminFormData.emailAddress === "" ||
      adminFormData.password === ""
    ) {
      setValidationError({
        ...validationError,
        emptyFieldError: "Fields are Empty",
      });
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        adminFormData.emailAddress
      )
    ) {
      setValidationError({
        ...validationError,
        mailValidation: "Invalid mail",
      });
    } else if (adminFormData.password.length < 6) {
      setValidationError({
        ...validationError,
        passwordlength: "Atleast 6 caracter",
      });
    } else {
      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(addNewAdmin(adminFormData));
      setTimeout(() => {
        navigator("/admin-login");
        window.location.reload(false);
      }, 500);
    }
  };

  const clear = () => {
    setValidationError({
      emptyFieldError: "",
      mailValidation: "",
    });
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
              <h4>Create new admin account</h4>
            </div>
            <div style={{ margin: "10px" }}>
              <p style={{ color: "red" }}>{validationError.emptyFieldError}</p>
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="adminName"
                variant="outlined"
                label="Your name"
                size="small"
                spacing={3}
                fullWidth
                value={adminFormData.adminName}
                onChange={(e) =>
                  setAdminFormData({
                    ...adminFormData,
                    adminName: e.target.value,
                  })
                }
              />
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="emailAddress"
                variant="outlined"
                label="Enter Email address"
                size="small"
                spacing={3}
                fullWidth
                value={adminFormData.emailAddress}
                onChange={(e) =>
                  setAdminFormData({
                    ...adminFormData,
                    emailAddress: e.target.value,
                  })
                }
              />
              <div style={{ margin: "10px" }}>
                <p style={{ color: "red" }}>{validationError.mailValidation}</p>
              </div>
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="contactNumber"
                variant="outlined"
                label="Enter Contact number"
                size="small"
                spacing={3}
                fullWidth
                value={adminFormData.contactNumber}
                onChange={(e) =>
                  setAdminFormData({
                    ...adminFormData,
                    contactNumber: e.target.value,
                  })
                }
              />
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="password"
                variant="outlined"
                label="Create password"
                size="small"
                spacing={3}
                fullWidth
                value={adminFormData.password}
                onChange={(e) =>
                  setAdminFormData({
                    ...adminFormData,
                    password: e.target.value,
                  })
                }
              />
              <div style={{ margin: "10px" }}>
                <p style={{ color: "red" }}>{validationError.passwordlength}</p>
              </div>
            </div>
            <div style={{ margin: "10px" }}>
              <Link to="/admin-login">
                <p>Back to login</p>
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
                Create new admin
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

export default CreateNewAdmin;
