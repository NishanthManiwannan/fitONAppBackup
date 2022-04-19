import React from "react";
import { Link } from "react-router-dom";

function ClientViewList({ productData }) {
  return (
    <>
      {productData != "" ? (
        <div style={{ margin: "80px" }}>
          <div class="row">
            {productData?.map((productData) => (
              <Link
                style={{ "text-decoration": "none", color: "black" }}
                to={`/product/${productData._id}`}
              >
                <div class="col-lg-3 col-md-6" style={{ marginBottom: "20px" }}>
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      class="card-img-top"
                      style={{ height: "250px", objectFit: "contain" }}
                      src={productData.imgFile}
                      alt={productData.prodectName}
                    />

                    <div class="card-body">
                      <h3 class="card-title">{productData.prodectName}</h3>
                      <h4 class="card-text">{productData.prize} Rs</h4>
                      <hr />
                      <p class="card-text">
                        Available Sizes : {productData.sizes + ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ margin: "80px" }}>
          <h5>Product not found </h5>
        </div>
      )}
    </>
  );
}

export default ClientViewList;
