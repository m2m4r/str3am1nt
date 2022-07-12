import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { TailSpin } from "react-loader-spinner";
import Axios from "../config/axios";
import moment from "moment-timezone";
import Web3 from "web3";
import * as Yup from "yup";
import * as bcrypt from "bcryptjs";
import "../assets/styles/login.css";
import "../assets/styles/form.css";

const firebaseConfig = {
  apiKey: "AIzaSyChblLN2L_1vL75QXQlBdzlnjmFreuDVVA",
  authDomain: "tonic3-6cbc8.firebaseapp.com",
  databaseURL: "https://tonic3-6cbc8-default-rtdb.firebaseio.com",
  projectId: "tonic3-6cbc8",
  storageBucket: "tonic3-6cbc8.appspot.com",
  messagingSenderId: "291368280511",
  appId: "1:291368280511:web:f270480e6a0a918f2b810a",
  measurementId: "G-KNVRT9JCE5",
};

const app = initializeApp(firebaseConfig);

const UserLogIn = () => {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [darkMode, setDark] = useState();
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [metamaskUser, setMetamaskUser] = useState();
  const [hideButton, setHideButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [hideLogIn, setHideLogIn] = useState(false);
  const [showSpinnerMetamask, setShowSpinnerMetamask] = useState(false);
  const [hideLogInMetasmask, setHideLogInMetamask] = useState(false);
  localStorage.setItem("delete", false);

  const checkLogged = () => {
    const userLogged = JSON.parse(localStorage.getItem("user"));
    if (userLogged) {
      navigate("/");
    }
  };

  const handleChange = () => {
    const dark = JSON.parse(localStorage.getItem("darkMode"));
    if (!dark) {
      localStorage.setItem("darkMode", 1);
      setDark("uk-dark");
    } else {
      localStorage.setItem("darkMode", 0);
      setDark("");
    }
  };

  const getToken = (e) => {
    setToken(e.target.value);
  };

  const findToken = async (e) => {
    try {
      e.preventDefault();

      setHideLogInMetamask(true);
      setShowSpinnerMetamask(true);

      const foundAddress = await Axios.get(`/event/findToken/${token}`);

      if (foundAddress.data) {
        const securePassword = await bcrypt.hash(token, metamaskUser.salt);

        const logged = await Axios.post("user/login", {
          email: metamaskUser.email,
          password: securePassword,
        });

        const auth = await getAuth();

        const credential = await signInWithCustomToken(
          auth,
          logged.data.customToken
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: metamaskUser.name,
            email: metamaskUser.email,
            roleId: metamaskUser.roleId,
            id: metamaskUser.id,
            eventId: metamaskUser.eventId,
            credential: credential.user,
          })
        );

        const geolocalization = await Axios.get("/geoip");

        if (logged.data.eventId !== null) {
          const event = await Axios.get(
            `/event/findEventId/${logged.data.eventId}`
          );

          const dates = moment
            .utc(event.data[0].initialDate)
            .tz(geolocalization.data.timezone);
          const parsedDate = Date.parse(dates);

          localStorage.setItem(
            "event",
            JSON.stringify({
              title: event.data[0].title,
              dates: event.data[0].initialDate,
              url: event.data[0].url,
              initialDate: parsedDate,
            })
          );
          checkLogged();
        }
      } else {
        setShowText2(true);
        setHideLogInMetamask(false);
        setShowSpinnerMetamask(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resendToken = () => {
    navigate("/resendToken");
  };

  useEffect(() => {
    if (showText3 === true) {
      setHideLogIn(false);
      setShowSpinner(false);
    }
  }, [showText3]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^[0-9A-Za-z:/.*%$@!&()¿?]+$/,
          "Characters =, ', -, are not allowed."
        )
        .min(8, "Min. 8 characters")
        .max(12, "Max. 12 characters"),
    }),
    onSubmit: async (data) => {
      try {
        //onSubmit sin mensaje de error previo
        setShowSpinner(true);
        setHideLogIn(true);
        setShowText(false);

        //onSubmit con mensaje de error previo
        if (showText3) {
          setShowText3(false);
          setShowSpinner(true);
          setHideLogIn(true);
          setShowText(false);
        }

        const dataFind = await Axios.post("/user/me", { email: data.email });

        const securePassword = await bcrypt.hash(
          data.password,
          dataFind.data.salt
        );

        const logged = await Axios.post("/user/login", {
          email: data.email,
          password: securePassword,
        });

        if (!logged.data) {
          //Si no encuentra el usuario
          setShowText3(true);
          return;
        }

        const auth = await getAuth();

        const credential = await signInWithCustomToken(
          auth,
          logged.data.customToken
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: logged.data.name,
            email: logged.data.email,
            roleId: logged.data.roleId,
            id: logged.data.id,
            eventId: logged.data.eventId,
            credential: credential.user,
          })
        );

        localStorage.setItem(
          "chat",
          JSON.stringify({
            hide: false,
          })
        );

        const geolocalization = await Axios.get("/geoip");

        if (logged.data.eventId !== null) {
          const event = await Axios.get(
            `/event/findEventId/${logged.data.eventId}`
          );

          const dates = moment
            .utc(event.data[0].initialDate)
            .tz(geolocalization.data.timezone);
          const parsedDate = Date.parse(dates);

          localStorage.setItem(
            "event",
            JSON.stringify({
              title: event.data[0].title,
              dates: event.data[0].initialDate,
              url: event.data[0].url,
              eventId: event.data[0].id,
              initialDate: parsedDate,
            })
          );
        }
        checkLogged();
      } catch (error) {
        setShowText3(true);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    checkLogged();
  }, [darkMode]);

  const metamaskSubmit = async (e) => {
    e.preventDefault();
    setShowText3(false);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const checkAddress = await Axios.post(`/user/checkAddress`, {
          accounts,
        });
        if (checkAddress.data) {
          const saveAddres = await setAddress(checkAddress.data.publicAddress);
          const saveUserData = await setMetamaskUser(checkAddress.data);
          setHideButton(true);
          setShowText(false);
        } else {
          setShowText(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowText(true);
    }
  };

  return (
    <>
      <div
        className={`uk-background-white dark:uk-background-gray-100 dark:uk-text-gray-40 ${darkMode}`}
      >
        <div className="uni-body">
          <div
            id="uni_mobile_menu"
            className="uni-mobile-menu uk-offcanvas"
            data-uk-offcanvas="mode: push; overlay: true; flip: true; selPanel: .uk-offcanvas-bar-panel;"
          >
            <div className="uk-offcanvas-bar-panel uk-panel dark:uk-background-gray-100">
              <div
                className="uni-mobile-menu-wrap uk-flex-column uk-flex-between"
                data-uk-height-viewport="offset-bottom: true;"
              >
                <div className="uni-mobile-menu-content">
                  <header className="uk-card uk-card-2xsmall uk-flex-middle uk-flex-between">
                    <div className="uk-flex-1">
                      <button
                        aria-label="Close Menu"
                        className="uk-offcanvas-close uk-button uk-button-small uk-button-icon uk-button-default uk-button-outline uk-radius-circle"
                        type="button"
                      >
                        <i
                          className="uk-icon-small"
                          data-feather="arrow-left"
                        ></i>
                      </button>
                    </div>
                    <div>
                      <h5 className="uk-h5 uk-margin-remove">Navigation</h5>
                    </div>
                    <div className="uk-flex-1"></div>
                  </header>
                  <hr className="uk-margin-remove" />
                  <div className="uk-card uk-card-small">
                    <div className="uk-panel uk-margin"></div>
                    <div className="uk-panel">
                      <ul className="uk-nav uk-nav-default">
                        <li className="uk-nav-header">Main pages</li>
                        <li>
                          <a href="index.html">
                            <i
                              className="uk-icon-xsmall"
                              data-feather="home"
                            ></i>{" "}
                            Home
                          </a>
                        </li>

                        <li>
                          <a href="contact.html">
                            <i
                              className="uk-icon-xsmall"
                              data-feather="send"
                            ></i>{" "}
                            Contact
                          </a>
                        </li>
                        <li className="uk-nav-header">Inner pages</li>

                        <li>
                          <a href="authors.html">
                            <i
                              className="uk-icon-xsmall"
                              data-feather="users"
                            ></i>{" "}
                            Authors
                          </a>
                        </li>

                        <li className="uk-nav-header">Account</li>
                        <li>
                          <a href="sign-in.html">
                            <i
                              className="uk-icon-xsmall"
                              data-feather="log-in"
                            ></i>{" "}
                            Sign in
                          </a>
                        </li>

                        <li>
                          <a href="reset-password.html">
                            <i
                              className="uk-icon-xsmall"
                              data-feather="lock"
                            ></i>{" "}
                            Reset password
                          </a>
                        </li>
                        <li className="uk-nav-header">Content &amp; Privacy</li>
                        <li>
                          <a href="#">
                            <i
                              className="uk-icon-xsmall"
                              data-feather="file-text"
                            ></i>{" "}
                            Terms of use
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="uk-icon-xsmall"
                              data-feather="file-text"
                            ></i>{" "}
                            Privacy Policy
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="uni_user_login_modal"
            class="uk-modal-full uk-modal"
            data-uk-modal
          >
            <div class="uk-modal-dialog dark:uk-background-gray-100 dark:uk-text-gray-30">
              <div class="uk-modal-close-full uk-position-small">
                <button
                  aria-label="Close"
                  class="uk-button uk-button-small uk-button-icon uk-button-danger uk-button-outline uk-radius-circle"
                  type="button"
                >
                  <i class="uk-icon-small uk-text-unset" data-feather="x"></i>
                </button>
              </div>
              <div class="uk-container uk-container-xsmall">
                <div
                  class="uk-section uk-width-medium@m uk-margin-auto uk-flex-column uk-flex-center"
                  data-uk-height-viewport=""
                >
                  <div class="uk-card uk-panel">
                    <ul
                      class="uk-subnav uk-h2"
                      data-uk-switcher="animation: uk-animation-slide-bottom-small, uk-animation-slide-top-small"
                      hidden
                    >
                      <li>
                        <a href="#login">Log in</a>
                      </li>
                      <li>
                        <a href="#register">Register</a>
                      </li>
                      <li>
                        <a href="#forgot_password">Forgot Password</a>
                      </li>
                    </ul>
                    <ul class="uk-switcher uk-margin">
                      <li>
                        <form
                          class="uni-login-form uk-form-stacked uk-panel uk-width-1-1"
                          action="?"
                          method="post"
                        >
                          <h3 class="uk-h3 uk-text-center uk-margin-large-bottom@m">
                            Sign in
                          </h3>
                          <div class="uk-margin">
                            <label for="email-login" class="uk-form-label">
                              Your email: <span class="uk-text-danger">*</span>
                            </label>
                            <input
                              id="email-login"
                              type="email"
                              name="email"
                              autocomplete="email"
                              class="uk-input"
                              value="user@example.com"
                              required
                            />
                          </div>
                          <div class="uk-margin">
                            <label for="password-login" class="uk-form-label">
                              Your password:{" "}
                              <span class="uk-text-danger">*</span>
                            </label>
                            <input
                              id="password-login"
                              type="password"
                              name="current-password"
                              autocomplete="current-password"
                              class="uk-input"
                              value="12345678"
                              required
                            />
                          </div>
                          <div
                            class="uk-margin uk-grid uk-flex-between uk-flex-middle"
                            data-uk-grid
                          >
                            <div class="uk-flex uk-flex-middle">
                              <input
                                id="remember-login"
                                type="checkbox"
                                name="remember"
                                class="uk-checkbox"
                                checked
                              />
                              <label
                                for="remember-login"
                                class="uk-form-label uk-margin-xsmall-left"
                              >
                                Remember me?
                              </label>
                            </div>
                            <div>
                              <Link
                                to={"/resendToken"}
                                class="uk-link-line uk-text-small uk-text-bold"
                                data-uk-switcher-item="2"
                              >
                                <span>Resend token</span>
                              </Link>
                            </div>
                          </div>
                          <div class="uk-margin-medium">
                            <button
                              type="submit"
                              class="uk-button uk-button-primary uk-button-large@m uk-width-expand"
                            >
                              Log in
                            </button>
                          </div>
                          <div
                            class="uk-grid uk-grid-xsmall uk-flex-center uk-text-xlarge uk-margin-medium-top@m"
                            data-uk-grid
                          >
                            <a aria-label="facebook" href="#facebook">
                              <i class="brand-facebook-alt"></i>
                            </a>
                            <a aria-label="google" href="#google">
                              <i class="brand-google"></i>
                            </a>
                            <a aria-label="twitter" href="#twitter">
                              <i class="brand-twitter"></i>
                            </a>
                          </div>
                        </form>
                      </li>
                      <li>
                        <form
                          class="uni-signup-form uk-form-stacked uk-panel uk-width-1-1"
                          action="?"
                          method="post"
                        >
                          <h3 class="uk-h3 uk-text-center uk-margin-large-bottom@m">
                            Create an account
                          </h3>
                          <div class="uk-margin">
                            <label for="name-signup" class="uk-form-label">
                              Your name:
                            </label>
                            <input
                              id="name-signup"
                              type="text"
                              name="name"
                              autocomplete="name"
                              class="uk-input"
                              value="thesalvare"
                            />
                          </div>
                          <div class="uk-margin-medium">
                            <label for="email-signup" class="uk-form-label">
                              Your email: <span class="uk-text-danger">*</span>
                            </label>
                            <input
                              id="email-signup"
                              type="email"
                              name="email"
                              autocomplete="email"
                              class="uk-input"
                              value="user@example.com"
                              required
                            />
                          </div>
                          <div class="uk-margin">
                            <label for="password-signup" class="uk-form-label">
                              Your password:{" "}
                              <span class="uk-text-danger">*</span>
                            </label>
                            <input
                              id="password-signup"
                              type="password"
                              name="new-password"
                              autocomplete="new-password"
                              class="uk-input"
                              value="12345678"
                              required
                            />
                          </div>
                          <div class="uk-margin-medium">
                            <button
                              type="submit"
                              class="uk-button uk-button-primary uk-button-large@m uk-width-expand"
                            >
                              Sign up
                            </button>
                          </div>
                          <div
                            class="uk-grid uk-grid-xsmall uk-flex-center uk-text-xlarge uk-margin-medium-top@m"
                            data-uk-grid
                          >
                            <a aria-label="facebook" href="#facebook">
                              <i class="brand-facebook-alt"></i>
                            </a>
                            <a aria-label="google" href="#google">
                              <i class="brand-google"></i>
                            </a>
                            <a aria-label="twitter" href="#twitter">
                              <i class="brand-twitter"></i>
                            </a>
                          </div>
                        </form>
                      </li>
                      <li>
                        <form
                          class="uk-form-stacked uk-panel uk-width-1-1"
                          action="?"
                          method="post"
                        >
                          <h3 class="uk-h3 uk-text-center uk-margin-large-bottom@m">
                            Forgot password?
                          </h3>
                          <div class="uk-margin">
                            <label for="email-reset" class="uk-form-label">
                              Your email: <span class="uk-text-danger">*</span>
                            </label>
                            <input
                              id="email-reset"
                              type="email"
                              name="email"
                              class="uk-input"
                              required
                            />
                          </div>
                          <div class="uk-margin-top">
                            <button
                              type="submit"
                              class="uk-button uk-button-primary uk-button-large@m uk-width-expand"
                            >
                              Reset my password
                            </button>
                          </div>
                        </form>
                        <p class="uk-text-small uk-text-bold uk-text-center uk-margin-large-top@m">
                          Did you remember your password?{" "}
                          <a
                            href="#user_login"
                            class="uk-link-line"
                            data-uk-switcher-item="0"
                          >
                            <span>Log in</span>
                          </a>
                          .
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="wrap">
            <header class="uni-header">
              <div
                class="uni-header-navbar"
                data-uk-sticky="top: 60; animation: uk-animation-slide-top"
              >
                <div class="uk-container uk-container-large">
                  <nav
                    class="uk-navbar uk-navbar-container uk-navbar-transparent"
                    data-uk-navbar
                  >
                    <div class="uk-navbar-top">
                      <div class="uk-navbar-left uk-flex-1 uk-visible@m">
                        <ul
                          class="uk-navbar-nav dark:uk-text-gray-10 uk-visible@m"
                          data-uk-navbar-bound
                        >
                          <li></li>
                        </ul>
                      </div>

                      <div class="uk-navbar-center">
                        <div class="uk-navbar-item uk-hidden@m">
                          <a
                            class="uk-link"
                            href="#uni_mobile_menu"
                            data-uk-toggle
                          >
                            <span class="material-icons">menu</span>
                          </a>
                        </div>

                        <a
                          class="uk-logo uk-navbar-item uk-h4 uk-h3@m uk-margin-remove"
                          href="index.html"
                        >
                          <span class="uk-visible@l">
                            {" "}
                            <img
                              class="uk-visible dark:uk-hidden"
                              width="140"
                              src="/assets/img/LOGOS-STREAMINT.svg"
                              alt="Streamint"
                              loading="lazy"
                            />{" "}
                            <img
                              class="uk-hidden dark:uk-visible"
                              width="140"
                              src="/assets/img/LOGOS-STREAMINT.svg"
                              alt="Streamint"
                              loading="lazy"
                            />{" "}
                          </span>
                          <span class="uk-hidden@l">
                            {" "}
                            <img
                              class=""
                              width="60"
                              height="60"
                              src="/assets/img/LOGOS-STREAMINT.svg"
                              alt="Renox3"
                              loading="lazy"
                            />{" "}
                          </span>
                        </a>
                      </div>

                      <div class="uk-navbar-right uk-flex-1 uk-flex-right">
                        <div class="uk-navbar-item">
                          <button
                            type="button"
                            class="uni-login-visible uk-button uk-button-small uk-button-icon uk-radius-circle uk-margin-2xsmall-right"
                          >
                            <i class="uk-icon-small" data-feather="bell"></i>
                            <span class="uni-notifications-count uk-position-top-right uk-text-2xsmall uk-background-danger uk-text-white uk-radius-circle">
                              5
                            </span>
                          </button>
                          <div
                            class="uni-notifications uk-dropdown uk-width-medium@m"
                            data-uk-dropdown="boundary: .uk-navbar-item; pos: bottom-right; mode: click; animation: uk-animation-slide-bottom-small;"
                          >
                            <div
                              class="uk-grid uk-grid-small uk-flex-middle uk-flex-between uk-margin-xsmall"
                              data-uk-grid=""
                            >
                              <div class="uk-width-expand">
                                <h3 class="uk-h6">Notifications</h3>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  class="uk-button uk-button-2xsmall uk-button-icon uk-button-default uk-button-ghost uk-radius-circle"
                                >
                                  <i class="uk-icon-small material-icons">
                                    more_horiz
                                  </i>
                                </button>
                                <div
                                  class="uk-dropdown-minimal uk-text-bold uk-width-small@m uk-dropdown"
                                  data-uk-dropdown="mode: click; pos: bottom-right;"
                                >
                                  <ul class="uk-nav uk-dropdown-nav">
                                    <li>
                                      <a href="#mark_as_read">
                                        <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                          check
                                        </i>
                                        <span>Mark all as read</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#activity_settings">
                                        <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                          settings
                                        </i>
                                        <span>Notifications settings</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="activity.html">
                                        <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                          open_in_new
                                        </i>
                                        <span>Open notifications</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <ul class="uni-notifications-list uk-nav uk-text-small uk-text-muted">
                              <li class="uk-visible-toggle">
                                <div
                                  class="uk-grid-2xsmall uk-grid"
                                  data-uk-grid
                                >
                                  <div class="uk-width-auto">
                                    <div class="uni-user-avatar uk-panel">
                                      <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                                        <canvas width="40" height="40"></canvas>
                                        <img
                                          src="../assets/images/artworks/09.jpg"
                                          alt="MikeSawyer"
                                          class="uni-user-avatar-image uk-cover uk-radius-circle"
                                          data-uk-cover
                                          loading="lazy"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="uk-width-expand">
                                    <p class="uk-margin-remove">
                                      New item listed by{" "}
                                      <b class="uk-text-gray-100 dark:uk-text-white">
                                        {" "}
                                        <a
                                          class="uni-user-link uk-link-reset"
                                          href="author.html"
                                        >
                                          @Thesalvare
                                        </a>{" "}
                                      </b>
                                    </p>
                                    <span class="uk-text-meta">Just now</span>
                                  </div>
                                  <div class="uk-width-auto">
                                    <button
                                      type="button"
                                      class="uk-button uk-button-2xsmall uk-button-icon uk-button-default uk-button-invert uk-radius-circle uk-box-shadow-2xsmall uk-position-z-index uk-invisible-hover"
                                    >
                                      <i class="uk-icon-xsmall material-icons">
                                        more_horiz
                                      </i>
                                    </button>
                                    <div
                                      class="uk-dropdown-minimal uk-text-bold uk-width-small@m uk-dropdown"
                                      data-uk-dropdown="mode: click; pos: bottom-right;"
                                    >
                                      <ul class="uk-nav uk-dropdown-nav">
                                        <li></li>
                                        <li>
                                          <a href="#activity_remove">
                                            <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                              remove_circle_outline
                                            </i>
                                            <span>
                                              Remove this notifications
                                            </span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="uk-visible-toggle">
                                <div
                                  class="uk-grid-2xsmall uk-grid"
                                  data-uk-grid
                                >
                                  <div class="uk-width-auto">
                                    <div class="uni-user-avatar uk-panel">
                                      <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                                        <canvas width="40" height="40"></canvas>
                                        <img
                                          src="../assets/images/users/02.gif"
                                          alt="Mike Sawyer"
                                          class="uni-user-avatar-image uk-cover uk-radius-circle"
                                          data-uk-cover
                                          loading="lazy"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="uk-width-expand">
                                    <p class="uk-margin-remove">
                                      Started following{" "}
                                      <b class="uk-text-gray-100 dark:uk-text-white">
                                        {" "}
                                      </b>
                                    </p>
                                    <span class="uk-text-meta">1 min ago</span>
                                  </div>
                                  <div class="uk-width-auto">
                                    <button
                                      type="button"
                                      class="uk-button uk-button-2xsmall uk-button-icon uk-button-default uk-button-invert uk-radius-circle uk-box-shadow-2xsmall uk-position-z-index uk-invisible-hover"
                                    >
                                      <i class="uk-icon-xsmall material-icons">
                                        more_horiz
                                      </i>
                                    </button>
                                    <div
                                      class="uk-dropdown-minimal uk-text-bold uk-width-small@m uk-dropdown"
                                      data-uk-dropdown="mode: click; pos: bottom-right;"
                                    >
                                      <ul class="uk-nav uk-dropdown-nav">
                                        <li></li>
                                        <li></li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="uk-visible-toggle">
                                <div
                                  class="uk-grid-2xsmall uk-grid"
                                  data-uk-grid
                                >
                                  <div class="uk-width-auto">
                                    <div class="uni-user-avatar uk-panel">
                                      <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                                        <canvas width="40" height="40"></canvas>
                                        <img
                                          src="../assets/images/users/03.gif"
                                          alt="Mike Sawyer"
                                          class="uni-user-avatar-image uk-cover uk-radius-circle"
                                          data-uk-cover
                                          loading="lazy"
                                        />{" "}
                                        <a
                                          aria-label="Mike Sawyer"
                                          href="author.html"
                                          class="uk-position-cover"
                                        ></a>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="uk-width-expand">
                                    <p class="uk-margin-remove">
                                      Placed bid by{" "}
                                      <b class="uk-text-gray-100 dark:uk-text-white">
                                        {" "}
                                        <a
                                          class="uni-user-link uk-link-reset"
                                          href="author.html"
                                        >
                                          @Africarare
                                        </a>{" "}
                                      </b>
                                    </p>
                                    <span class="uk-text-meta">5 mins ago</span>
                                  </div>
                                  <div class="uk-width-auto">
                                    <button
                                      type="button"
                                      class="uk-button uk-button-2xsmall uk-button-icon uk-button-default uk-button-invert uk-radius-circle uk-box-shadow-2xsmall uk-position-z-index uk-invisible-hover"
                                    >
                                      <i class="uk-icon-xsmall material-icons">
                                        more_horiz
                                      </i>
                                    </button>
                                    <div
                                      class="uk-dropdown-minimal uk-text-bold uk-width-small@m uk-dropdown"
                                      data-uk-dropdown="mode: click; pos: bottom-right;"
                                    >
                                      <ul class="uk-nav uk-dropdown-nav">
                                        <li>
                                          <a href="#mark_as_read">
                                            <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                              check
                                            </i>
                                            <span>Mark as read</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#activity_remove">
                                            <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                              remove_circle_outline
                                            </i>
                                            <span>
                                              Remove this notifications
                                            </span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <a
                                  aria-label="Activity"
                                  href="activity.html"
                                  class="uk-position-cover"
                                ></a>
                              </li>
                              <li class="uk-visible-toggle">
                                <div
                                  class="uk-grid-2xsmall uk-grid"
                                  data-uk-grid
                                >
                                  <div class="uk-width-auto">
                                    <div class="uni-user-avatar uk-panel">
                                      <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                                        <canvas width="40" height="40"></canvas>
                                        <img
                                          src="../assets/images/users/04.gif"
                                          alt="Mike Sawyer"
                                          class="uni-user-avatar-image uk-cover uk-radius-circle"
                                          data-uk-cover
                                          loading="lazy"
                                        />{" "}
                                        <a
                                          aria-label="Mike Sawyer"
                                          href="author.html"
                                          class="uk-position-cover"
                                        ></a>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="uk-width-expand">
                                    <p class="uk-margin-remove">
                                      New item listed by{" "}
                                      <b class="uk-text-gray-100 dark:uk-text-white">
                                        {" "}
                                        <a
                                          class="uni-user-link uk-link-reset"
                                          href="author.html"
                                        >
                                          @Spooky
                                        </a>{" "}
                                      </b>
                                    </p>
                                    <span class="uk-text-meta">
                                      24 mins ago
                                    </span>
                                  </div>
                                  <div class="uk-width-auto">
                                    <button
                                      type="button"
                                      class="uk-button uk-button-2xsmall uk-button-icon uk-button-default uk-button-invert uk-radius-circle uk-box-shadow-2xsmall uk-position-z-index uk-invisible-hover"
                                    >
                                      <i class="uk-icon-xsmall material-icons">
                                        more_horiz
                                      </i>
                                    </button>
                                    <div
                                      class="uk-dropdown-minimal uk-text-bold uk-width-small@m uk-dropdown"
                                      data-uk-dropdown="mode: click; pos: bottom-right;"
                                    >
                                      <ul class="uk-nav uk-dropdown-nav">
                                        <li>
                                          <a href="#mark_as_read">
                                            <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                              check
                                            </i>
                                            <span>Mark as read</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#activity_remove">
                                            <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                              remove_circle_outline
                                            </i>
                                            <span>
                                              Remove this notifications
                                            </span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <a
                                  aria-label="Activity"
                                  href="activity.html"
                                  class="uk-position-cover"
                                ></a>
                              </li>
                              <li class="uk-visible-toggle">
                                <div
                                  class="uk-grid-2xsmall uk-grid"
                                  data-uk-grid
                                >
                                  <div class="uk-width-auto">
                                    <div class="uni-user-avatar uk-panel">
                                      <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                                        <canvas width="40" height="40"></canvas>
                                        <img
                                          src="../assets/images/users/01.gif"
                                          alt="Mike Sawyer"
                                          class="uni-user-avatar-image uk-cover uk-radius-circle"
                                          data-uk-cover
                                          loading="lazy"
                                        />{" "}
                                        <a
                                          aria-label="Mike Sawyer"
                                          href="author.html"
                                          class="uk-position-cover"
                                        ></a>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="uk-width-expand">
                                    <p class="uk-margin-remove">
                                      Like given by{" "}
                                      <b class="uk-text-gray-100 dark:uk-text-white">
                                        {" "}
                                        <a
                                          class="uni-user-link uk-link-reset"
                                          href="author.html"
                                        >
                                          @0x355...2f4f4
                                        </a>{" "}
                                      </b>
                                    </p>
                                    <span class="uk-text-meta">
                                      30 mins ago
                                    </span>
                                  </div>
                                  <div class="uk-width-auto">
                                    <button
                                      type="button"
                                      class="uk-button uk-button-2xsmall uk-button-icon uk-button-default uk-button-invert uk-radius-circle uk-box-shadow-2xsmall uk-position-z-index uk-invisible-hover"
                                    >
                                      <i class="uk-icon-xsmall material-icons">
                                        more_horiz
                                      </i>
                                    </button>
                                    <div
                                      class="uk-dropdown-minimal uk-text-bold uk-width-small@m uk-dropdown"
                                      data-uk-dropdown="mode: click; pos: bottom-right;"
                                    >
                                      <ul class="uk-nav uk-dropdown-nav">
                                        <li>
                                          <a href="#mark_as_read">
                                            <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                              check
                                            </i>
                                            <span>Mark as read</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#activity_remove">
                                            <i class="uk-icon-xsmall material-icons uk-margin-xsmall-right">
                                              remove_circle_outline
                                            </i>
                                            <span>
                                              Remove this notifications
                                            </span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <a
                                  aria-label="Activity"
                                  href="activity.html"
                                  class="uk-position-cover"
                                ></a>
                              </li>
                              <li>
                                <a
                                  href="activity.html"
                                  class="uk-button uk-button-small uk-button-default uk-button-outline uk-width-1-1 uk-margin-xsmall-top"
                                >
                                  See all
                                </a>
                              </li>
                            </ul>
                          </div>

                          <a
                            href="#uni_user_login_modal"
                            class="uni-logout-visible uk-button uk-button-small uk-button-default uk-button-alt uk-radius-large"
                            data-uk-toggle
                            onclick="UIkit.switcher('#uni_user_login_modal [data-uk-switcher]').show(0)"
                          >
                            <span>Sign in</span>
                          </a>

                          <button
                            type="button"
                            class="uni-login-visible uk-button uk-button-small uk-button-icon uk-radius-circle uk-box-shadow-xsmall uk-margin-xsmall-left"
                          >
                            <img
                              src="../assets/images/artworks/15.gif"
                              alt="Yayoi"
                              class="uni-user-avatar-image uk-cover uk-radius-circle"
                              data-uk-cover
                              loading="lazy"
                            />
                          </button>
                          <div
                            class="uk-dropdown"
                            data-uk-dropdown="boundary: .uni-header-navbar; mode: click; animation: uk-animation-slide-bottom-small;"
                          >
                            <ul class="uk-nav uk-dropdown-nav">
                              <li class="uk-margin-xsmall">
                                <div
                                  class="uk-grid-2xsmall uk-flex-middle uk-grid"
                                  data-uk-grid
                                >
                                  <div class="uk-width-expand">
                                    <h5 class="uk-h6 uk-margin-remove">
                                      <a
                                        class="uni-user-link uk-link-reset"
                                        href="author.html"
                                      >
                                        @Yayoi
                                      </a>
                                    </h5>
                                    <span class="uk-text-small uk-text-muted">
                                      Balance:{" "}
                                      <span class="uk-text-gradient">
                                        9.209 ETH
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <a
                                  aria-label="Dashboard"
                                  href="author.html"
                                  class="uk-position-cover"
                                ></a>
                              </li>
                              <li class="uk-nav-divider"></li>
                              <li>
                                <a href="author.html?switcher-id=profile-tabs&switcher-index=0">
                                  My Items
                                </a>
                              </li>
                              <li>
                                <a href="author.html?switcher-id=profile-tabs&switcher-index=1">
                                  Collectibles
                                </a>
                              </li>
                              <li>
                                <a href="author.html?switcher-id=profile-tabs&switcher-index=3">
                                  Followers
                                </a>
                              </li>
                              <li>
                                <a href="author.html?switcher-id=profile-tabs&switcher-index=4">
                                  Edit Profile
                                </a>
                              </li>
                              <li class="uk-nav-divider"></li>
                              <li>
                                <a
                                  class="uni-logout-link uk-text-danger"
                                  href="#logout"
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </header>
            <div
              class="darkmode-trigger uk-position-bottom-right uk-position-small uk-position-fixed uk-box-shadow-large uk-radius-circle"
              data-darkmode-toggle=""
            >
              <label class="switch">
                <span class="sr-only">Dark mode toggle</span>
                <input type="checkbox" onChange={handleChange} />
                <span class="slider"></span>
              </label>
            </div>
            <div class="uni-sign-in uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-border-top">
              <header class="uni-page-header">
                <div class="uk-container">
                  <h1 class="heading uk-h3 uk-h1@m uk-text-center">Sign in</h1>
                </div>
              </header>
              <div class="uk-margin-top uk-margin-large-top@m">
                <div class="uk-container">
                  <div class="uk-flex-column uk-flex-center uk-width-medium@m uk-margin-auto">
                    <form
                      class="uk-form-stacked uk-panel uk-width-1-1"
                      onSubmit={formik.handleSubmit}
                    >
                      <div class="uk-margin">
                        <label for="email-login-page" class="uk-form-label">
                          Your email: <span class="uk-text-danger">*</span>
                        </label>
                        <input
                          id="email-login-page"
                          type="text"
                          name="email"
                          class="uk-input"
                          required
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          validate={formik.touched.email}
                          error={formik.errors.email}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <span className="text-red-400">
                          {formik.errors.email}
                        </span>
                      )}
                      <div class="uk-margin">
                        <label for="password-login-page" class="uk-form-label">
                          Your token: <span class="uk-text-danger">*</span>
                        </label>
                        <input
                          id="password-login-page"
                          type="password"
                          name="password"
                          class="uk-input"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          validate={formik.touched.password}
                          error={formik.errors.password}
                          required
                        />
                        {formik.touched.password && formik.errors.password && (
                          <span className="text-red-400">
                            {formik.errors.password}
                          </span>
                        )}
                      </div>
                      <div
                        class="uk-margin uk-grid uk-flex-between uk-flex-middle"
                        data-uk-grid
                      >
                        <div class="uk-flex uk-flex-middle"></div>
                        <div>
                          <Link
                            to={"/resendToken"}
                            class="uk-link-line uk-text-small uk-text-bold"
                            
                          >
                            <span>Resend Token</span>
                          </Link>
                        </div>
                      </div>
                      {showText3 ? (
                        <p class="uk-form-label">
                          Incorrect email/token or user already logged in.
                          Please try again.
                        </p>
                      ) : (
                        <></>
                      )}
                      <div class="uk-margin-medium">
                        <button
                          type="submit"
                          class="uk-button uk-button-primary uk-button-large@m uk-width-expand"
                          disabled={
                            !formik.values.email ||
                            !formik.values.password ||
                            formik.errors.password
                          }
                        >
                          {showSpinner ? (
                            <TailSpin
                              height="30"
                              width="30"
                              color="white"
                              ariaLabel="loading"
                            />
                          ) : (
                            <></>
                          )}
                          {hideLogIn ? "" : "Log In"}
                        </button>
                      </div>
                    </form>
                    <span>
                      <hr></hr>
                    </span>
                    {hideButton === true ? (
                      <></>
                    ) : (
                      <>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <p
                            class="uk-form-label"
                            style={{ fontStyle: "italic" }}
                          >
                            Or
                          </p>
                        </div>
                        <div class="uk-margin-medium">
                          <button
                            type="button"
                            class="uk-button uk-button-primary uk-button-large@m uk-width-expand"
                            onClick={metamaskSubmit}
                          >
                            Log in with Metamask
                          </button>
                        </div>
                      </>
                    )}
                    {showText ? (
                      <p class="uk-form-label">
                        Metamask wallet or address not found. Please connect
                        your Metamask or change the selected address. Otherwise
                        insert your Email and Password.
                      </p>
                    ) : (
                      <></>
                    )}
                    {address ? (
                      <div>
                        <form onSubmit={findToken}>
                          {!showText2 ? (
                            <label class="uk-form-label">
                              Address found. Your Token:{" "}
                              <span class="uk-text-danger">*</span>
                            </label>
                          ) : (
                            <label class="uk-form-label">
                              Token not found. Please try again:{" "}
                              <span class="uk-text-danger">*</span>
                            </label>
                          )}
                          <input
                            class="uk-input"
                            onChange={getToken}
                            type="text"
                          />
                          <button
                            type="submit"
                            class="uk-margin-top uk-button uk-button-primary uk-button-large@m uk-width-expand"
                          >
                            {showSpinnerMetamask ? (
                              <TailSpin
                                height="30"
                                width="30"
                                color="white"
                                ariaLabel="loading"
                              />
                            ) : (
                              <></>
                            )}
                            {hideLogInMetasmask ? "" : "Send Token"}
                          </button>
                        </form>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div
                      class="uk-grid uk-grid-xsmall uk-flex-center uk-text-xlarge uk-margin-medium-top@m"
                      data-uk-grid
                    >
                      <a aria-label="facebook" href="#facebook">
                        <i class="brand-facebook-alt"></i>
                      </a>
                      <a aria-label="google" href="#google">
                        <i class="brand-google"></i>
                      </a>
                      <a aria-label="twitter" href="#twitter">
                        <i class="brand-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer class="uni-footer uk-section-small uk-section-medium@m uk-border-top">
            <div class="uk-container uk-container-expand">
              <div
                class="uk-grid-2xlarge uk-grid-divider uk-child-width-1-1 uk-grid"
                data-uk-grid
              >
                <div>
                  <div class="uk-panel uk-section@m">
                    <div class="uk-flex-center uk-flex-middle uk-text-center">
                      <div class="uk-panel uk-flex-column uk-flex-middle">
                        <h1 class="uk-h3 uk-h1@m uk-margin-small"> </h1>
                        <p class="uk-text-lead uk-text-muted uk-margin-remove"></p>
                        <div class="uk-panel uk-inline uk-width-xlarge@m uk-margin-top uk-margin-medium-top@m"></div>
                        <p class="uk-text-small uk-text-muted uk-margin-large-top@m"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="uk-grid-small uk-grid-medium@m uk-child-width-auto uk-flex-center uk-flex-between@m uk-flex-middle uk-text-center uk-text-left@m uk-grid"
                    data-uk-grid
                  >
                    <div class="uk-flex-last@m">
                      <ul class="uni-social-media uk-subnav uk-subnav-small uk-text-muted">
                        <li>
                          <a
                            aria-label="twitter"
                            href="https://twitter.com/unistudioco"
                          >
                            <i class="uk-icon-small brand-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            aria-label="facebook"
                            href="https://facebook.com/unistudioco"
                          >
                            <i class="uk-icon-small brand-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            aria-label="snapchat"
                            href="https://snapchat.com/unistudioco"
                          >
                            <i class="uk-icon-small brand-snapchat"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            aria-label="youtube-play"
                            href="https://youtube.com/unistudioco"
                          >
                            <i class="uk-icon-small brand-youtube-play"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            aria-label="reddit-alien"
                            href="https://reddit.com/unistudioco"
                          >
                            <i class="uk-icon-small brand-reddit-alien"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            aria-label="quora"
                            href="https://quora.com/unistudioco"
                          >
                            <i class="uk-icon-small brand-quora"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div
                        class="uk-grid-small uk-grid-medium@m uk-flex-center uk-flex-between@m uk-flex-middle uk-grid"
                        data-uk-grid
                      >
                        <div class="uk-flex-last@m">
                          <ul class="uk-subnav uk-subnav-small uk-subnav-medium@m uk-text-bold">
                            <li>
                              <a href="terms.html">Terms</a>
                            </li>
                            <li>
                              <a href="privacy.html">Privacy policy</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p class="uk-text-muted">
                            © Renox, All rights reserved.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default UserLogIn;
