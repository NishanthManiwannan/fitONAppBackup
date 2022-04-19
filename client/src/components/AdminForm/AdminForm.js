import React, { useState, useEffect } from "react";
import { Checkbox, TextField, Typography, Button } from "@mui/material";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/action/productsAction";
import { toast } from "react-toastify";

function AdminForm({ setCurrentProductId, currentProductId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    prodectName: "",
    sizes: [],
    catagory: "",
    discription: "",
    prize: "",
    qty: "",
    brand: "",
    imgFile: "",
  });

  const [arraySize, setArraySize] = useState([]);
  const [addCatagory, setCatagory] = useState([
    "",
    "Male Wears",
    "Female Wears",
    "Kids Wears",
    "Sports Wears",
  ]);
  const [sizes, setSizes] = useState(["S", "M", "L", "XL"]);

  const getProductDetails = useSelector((state) => state.getProducts);
  const { productItem } = getProductDetails;

  const productDetail = currentProductId
    ? productItem.find((product) => product._id === currentProductId)
    : null;

  useEffect(() => {
    if (productDetail) {
      setProductData(productDetail);
      setArraySize(productDetail.sizes);
      document.getElementById("catagory").value = productDetail.catagory;
    }
  }, [productDetail]);

  //get check box selected value
  const getCheckedVal = (e) => {
    if (e.target.checked) {
      arraySize.push(e.target.value);
      setArraySize(arraySize);
      setProductData({ ...productData, sizes: arraySize });
    } else {
      let index = arraySize.indexOf(e.target.value);
      if (index > -1) {
        arraySize.splice(index, 1);
      }
      setProductData({ ...productData, sizes: arraySize });
    }
  };

  //get dropdown value
  const getDropdownVal = (e) => {
    setProductData({ ...productData, catagory: e.target.value });
  };

  //form validation
  let [validationError, setValidationError] = useState({
    emptyFieldError: "",
  });

  //Add and update form data
  const handleSubmit = (e) => {
    e.preventDefault();
    clearValidation();
    if (
      productData.prodectName === "" ||
      productData.sizes.length === 0 ||
      productData.catagory === "" ||
      productData.discription === "" ||
      productData.prize === "" ||
      productData.qty === "" ||
      productData.brand === "" ||
      productData.imgFile === ""
    ) {
      setValidationError({
        ...validationError,
        emptyFieldError: "Fields can not be empty",
      });
    } else {
      if (currentProductId) {
        dispatch(updateProduct(currentProductId, productData));
        toast.success("Product updated successfully", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch(addProduct(productData));
        toast.success("Product added successfully", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      clear();
      setTimeout(() => {
        window.location.reload(false);
      }, 200);
    }
  };

  //clear validations
  const clearValidation = () => {
    setValidationError({
      emptyFieldError: "",
    });
  };

  const clear = () => {
    setArraySize([]);
    setProductData({
      prodectName: "",
      sizes: [],
      catagory: "",
      discription: "",
      prize: "",
      qty: "",
      brand: "",
      imgFile: "",
    });

    document.getElementById("catagory").value = null;
    setCurrentProductId(null);
  };

  return (
    <div>
      <form
        className={classes.formContainer}
        autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
      >
        <div style={{ margin: "10px" }}>
          <p style={{ color: "red" }}>{validationError.emptyFieldError}</p>
        </div>

        <Typography variant="h6" align="center">
          {currentProductId ? "Update" : "Add New"} product
        </Typography>

        <div style={{ margin: "10px" }}>
          <TextField
            name="prodectName"
            variant="outlined"
            label="Prodect Name"
            size="small"
            spacing={3}
            fullWidth
            value={productData.prodectName}
            onChange={(e) =>
              setProductData({ ...productData, prodectName: e.target.value })
            }
          />
        </div>

        {currentProductId ? (
          <div style={{ margin: "10px" }}>
            <div className={classes.checkBox}>
              <p>Select Available Sizes :</p>
              {sizes.map((sizes) => (
                <span>
                  {sizes}
                  <Checkbox
                    color="default"
                    value={sizes}
                    size="small"
                    checked={
                      currentProductId ? arraySize.includes(sizes) : null
                    }
                    onChange={(e) => getCheckedVal(e)}
                  />
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ margin: "10px" }}>
            <div className={classes.checkBox}>
              <span>Select Available Sizes : </span>
              {sizes.map((sizes) => (
                <span>
                  {sizes}
                  <Checkbox
                    color="default"
                    value={sizes}
                    size="small"
                    checked={arraySize.includes(sizes)}
                    onChange={(e) => getCheckedVal(e)}
                  />
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ margin: "10px" }}>
          <span>Select Catagory : </span>
          <select id="catagory" onChange={(e) => getDropdownVal(e)}>
            {addCatagory.map((address, key) => (
              <option key={key} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>

        <div style={{ margin: "10px" }}>
          <TextField
            name="discription"
            variant="outlined"
            label="Discription"
            fullWidth
            size="small"
            value={productData.discription}
            onChange={(e) =>
              setProductData({ ...productData, discription: e.target.value })
            }
          />
        </div>

        <div style={{ margin: "10px" }}>
          <TextField
            name="prize"
            type="number"
            variant="outlined"
            label="Prize"
            fullWidth
            size="small"
            value={productData.prize}
            onChange={(e) =>
              setProductData({ ...productData, prize: e.target.value })
            }
          />
        </div>

        <div style={{ margin: "10px" }}>
          <TextField
            name="qty"
            type="number"
            variant="outlined"
            label="Quantity"
            fullWidth
            size="small"
            value={productData.qty}
            onChange={(e) =>
              setProductData({ ...productData, qty: e.target.value })
            }
          />
        </div>

        <div style={{ margin: "10px" }}>
          <TextField
            name="brand"
            variant="outlined"
            label="Brand"
            fullWidth
            size="small"
            value={productData.brand}
            onChange={(e) =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />
        </div>

        <div style={{ margin: "10px" }}>
          <span>Select Image File : </span>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setProductData({ ...productData, imgFile: base64 })
            }
          ></FileBase>
        </div>

        <div style={{ margin: "10px" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#000000" }}
            size="large"
            type="submit"
            fullWidth
          >
            {currentProductId ? "Update Product" : "Add Product"}
          </Button>
        </div>

        <div style={{ margin: "10px" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#ffff", color: "#000" }}
            size="large"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
