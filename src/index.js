import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes/IndexRoutes";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <IndexRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


serviceWorkerRegistration.register();
