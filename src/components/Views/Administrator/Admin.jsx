import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../../../config/axios";
import CardEvent from "./CardEvent";
import { actionsToLog } from "../../../enum/enum";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditModal from "../../../commons/Modals/EditModal";
import { TailSpin } from "react-loader-spinner";

const MenuAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    const userLogged = JSON.parse(localStorage.getItem("user"));
    await Axios.post("user/logout", userLogged);
    localStorage.clear();
    navigate("/");
  };

  return (
    <header class="uni-header ">
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
                    <Link to={"/administrator"}> Events</Link>
                    {location.pathname === "/administrator" ? (
                      <ul class="uk-submenu">
                        <li>
                          <Link to={"/administrator/create"}>Create</Link>
                        </li>
                      </ul>
                    ) : (
                      <></>
                    )}
                  </li>
                  <li>
                    <Link to={"/administrator/users"}>Users</Link>
                  </li>
                  <li>
                    <Link to={"/administrator/logs"}>Dashboard</Link>
                  </li>
                </ul>
              </div>

              <div class="uk-navbar-center">
                <div class="uk-navbar-item uk-hidden@m">
                  <a class="uk-link" href="#uni_mobile_menu" data-uk-toggle>
                    <img
                      class="uk-hidden dark:uk-visible"
                      width="140"
                      src="/assets/img/logos-streamint.svg"
                      alt="Renox1"
                      loading="lazy"
                    />
                  </a>
                </div>

                <Link
                  class="uk-logo uk-navbar-item uk-h4 uk-h3@m uk-margin-remove"
                  to={"home"}
                >
                  <span class="uk-visible@l">
                    {" "}
                    <img
                      class=""
                      width="240"
                      src="/assets/img/LOGOS-STREAMINT.svg"
                      alt="Renox2"
                      loading="lazy"
                    />{" "}
                  </span>
                  <span class="uk-hidden@l">
                    {" "}
                    {/* <img
                      class=""
                      width="40"
                      src="/assets/img/logos-streamint.svg"
                      alt="Renox3"
                      loading="lazy"
                    />{" "} */}
                  </span>
                </Link>
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
                          <i class="uk-icon-small material-icons">more_horiz</i>
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
                        <div class="uk-grid-2xsmall uk-grid" data-uk-grid>
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
                                    <span>Remove this notifications</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="uk-visible-toggle">
                        <div class="uk-grid-2xsmall uk-grid" data-uk-grid>
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
                                <a
                                  class="uni-user-link uk-link-reset"
                                  href="author.html"
                                >
                                  @0x355...2f4f4
                                </a>{" "}
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
                                    <span>Remove this notifications</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="uk-visible-toggle">
                        <div class="uk-grid-2xsmall uk-grid" data-uk-grid>
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
                                    <span>Remove this notifications</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="uk-visible-toggle">
                        <div class="uk-grid-2xsmall uk-grid" data-uk-grid>
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
                            <span class="uk-text-meta">24 mins ago</span>
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
                                    <span>Remove this notifications</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="uk-visible-toggle">
                        <div class="uk-grid-2xsmall uk-grid" data-uk-grid>
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
                            <span class="uk-text-meta">30 mins ago</span>
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
                                    <span>Remove this notifications</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
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

                  <button
                    type="submit"
                    class="uk-button uk-button-primary"
                    onClick={handleClick}
                  >
                    Log Out
                  </button>

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
                              <span class="uk-text-gradient">9.209 ETH</span>
                            </span>
                          </div>
                        </div>
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
  );
};

