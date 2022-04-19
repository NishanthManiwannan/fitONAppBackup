import React from "react";

function Home() {
  
  //setting up default searching optuon
  localStorage.setItem("SearchBy", "All");

  return (
    <>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
              src="../img/img3.jpg"
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
              src="../img/img2.jpg"
              alt="Second slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
              src="../img/img1.jpg"
              alt="Third slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
              src="../img/img4.png"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </>
  );
}

export default Home;
