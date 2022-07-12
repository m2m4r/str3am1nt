import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { UserLogIn, Register, ResendToken, NotFound, Demo } from "../components";
import Landing from "../components/Landing";
import PrivateRoutes from "./PrivateRoutes";

const IndexRoutes = () => {
  useEffect(() => {}, []);
  const loggedInUser = localStorage.getItem("user");
  return (
    <>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/demo" element={<Demo/>} />
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resendToken" element={<ResendToken />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<PrivateRoutes />}/>
        <Route />
      </Routes>
    </>
  );
};

export default IndexRoutes;
