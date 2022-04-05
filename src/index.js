/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserHistory } from "history";
import {BrowserRouter , Route, Routes, Navigate} from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "views/Login/Login"


import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  
    <BrowserRouter history={hist}>
      <Routes>
        <Route path="/material-dashboard-react" element={<Navigate to="/"/>} />
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/rtl" element={<RTL/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>,
);
