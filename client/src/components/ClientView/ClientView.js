import React, { useEffect, useState } from "react";
import ClientViewList from "./ClientViewList/ClientViewList";
import { useDispatch } from "react-redux";
import {
  getProducts,
  getProductBySearch,
} from "../../redux/action/productsAction";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

function ClientView() {
  var dispatch = useDispatch();

  //Check Client Status
  const status = localStorage.getItem("LoginClientActive");
  const viewPermisoion = localStorage.getItem("onlyForViewProducts");

  //Client activation
  if (status === "false" && viewPermisoion === "false") {
    localStorage.setItem("LoginClientActive", "true");
    window.location.reload(false);
  }

  //search object
  const [searchData, setSearchData] = useState({
    value: "",
  });
  const searchStatus = localStorage.getItem("SearchBy");
  const searchedValue = localStorage.getItem("SearchedValue");

  useEffect(() => {
    if (searchStatus === "active") {
      dispatch(getProductBySearch(searchedValue));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch]);

  const getProduct = useSelector((state) => state.getProducts);
  console.log("🚀 ~ file: ClientView.js ~ line 43 ~ ClientView ~ getProduct", getProduct)
  const getProductBySearchitem = useSelector(
    (state) => state.getProductBySearch
  );
  console.log("🚀 ~ file: ClientView.js ~ line 46 ~ ClientView ~ getProductBySearchitem", getProductBySearchitem)

  let products;
  if (searchStatus === "active") {
    const { productItem } = getProductBySearchitem;
    products = productItem;
  } else {
    const { productItem } = getProduct;
    products = productItem;
  }

  //search item handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchData.value === "") {
      toast.error("Product unavailable", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      localStorage.setItem("SearchBy", "noActive");

      setTimeout(() => {
        window.location.reload(false);
      }, 1100);
    } else {
      localStorage.setItem("SearchBy", "active");
      localStorage.setItem("SearchedValue", searchData.value);

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <div class="row" style={{ margin: "auto 20% auto 20%" }}>
              <div class="col col-lg-12">
                <div class="input-group">
                  <div class="form-outline">
                    <input
                      type="search"
                      id="form1"
                      placeholder="Search by product name"
                      style={{ width: "500px", margin: "10px auto" }}
                      class="form-control"
                      value={searchData.value}
                      onChange={(e) =>
                        setSearchData({ ...searchData, value: e.target.value })
                      }
                    />
                  </div>
                  <button
                    style={{ margin: "10px 15px 10px", width: "150px" }}
                    type="submit"
                    class="btn btn-dark"
                  >
                    <SearchIcon />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>

      <ClientViewList productData={products} />
    </div>
  );
}

export default ClientView;
