import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grow,
  Grid,
  CardMedia,
  Typography,
} from "@material-ui/core";

function HomeRegistration() {
  return (
    <div style={{ margin: 0 }}>
      <Container maxWidth="lg">
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={12} sm={10}>
              <CardMedia
                component="img"
                height="500"
                image="../img/logo.png"
                alt="logo"
                
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Link to="/user">
                <button type="button" class="btn btn-dark">
                  Click here to register
                </button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

export default HomeRegistration;
