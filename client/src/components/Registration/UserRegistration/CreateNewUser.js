import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { addNewClient } from "../../../redux/action/productsAction";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CreateNewUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigator = useNavigate();

  const [clientFormData, setClientFormData] = useState({
    customerName: "",
    address: "",
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

    if (
      clientFormData.customerName === "" ||
      clientFormData.address === "" ||
      clientFormData.contactNumber === "" ||
      clientFormData.emailAddress === "" ||
      clientFormData.password === ""
    ) {
      setValidationError({
        ...validationError,
        emptyFieldError: "Fields are Empty",
        mailValidation: "",
      });
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        clientFormData.emailAddress
      )
    ) {
      setValidationError({
        ...validationError,
        mailValidation: "Invalid mail",
        emptyFieldError: "",
      });
    } else if (clientFormData.password.length < 6) {
      setValidationError({
        ...validationError,
        passwordlength: "Atleast 6 caracter",
        emptyFieldError: "",
        mailValidation: "",
      });
    } else {
      clearValidation();
      dispatch(addNewClient(clientFormData));
      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigator("/user");
        window.location.reload(false);
      }, 1000);
    }
  };

  const clearValidation = () => {
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
            <div style={{ margin: "10px", textAlign:"center"}}>
              <h4>Create your account</h4>
            </div>
            <div style={{ margin: "10px" }}>
              <p style={{ color: "red" }}>{validationError.emptyFieldError}</p>
            </div>
            <div style={{ margin: "10px" }}>
              <TextField
                name="customerName"
                variant="outlined"
                label="Your name"
                size="small"
                spacing={3}
                fullWidth
                value={clientFormData.customerName}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    customerName: e.target.value,
                  })
                }
              />
            </div>

            <div style={{ margin: "10px" }}>
              <TextField
                name="address"
                variant="outlined"
                label="Shipping Address"
                size="small"
                spacing={3}
                fullWidth
                value={clientFormData.address}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    address: e.target.value,
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
                value={clientFormData.emailAddress}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
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
                value={clientFormData.contactNumber}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
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
                value={clientFormData.password}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    password: e.target.value,
                  })
                }
              />
              <div style={{ margin: "10px" }}>
                <p style={{ color: "red" }}>{validationError.passwordlength}</p>
              </div>
            </div>
            <div style={{ margin: "10px" }}>
              <Link to="/user">
                <p>Back lo login </p>
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
                Create user account
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

export default CreateNewUser;
