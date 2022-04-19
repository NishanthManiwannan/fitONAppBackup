import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  BrowserRouter
} from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StyledEngineProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
