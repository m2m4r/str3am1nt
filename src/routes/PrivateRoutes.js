import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Event } from "../components";
import Landing from "../components/Landing";

const PrivateRoutes = () => {
  const userLogged = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>

      <Route path="/" element={userLogged.roleId === 3 ? <Event admin={true} /> : <Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="administrator/*" element={<Event admin={true} />} />
      <Route path="administrator/events" element={<Event admin={true} />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default PrivateRoutes;
