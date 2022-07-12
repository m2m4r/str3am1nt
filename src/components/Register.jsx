import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Axios from "../config/axios";
import React from "react";
import "../assets/styles/register.css";
import Web3 from "web3";
import { useState } from "react";
import RegisterSuccess from "../commons/Modals/RegisterSuccess";
import { TailSpin } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const [errorInvite, setErrorInvite] = useState("");
  const [modal, setModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [hideLogIn, setHideLogIn] = useState(false);

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("fields must be completed"),
      lastName: Yup.string().required("fields must be completed"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("fields must be completed"),
    }),
    onSubmit: async (data) => {
      try {
        setShowSpinner(true);
        setHideLogIn(true);
        const email = data.email;
        if (document.getElementById("checkboxMKS").checked) {
          const hasAddress = await Axios.get(`/user/findByEmail/${email}`);
          if (hasAddress.length === 0) {
            alert("Usuario no autorizado");
          } else if (hasAddress.data.publicAddress === null) {
            const logInWithEth = async () => {
              if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                try {
                  let accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                  });
                  await Axios.post(`/user/saveAddress`, { accounts, email });
                  const sendToken = await Axios.post(
                    `/nodemailer/sendToken`,
                    data
                  );
                } catch (error) {
                  console.error(error);
                }
              } else {
                alert(
                  "Metamask Wallet not found. Please connect your wallet or remove the option selected."
                );
              }
            };
            logInWithEth();
          } else {
            hasAddress.publicAddress = hasAddress.publicAddress;
            const sendToken = await Axios.post(`/nodemailer/sendToken`, data);
          }
        } else {
          await Axios.post(`/nodemailer/sendToken`, data);
        }
        setModal(true);
      } catch (error) {
        if (error.response.data === "User not invited. Try again.") {
          setErrorInvite(error.response.data);
          setHideLogIn(false)
          setShowSpinner(false)
        } else {
          console.log(error);
        }
      }
    },
  });

  return (
    <>
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
                          <li>
                            <a href="activity.html">Home</a>
                          </li>
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
                              src="/assets/img/logos-streamint.svg"
                              alt="Streamint"
                              loading="lazy"
                            />{" "}
                            <img
                              class="uk-hidden dark:uk-visible"
                              width="250"
                              src="/assets/img/logos-streamint.svg"
                              alt="Streamint"
                              loading="lazy"
                            />{" "}
                          </span>
                          <span class="uk-hidden@l">
                            {" "}
                            <img
                              class=""
                              width="24"
                              src="/assets/img/logos-streamint.svg"
                              alt="Streamint"
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
                                        <li>
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
                                        <li>
                                        </li>
                                        <li>
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
      {modal ? <RegisterSuccess /> : <></>}
      <div class="wrap" style={{ backgroundColor: "black", color: "white" }}>
        <div
          class="darkmode-trigger uk-position-bottom-right uk-position-small uk-position-fixed uk-box-shadow-large uk-radius-circle"
          data-darkmode-toggle=""
        >
          <label class="switch">
            <span class="sr-only">Dark mode toggle</span>
            <input type="checkbox" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="uni-sign-up uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-border-top">
          <header class="uni-page-header uk-dark">
            <div class="uk-container uk-dark">
              <h1 class="heading uk-h2 uk-h2@m uk-text-center">
              Confirm your attendance
              </h1>

            </div>
          </header>
          <div class="uk-margin-top uk-margin-large-top@m">
            <div class="uk-container">
              <div class="uk-flex-column uk-flex-center uk-width-medium@m uk-margin-auto">
                <form
                  class="uk-form-stacked uk-panel uk-width-1-1"
                  onSubmit={formik.handleSubmit}
                >
                  <div class="uk-margin-medium">
                    <label for="username-signup" class="uk-form-label">
                      Your name: <span class="uk-text-danger">*</span>
                    </label>
                    <input
                      id="username-signup"
                      class="uk-input"
                      required
                      name={"name"}
                      text={"firstname"}
                      type={"text"}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      validate={formik.touched.name}
                      error={formik.errors.name}
                    />
                  </div>
                  <div class="uk-margin-medium">
                    <label for="username-signup" class="uk-form-label">
                      Your last name: <span class="uk-text-danger">*</span>
                    </label>
                    <input
                      id="username-signup"
                      class="uk-input"
                      required
                      name={"lastName"}
                      text={"ingles.last-name"}
                      type={"text"}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      validate={formik.touched.lastName}
                      error={formik.errors.lastName}
                    />
                  </div>
                  <div class="uk-margin-medium">
                    <label for="email-signup-page" class="uk-form-label">
                      Your email: <span class="uk-text-danger">*</span>
                    </label>
                    <input
                      id="email-signup-page"
                      class="uk-input"
                      required
                      name={"email"}
                      text={"Email"}
                      type={"text"}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      validate={formik.touched.email}
                      error={formik.errors.email}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-red-400">{formik.errors.email}</span>
                  )}
                  {errorInvite !== "" ? <span>{errorInvite}</span> : <></>}
                  <div className="uk-flex">
                  <input type="checkbox" id="checkboxMKS"></input>
                  <label>
                    <span>
                    <p className="uk-margin-top">
                        I want to be able to log in with Metamask
                      </p>
                    </span>
                    </label>
                  </div>
                  <div class="uk-margin-medium">
                    <button
                      type="submit"
                      class="uk-button uk-button-primary uk-button-large@m uk-width-expand"
                      disabled={
                        !formik.values.email ||
                        !formik.values.name ||
                        !formik.values.lastName
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
                      {hideLogIn ? "" : "Confirm"}
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
                <p class="uk-text-small uk-text-bold uk-text-center uk-margin-large-top@m">
                  You already have an account?{" "}
                  <button class="uk-link-line">
                    <span>Log in</span>
                  </button>
                  .
                </p>
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
    </>
  );
};

export default Register;
