import React, { useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import AdminForm from "../AdminForm/AdminForm";
import AdminView from "./AdminView";

function AdminHome() {
  //initialize state varible for get id of product
  const [currentProductId, setCurrentProductId] = useState(null);

  return (
    <div>
      <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={5}>
                <AdminForm
                  setCurrentProductId={setCurrentProductId}
                  currentProductId={currentProductId}
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <AdminView setCurrentProductId={setCurrentProductId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default AdminHome;
