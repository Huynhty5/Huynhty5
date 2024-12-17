import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import App from "./App";
import { Provider } from "react-redux";
import reduxStore from "./reduxStore";
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "./admin/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
