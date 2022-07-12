import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "../assets/styles/event.css";
import { AdminFooter, AdminHome, CreateEvent, Logs, MenuAdmin, Users } from ".";
import EventSingle from "./Views/Administrator/EventSingle";
import DeleteModal from "../commons/Modals/DeleteModal";

const Event = ({ admin }) => {
  const [darkMode, setDark] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const eventDelete = JSON.parse(localStorage.getItem("eventToDelete"));

  const checkRole = () => {
    if (user.roleId === 1) navigate("/home");
  };

  const handleChange = () => {
    const dark = JSON.parse(localStorage.getItem("darkMode"));
    if (!dark) {
      localStorage.setItem("darkMode", 1);
      setDark("uk-dark");
      return;
    } else {
      localStorage.setItem("darkMode", 0);
      setDark("");
    }
  };

  useEffect(() => {
   
  }, [darkMode]);

  return (
    <>
      <DeleteModal event={eventDelete} user={user} />
      <div
        className={`uk-background-white dark:uk-background-gray-100 dark:uk-text-gray-40 ${darkMode}`}
      >
        <MenuAdmin user={user} />

        <Routes>
          <Route path="/" index element={<AdminHome />} />
          <Route path="create" element={<CreateEvent />} />
          <Route path="update" element={<CreateEvent action={"edit"} />} />
          <Route path="users" element={<Users />} />
          <Route path="logs" element={<Logs />} />
          <Route path="event/:title" element={<EventSingle />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
        <AdminFooter />
      </div>
    </>
  );
};

export default Event;
