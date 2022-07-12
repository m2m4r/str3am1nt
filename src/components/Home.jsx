import React from "react";
import axios from "axios";

import "../assets/styles/wrapper.css";
import "../assets/styles/home.css";
import "../assets/styles/main.css";

import { useEffect } from "react";
import { useState } from "react";

import Count from "../components/Count";

const Home = () => {
  const [eventTitle, setEventTitle] = useState({});

  const userLogged = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userLogged.roleId === 1) {
      axios
        .get(
          `http://localhost:3001/api/event/findEventId/${userLogged.eventId}`
        )
        .then((res) => setEventTitle(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Count eventTitle={eventTitle} />
    </>
  );
};

export default Home;