const AdminHome = () => {
  const [event, setEvent] = useState([]);
  const getAllUsers = async (eventId) => {
    try {
      const userList = await Axios.post("/user/list", { eventId: eventId });
      return userList;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllEvents = async () => {
    try {
      const eventList = await Axios.get("/event/findEvents");
      const eventMap = await Promise.all(
        eventList.data.map(async (event) => {
          const usersCount = await getAllUsers(event.id);

          event.users = usersCount.data;
          return event;
        })
      );
      setEvent(eventMap);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <div class="wrap">
        <div class="uni-explore uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-border-top">
          <header class="uni-page-header">
            <div class="uk-container">
              <h1 class="heading uk-h3 uk-h1@m uk-text-center">
                Streams Inventory
              </h1>
            </div>
          </header>
          <div class="uk-margin-top uk-margin-large-top@m">
            <div class="uk-container">
              {!event.length ? (
                <div
                  className="uk-section uk-expand-height uk-text-center"
                  style={{ height: "20vh" }}
                >
                  <div className="uni-artwork-header uk-panel">
                    <p className=" uni-artwork uk-card uk-card-xsmall">
                      No events created yet
                    </p>
                  </div>
                  <Link
                    to={`/administrator/create`}
                    class="uk-button uk-button-small uk-button-darkgrey uk-radius-large uk-margin-xsmall-left uk-margin-xsmall-right "
                  >
                    <span>Create</span>
                  </Link>
                </div>
              ) : (
                <></>
              )}
              <div class="uk-margin-top">
                <div class="uk-container">
                  <div class="uk-panel">
                    <div class="uk-grid uk-grid-large@m" data-uk-grid>
                      <div class="uk-width-expand@m">
                        <div
                          id="explore-list-container"
                          class="uk-grid-2xsmall uk-grid-small@m uk-grid-match uk-child-width-1-2 uk-child-width-1-3@m uk-grid "
                          data-uk-grid
                        >
                          {event.length ? (
                            event.map((event) => (
                              <CardEvent key={event.id} event={event} />
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminFooter = () => {
  return (

    <footer class="uni-footer uk-section-small uk-section-medium@m uk-border-top">
    <div class="uk-container uk-container-expand">
        <div class="uk-grid-2xlarge uk-grid-divider uk-child-width-1-1 uk-grid" data-uk-grid>
            <div>
                <div class="uk-panel uk-section@m">
                    <div class="uk-flex-center uk-flex-middle uk-text-center">
                        <div class="uk-panel uk-flex-column uk-flex-middle">
                            <h1 class="uk-h3 uk-h1@m uk-margin-small"></h1>
                            <p class="uk-text-lead uk-text-muted uk-margin-remove"></p>
                            <div class="uk-panel uk-inline uk-width-xlarge@m uk-margin-top uk-margin-medium-top@m">
                                <span class="uk-form-icon">
                                </span>
                            </div>
                            <p class="uk-text-small uk-text-muted uk-margin-large-top@m"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-grid-small uk-grid-medium@m uk-child-width-auto uk-flex-center uk-flex-between@m uk-flex-middle uk-text-center uk-text-left@m uk-grid" data-uk-grid>
                    <div class="uk-flex-last@m">
                        <ul class="uni-social-media uk-subnav uk-subnav-small uk-text-muted">
                            <li>
                                <a aria-label="twitter" href="https://twitter.com/unistudioco"><i class="uk-icon-small brand-twitter"></i></a>
                            </li>
                            <li>
                                <a aria-label="facebook" href="https://facebook.com/unistudioco"><i class="uk-icon-small brand-facebook"></i></a>
                            </li>
                            <li>
                                <a aria-label="snapchat" href="https://snapchat.com/unistudioco"><i class="uk-icon-small brand-snapchat"></i></a>
                            </li>
                            <li>
                                <a aria-label="youtube-play" href="https://youtube.com/unistudioco"><i class="uk-icon-small brand-youtube-play"></i></a>
                            </li>
                            <li>
                                <a aria-label="reddit-alien" href="https://reddit.com/unistudioco"><i class="uk-icon-small brand-reddit-alien"></i></a>
                            </li>
                            <li>
                                <a aria-label="quora" href="https://quora.com/unistudioco"><i class="uk-icon-small brand-quora"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div class="uk-grid-small uk-grid-medium@m uk-flex-center uk-flex-between@m uk-flex-middle uk-grid" data-uk-grid>
                            <div class="uk-flex-last@m">
                                <ul class="uk-subnav uk-subnav-small uk-subnav-medium@m uk-text-bold">
                                    <li><a href="terms.html">Terms</a></li>
                                    <li><a href="privacy.html">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div>

                                <p class="uk-text-muted">© StreaMint, All rights reserved.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

  );
};

const CreateEvent = ({ action }) => {
  const [editModal, setEditModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [hideCreate, setHideCreate] = useState(false);

  let eventId;

  const navigate = useNavigate();
  let initialValues = {
    title: "",
    initialDate: "",
    description: "",
    url: "",
  };

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (action === "edit") {
    let { title, initialDate, description, id, url } = location.state;
    initialDate = initialDate.slice(0, 16);
    initialValues = { title, initialDate, description, url };
    eventId = id;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string("must be a string").required(
        "fields must be completed"
      ),
      initialDate: Yup.date("must be a date").required(
        "fields must be completed"
      ),
      description: Yup.string("must be a string").required(
        "fields must be completed"
      ),
      url: Yup.string("must be a string").required("fields must be completed"),
    }),
    onSubmit: async (data) => {
      try {
        setHideCreate(true);
        setShowSpinner(true);
        data.title = data.title.trim();
        let event;
        let listEmail;
        if (action === "edit") {
          event = await Axios.put(`/event/modifyEvent/${eventId}`, data);
          listEmail = await Axios.get(`/user/listEmail/${eventId}`);
          await Axios.post(`/nodemailer/modifyNotification/`, listEmail);
          await Axios.post("/logs", {
            userId: user.id,
            email: user.email,
            action: actionsToLog.editEvent,
            payload: [{ id: event.data.id }, { title: event.data.title }],
          });
          setHideCreate(false);
          setShowSpinner(false);
        } else {
          event = await Axios.post("/event/addEvent", data);
          await Axios.post("/logs", {
            userId: user.id,
            email: user.email,
            action: actionsToLog.createEvent,
            payload: [{ id: event.data.id }, { title: event.data.title }],
          });
          setHideCreate(false);
          setShowSpinner(false);
        }

        if (event.data.id) {
          setEditModal(true);
        } else {
          console.log(`Something went wrong`);
          setHideCreate(false);
          setShowSpinner(false);
        }
      } catch (error) {
        console.log(error);
        setHideCreate(false);
        setShowSpinner(false);
      }
    },
  });

  useEffect(() => {}, []);

  return (
    <>
      {editModal ? <EditModal /> : <></>}
      <div class="uni-create uk-section uk-section-large@m uk-panel uk-overflow-hidden ">
        <div class="uk-container uk-container-xsmall">
          <div class="uk-grid" data-uk-grid>
            <div class="uk-width-2-3@m">
              <div
                class="uk-grid-small uk-flex-middle uk-flex-between uk-grid"
                data-uk-grid
              >
                <div>
                  <h1 class="uk-h4 uk-h3@m uk-margin-2xsmall">
                    {action === "edit" ? "Edit event" : "Create event"}
                  </h1>
                </div>
              </div>
            </div>
            <div class="uk-width-2-3@m">
              <div class="uk-panel uk-width-2xlarge@m uk-margin-auto">
                <form
                  onSubmit={formik.handleSubmit}
                  class="uk-form-stacked uk-grid-xsmall uk-grid-small@m uk-child-width-1-1 uk-grid "
                  data-uk-grid
                >
                  <div class="uk-form-group">
                    <h3 class="uk-h6 uk-margin-remove">Information</h3>
                    <p class="uk-text-xsmall uk-text-small@m uk-text-bold uk-text-muted uk-margin-remove">
                      Insert event infomation
                    </p>
                  </div>
                  <div class="uk-form-group">
                    <label class="uk-form-label uk-text-small">Title</label>
                    <div class="uk-form-controls">
                      <input
                        class="uk-input uk-form-small"
                        placeholder="Title"
                        name={"title"}
                        text={"ingles.title"}
                        type={"text"}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                      />
                    </div>
                  </div>
                  <div class="uk-form-group">
                    <label class="uk-form-label uk-text-small">URL</label>
                    <div class="uk-form-controls">
                      <input
                        class="uk-input uk-form-small"
                        name={"url"}
                        text={"ingles.event-url"}
                        type={"text"}
                        onChange={formik.handleChange}
                        placeholder={"URL"}
                        value={formik.values.url}
                        validate={formik.touched.url}
                        error={formik.errors.url}
                      />
                    </div>
                  </div>
                  <div class="uk-form-group">
                    <label class="uk-form-label uk-text-small">
                      Description
                    </label>
                    <div class="uk-form-controls">
                      <input
                        class="uk-input uk-form-small"
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        placeholder={"Description"}
                      />
                    </div>
                  </div>
                  <div class="uk-form-group">
                    <hr />
                  </div>
                  <div class="uk-form-group">
                    <h3 class="uk-h6 uk-margin-remove">Scheduled Date</h3>
                    <p class="uk-text-xsmall uk-text-small@m uk-text-bold uk-text-muted uk-margin-remove">
                      Select date in calendar
                    </p>
                  </div>
                  <div class="uk-form-group uk-width-1-2@m">
                    <div class="uk-form-controls">
                      <input
                        class="uk-input uk-form-small"
                        name={"initialDate"}
                        text={"ingles.start-date"}
                        type="datetime-local"
                        onChange={formik.handleChange}
                        value={formik.values.initialDate}
                      />
                    </div>
                  </div>
                  <div class="uk-form-group"></div>
                  <div class="uk-form-group">
                    <div
                      class="uk-grid-xsmall uk-flex-middle uk-flex-center uk-flex-between@m uk-grid"
                      data-uk-grid
                    >
                      <div class="uk-width-1-1 uk-width-expand@m">
                        <button
                          type="submit"
                          class="uk-button uk-button-primary uk-width-1-1 uk-width-xsmall@m"
                        >
                          {" "}
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
                          {hideCreate ? "" : "Confirm"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { MenuAdmin, AdminHome, AdminFooter, CreateEvent };
