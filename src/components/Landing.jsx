import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/landing.css"


const Landing = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userLogged, setUser] = useState(false);
  const location = useLocation();

  const route = () => {
    console.log(location.pathname);
    return user.roleId === 3 ? "/administrator" : "/home";
  };

  //        {  }

  useEffect(() => {
    localStorage.setItem("darkMode", 0);
  }, []);

  return (
    <>

      <div className="wrap">
      {/*  header */}
      <header class="uni-header " style={{ paddingTop: "0" }}>
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
                <div class="uk-navbar-left uk-flex-1 uk-visible@m"></div>
                <div class="uk-navbar-center">
                  <div class="uk-navbar-item uk-hidden@m">
                  
                  </div>

                  <a
                    class="uk-logo uk-navbar-item uk-h4 uk-h3@m uk-margin-remove"
                    href="/"
                  >
                    <span class="uk-visible@l">
                      {" "}
                      <img
                        class="uk-visible dark:uk-hidden"
                        width="140"
                        src="/assets/img/LOGOS-STREAMINT.svg"
                        alt="Renox"
                        loading="lazy"
                      />{" "}
                      <img
                        class="uk-hidden dark:uk-visible"
                        width="140"
                        src="/assets/img/LOGOS-STREAMINT.svg"
                        alt="StreaMint"
                        loading="lazy"
                      />{" "}
                    </span>
                    <span class="uk-hidden@l">
                      {" "}
                      <img
                        class=""
                        width="140"
                        src="/assets/img/LOGOS-STREAMINT.svg"
                        alt="Renox"
                        loading="lazy"
                      />{" "}
                    </span>
                  </a>
                </div>

                <div class="uk-navbar-right uk-flex-1 uk-flex-right">
                  <div class="uk-navbar-item">
                    {user ? (
                      <Link className="btn btn-outline-white" to={route()}>
                        {user.email}
                      </Link>
                    ) : (
                      <Link className="btn btn-outline-white" to={"login"}>
                        Log In
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* banner */}
      <div
        class="uk-panel uk-overflow-hidden dark:uk-background-white-5 uk-padding-large-bottom@m uk-margin-large-bottom"
        style={{ height: "560px" }}
      >
        <div
          class="uk-position-cover dark:uk-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to left, var(--color-primary), var(--color-secondary), var(--color-tertiary), var(--color-info))",
            opacity: "0.1",
          }}
        ></div>
        <img
          class="uk-cover uk-margin-large-bottom@m"
          src="../assets/images/nfts-hero.png"
          alt="Hero Image"
          data-uk-cover=""
        />
        <div class="uk-container uk-container-large">
          <div class="uk-panel">
            <div
              class="uk-grid uk-grid-xsmall uk-grid-2xlarge@m uk-grid-match uk-flex-middle"
              data-uk-grid
            >
              <div class="uk-width-1-2@m">
                <div class="uk-text-left uk-flex-left uk-flex-middle">
                  <div class="uk-panel uk-section uk-section-xlarge@m uk-position-z-index">
                    <h1 class="uk-h3 uk-h1@m uk-margin-small uk-margin@m">
                      Invite your guest, stream your private event and make it memorable
                    </h1>
                    <Link
                      to={'/demo'}
                      class="uk-button uk-button-gradient uk-button-large@m uk-radius-large uk-margin-top uk-margin-medium-top@m"
                    >
                      Watch Demos
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="uni-features uk-section uk-section-large@m uk-padding-large-bottom@m uk-panel uk-overflow-hidden "
        data-aos="fade-up"
      >
       
        <div class="uk-container">
          <div className="uk-text-center">
            <h1>See what you can do with StreaMint</h1>
          </div>
        </div>
      </div>

       {/* separator */}

       <div
        class="uni-features uk-section uk-section-small@m uk-padding-small-bottom@m uk-panel uk-overflow  uk-margin-large uk-margin-small@m"
        data-aos="fade-up"
      >
        
        <div class="uk-container">
          <div className="uk-text-center uk-margin-large">
            <h1 className="uk-margin-large"></h1>
          </div>
        </div>
      </div>

      {/*bussiness flow*/}

      <div
        class="uni-features uk-section uk-section-large@m uk-padding-large-bottom@m uk-panel uk-overflow uk-margin-large"
        data-aos="fade-up"
      >
        {/* <div class="row uk-margin-bottom">
          <div class="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div class="heading text-center wow fadeInUp">
              <span class="badge badge-success badge-pill">
                <div class="uk-panel">
                  <h2 class="uk-h4 uk-h3@m">Use Case</h2>
                </div>
              </span>
            </div>
          </div>
        </div> */}
        <div class="uk-container">
          <div class="uk-panel uk-margin-top uk-margin-medium-top@m">
            <div
              class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid uk-flex-top uk-flex-wrap-top"
              data-uk-grid="masonry: true;"
              style={{ height: "286px" }}
            >
              <div
                class="uk-first-column uk-text-center"
                style={{ transform: "translateY(0px)" }}
              >
                <div
                  class="uni-feature two uk-card uk-card-xsmall uk-card-medium@m uk-card-border uk-radius uk-radius-large@m"
                  style={{ height: "300px" }}
                >
                  <div
                    class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid uk-grid-stack"
                    data-uk-grid=""
                  >
                    <div class="uk-first-column">
                      <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient">
                        <i class="bi bi-bookmark-star-fill">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            class="bi bi-calendar-check-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                          </svg>
                        </i>
                      </div>
                    </div>
                    <div class="uk-width-expand uk-grid-margin uk-first-column">
                      <div class="uk-panel">
                        <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                          Create an event and start inviting
                        </h3>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div
                className="uk-text-center"
                style={{ transform: "translateY(0px)" }}
              >
                <div
                  class="uni-feature two uk-card uk-card-xsmall uk-card-medium@m uk-card-border uk-radius uk-radius-large@m"
                  style={{ height: "300px" }}
                >
                  <div
                    class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid uk-grid-stack"
                    data-uk-grid=""
                  >
                    <div class="uk-first-column uk-text-center">
                      <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient">
                        <i class="bi bi-bookmark-star-fill">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            class="bi bi-people-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path
                              fill-rule="evenodd"
                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                            />
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                          </svg>
                        </i>
                      </div>
                    </div>
                    <div class="uk-width-expand uk-grid-margin uk-first-column">
                      <div class="uk-panel">
                        <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                          {" "}
                          Guest create an account and log in
                        </h3>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div
                className="uk-text-center"
                style={{ transform: "translateY(0px)" }}
              >
                <div
                  class="uni-feature two uk-card uk-card-xsmall uk-card-medium@m uk-card-border uk-radius uk-radius-large@m"
                  style={{ height: "300px" }}
                >
                  <div
                    class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid uk-grid-stack"
                    data-uk-grid=""
                  >
                    <div class="uk-first-column uk-text-center">
                      <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient">
                        <i class="bi bi-bookmark-star-fill">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            class="bi bi-hourglass-split"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                          </svg>
                        </i>
                      </div>
                    </div>
                    <div class="uk-width-expand uk-grid-margin uk-first-column">
                      <div class="uk-panel">
                        <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                          Countdown to event date 
                        </h3>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div
                className="uk-text-center"
                style={{ transform: "translateY(0px)" }}
              >
                <div
                  class="uni-feature two uk-card uk-card-xsmall uk-card-medium@m uk-card-border uk-radius uk-radius-large@m"
                  style={{ height: "300px" }}
                >
                  <div
                    class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid uk-grid-stack"
                    data-uk-grid=""
                  >
                    <div class="uk-first-column uk-text-center">
                      <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient">
                        <i class="bi bi-bookmark-star-fill">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            class="bi bi-ticket-perforated-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4-1v1h1v-1H4Zm1 3v-1H4v1h1Zm7 0v-1h-1v1h1Zm-1-2h1v-1h-1v1Zm-6 3H4v1h1v-1Zm7 1v-1h-1v1h1Zm-7 1H4v1h1v-1Zm7 1v-1h-1v1h1Zm-8 1v1h1v-1H4Zm7 1h1v-1h-1v1Z" />
                          </svg>
                        </i>
                      </div>
                    </div>
                    <div class="uk-width-expand uk-grid-margin uk-first-column">
                      <div class="uk-panel">
                        <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                          POAP minting to certify attendance
                        </h3>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    {/* separator */}

      <div
        class="uni-features uk-section uk-section-small@m uk-padding-small-bottom@m uk-panel uk-overflow  uk-margin-large uk-margin-small@m"
        data-aos="fade-up"
      >
        
        <div class="uk-container">
          <div className="uk-text-center uk-margin-large">
            <h1 className="uk-margin-large"></h1>
          </div>
        </div>
      </div>



        {/* separator */}

      <div
        class="uni-features uk-section uk-section-small@m uk-padding-large-bottom@m uk-panel uk-overflow  uk-margin-small@m"
        data-aos="fade-up"
      >
        <div class="row uk-margin-bottom">
          <div class="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div class="heading text-center wow fadeInUp">
              <span class="badge badge-success badge-pill">
                <div class="uk-panel"></div>
              </span>
            </div>
          </div>
        </div>
        <div class="uk-container">
          <div className="uk-text-center uk-margin-large">
            <h1 className="uk-margin-large"></h1>
          </div>
        </div>
      </div>

         {/* features */}
      <div
        class="uni-features uk-section uk-section-small@m uk-padding-small-bottom@m uk-panel uk-overflow-hidden  uk-margin-top-large"
        data-aos="fade-up"
      >
        <div className="row uk-margin-bottom">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="heading text-center wow fadeInUp">
              <span className="badge badge-success badge-pill">
                <div class="uk-panel uk-text-center">
                  <h2 class="uk-h5 uk-h2@m">Outstanding Features</h2>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="uni-creations uk-section-small uk-section-medium@m uk-panel uk-overflow-hidden swiper-parent">
          <div className="uk-container">
            <div class="uk-panel uk-margin-top uk-margin-medium-top@m">
              <div
                class="swiper-container swiper-match"
                data-swiper="items: 1; gap: 8; freeMode: false;"
                data-swiper-m="items: 4; gap: 17;"
              >
                <div class="swiper-wrapper uk-grid-match">
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Metamask Login
                                <br />
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Enabled Log In with Metamask Wallet.
                                <br />
                                <br />
                                <br />
                                <br />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                {" "}
                                Attendance Reminder
                                <br />
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Email sent 24 hours before streaming. Scheduled
                                shipping check against server crash.
                                <br />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                {" "}
                                Countdown
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Countdown timer reaches zero and the event is
                                rendered.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                {" "}
                                Geolocation
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Countdown rendering with time-zone geolocation.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                POAP{" "}
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Attendants can claim a Proof of Attendance
                                Protocol NFT in order to accredit they have been
                                a member of the audience.
                              </p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Chatroom
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Online chat enabled during stream, built with
                                Firebase moderation functions to avoid profanity
                                and shouting.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Restricted Access
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Access limitation in many devices at the same
                                time to prevent server crash and non-invited
                                attendants.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                {" "}
                                Mailing
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Users are invited and notified about event’s
                                modification/cancellation by email, as well as
                                the receipt of token recovery.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Relational Database
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                User and event data persistence in database.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Single & Multiple Invite
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Single and multiple invite uploading a CSV file.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Admin Dashboard
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Event and user’s inventory, registry of
                                administrator activity & creation, edition and
                                delete event pannel.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Template to React.js
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                Professional UX/UI template migration to
                                React.js components.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div>
                      <div
                        class="uni-feature two uk-card uk-card-xsmall uk-card-small@m uk-card-border uk-radius uk-radius-large@m"
                        id="card-feature"
                      >
                        <div
                          class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
                          data-uk-grid
                        >
                          <div className="uk-text-center">
                            <div class="uni-feature-icon uk-panel uk-inline-block uk-radius-circle uk-background-gradient ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div class="uk-width-expand uk-text-center">
                            <div class="uk-panel">
                              <h3 class="title uk-h6 uk-h5@m uk-margin-remove">
                                Documentation
                              </h3>
                              <p class="description uk-text-large@m uk-text-muted uk-visible">
                                API Documentation with Swagger.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <a
                aria-label="Next"
                href="#next"
                class="swiper-next uk-button uk-button-small uk-button-icon uk-border uk-radius-circle uk-position-center-right uk-position-z-index uk-box-shadow-small dark:uk-background-gray-100"
              >
                <i class="uk-icon-small" data-feather="chevron-right"></i>
              </a>
              <a
                aria-label="Prev"
                href="#prev"
                class="swiper-prev uk-button uk-button-small uk-button-icon uk-border uk-radius-circle uk-position-center-left uk-position-z-index uk-box-shadow-small dark:uk-background-gray-100"
              >
                <i class="uk-icon-small" data-feather="chevron-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

        {/* separator */}

        <div
        class="uni-features uk-section-small uk-section-small@m uk-padding-small-bottom@m uk-panel uk-overflow  uk-margin-large uk-margin-small@m"
        data-aos="fade-up"
      >
        <div class="row uk-margin-bottom">
          <div class="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div class="heading text-center wow fadeInUp">
              <span class="badge badge-success badge-pill">
                <div class="uk-panel"></div>
              </span>
            </div>
          </div>
        </div>
        <div class="uk-container">
          <div className="uk-text-center uk-margin-large">
            <h1 className="uk-margin-large"></h1>
          </div>
        </div>
      </div>

      {/* stack section */}

      <div
        class="uni-artists uk-section-large uk-section-medium@m uk-panel uk-overflow-hidden  uk-margin-large"
        data-aos="fade-up"
      >
        <div className="row uk-margin-bottom">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="heading text-center wow fadeInUp">
              <span className="badge badge-success badge-pill">
                <div class="uk-panel uk-text-center">
                  <h1 class="uk-h5 uk-h2@m">Check out our powerful stack</h1>
                </div>
                <b></b>
              </span>
            </div>
          </div>
        </div>
        <div class="uk-container">
          <div class="uni-features uk-section uk-section-large@m uk-padding-large-bottom@m uk-panel uk-overflow-hidden uk-margin-large"
        data-aos="fade-up">
            <div
              class="uk-grid-2xsmall uk-grid-small@m uk-grid-match uk-child-width-1-2 uk-child-width-1-6@m uk-grid"
              data-uk-grid
            >
              <div>
                <div class="uni-artist uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                  <div class="uni-artist-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-gradient">
                    <canvas class="uk-visible@m" height="120"></canvas>
                    <canvas class="uk-hidden@m" height="140"></canvas>
                  </div>
                  <div class="uni-artist-content uk-padding-remove-top">
                    <div
                      class="uni-artist-avatar uk-grid uk-flex-center"
                      data-uk-grid
                    >
                      <div>
                        <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                          <div class="uni-user-avatar uk-panel">
                            <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                              <canvas width="80" height="80"></canvas>
                              <img
                                src="/assets/img/js.png"
                                alt="Thesalvare"
                                class="uni-user-avatar-image uk-cover uk-radius-circle"
                                style={{ width: "70px" }}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 class="uni-artist-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                      JavaScript
                    </h3>
                    <span class="uni-artist-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center"></span>
                  </div>
                </div>
              </div>
              <div>
                <div class="uni-artist uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                  <div class="uni-artist-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-gradient">
                    <canvas class="uk-visible@m" height="120"></canvas>
                    <canvas class="uk-hidden@m" height="140"></canvas>
                  </div>
                  <div class="uni-artist-content uk-padding-remove-top">
                    <div
                      class="uni-artist-avatar uk-grid uk-flex-center"
                      data-uk-grid
                    >
                      <div>
                        <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                          <div class="uni-user-avatar uk-panel">
                            <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                              <canvas width="80" height="80"></canvas>
                              <img
                                src="/assets/img/nodejs.png"
                                alt="Node Js"
                                class="uni-user-avatar-image uk-cover uk-radius-circle"
                                style={{ width: "70px" }}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 class="uni-artist-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                      Node.js
                    </h3>
                    <span class="uni-artist-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center"></span>
                  </div>
                </div>
              </div>
              <div>
                <div class="uni-artist uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                  <div class="uni-artist-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-gradient">
                    <canvas class="uk-visible@m" height="120"></canvas>
                    <canvas class="uk-hidden@m" height="140"></canvas>
                  </div>
                  <div class="uni-artist-content uk-padding-remove-top">
                    <div
                      class="uni-artist-avatar uk-grid uk-flex-center"
                      data-uk-grid
                    >
                      <div>
                        <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                          <div class="uni-user-avatar uk-panel">
                            <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                              <canvas width="80" height="80"></canvas>
                              <img
                                src="/assets/img/postgres.png"
                                alt="Postgres SQL"
                                class="uni-user-avatar-image uk-cover uk-radius-circle"
                                style={{ width: "70px", height: "70px" }}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 class="uni-artist-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                      PostgreSQL
                    </h3>
                    <span class="uni-artist-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center"></span>
                  </div>
                </div>
              </div>
              <div>
                <div class="uni-artist uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                  <div class="uni-artist-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-gradient">
                    <canvas class="uk-visible@m" height="120"></canvas>
                    <canvas class="uk-hidden@m" height="140"></canvas>
                  </div>
                  <div class="uni-artist-content uk-padding-remove-top">
                    <div
                      class="uni-artist-avatar uk-grid uk-flex-center"
                      data-uk-grid
                    >
                      <div>
                        <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                          <div class="uni-user-avatar uk-panel">
                            <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                              <canvas width="80" height="80"></canvas>
                              <img
                                src="/assets/img/express.png"
                                alt="Thesalvare"
                                class="uni-user-avatar-image uk-cover uk-radius-circle"
                                loading="lazy"
                                style={{ width: "70px", height: "60px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 class="uni-artist-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                      Express.js
                    </h3>
                    <span class="uni-artist-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center"></span>
                  </div>
                </div>
              </div>
              <div>
                <div class="uni-artist uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                  <div class="uni-artist-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-gradient">
                    <canvas class="uk-visible@m" height="120"></canvas>
                    <canvas class="uk-hidden@m" height="140"></canvas>
                  </div>
                  <div class="uni-artist-content uk-padding-remove-top">
                    <div
                      class="uni-artist-avatar uk-grid uk-flex-center"
                      data-uk-grid
                    >
                      <div>
                        <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                          <div class="uni-user-avatar uk-panel">
                            <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                              <canvas width="80" height="80"></canvas>
                              <img
                                src="/assets/img/react.svg"
                                alt="Thesalvare"
                                class="uni-user-avatar-image uk-cover uk-radius-circle"
                                loading="lazy"
                                style={{ width: "60px", height: "70px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <h3 class="uni-artist-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                      React.js
                    </h3>
                    <span class="uni-artist-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center"></span>
                  </div>
                </div>
              </div>

              <div>
                <div class="uni-artist uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                  <div class="uni-artist-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-gradient">
                    <canvas class="uk-visible@m" height="120"></canvas>
                    <canvas class="uk-hidden@m" height="140"></canvas>
                  </div>
                  <div class="uni-artist-content uk-padding-remove-top">
                    <div
                      class="uni-artist-avatar uk-grid uk-flex-center"
                      data-uk-grid
                    >
                      <div>
                        <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                          <div class="uni-user-avatar uk-panel">
                            <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                              <canvas width="80" height="80"></canvas>
                              <img
                                src="/assets/img/firebase.svg"
                                alt="Thesalvare"
                                class="uni-user-avatar-image uk-cover uk-radius-circle"
                                loading="lazy"
                                style={{ width: "50px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 class="uni-artist-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                      Firebase
                    </h3>
                    <span class="uni-artist-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

           {/* separator */}

           <div
        class="uni-features uk-section-small uk-section-small@m uk-padding-small-bottom@m uk-panel uk-overflow  uk-margin-large uk-margin-small@m"
        data-aos="fade-up"
      >
        <div class="row uk-margin-bottom">
          <div class="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div class="heading text-center wow fadeInUp">
              <span class="badge badge-success badge-pill">
                <div class="uk-panel"></div>
              </span>
            </div>
          </div>
        </div>
        <div class="uk-container">
          <div className="uk-text-center uk-margin-large">
            <h1 className="uk-margin-large"></h1>
          </div>
        </div>
      </div>

      {/* developer section */}
      <div
        class="uni-collection uk-section-large uk-section-medium@m uk-panel uk-overflow uk-padding-large-bottom@m swiper-parent  uk-margin-large"
        data-aos="fade-up"
      >
        <div className="row uk-margin-bottom">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="heading text-center wow fadeInUp">
              <span className="badge badge-success badge-pill">
                <div class="uk-panel uk-text-center">
                  <h1 class="uk-h4 uk-h2@m">Contact the developers</h1>
                </div>
              </span>
              <h2 className="uk-h3 uk-h2@m uk-margin-small uk-margin@m"></h2>
              <p className="mt-16 mb-0"></p>
            </div>
          </div>
        </div>
        <div class="uk-container">
          <div class="uk-grid uk-grid-match uk-child-width-1-2 uk-child-width-1-2@m uk-grid uk-flex-center">

              {/* tini */}

            <div
              className="uk-container uk-text-center"
              id="card-dev"
              
            >
              <div class="uni-collection uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                <div class="uni-collection-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius">
                  <canvas class="uk-visible@m" height="40"></canvas>
                  <canvas class="uk-hidden@m" height="40"></canvas>
                  <div
                    class="uk-cover uk-flex-middle"
                    data-uk-cover
                  >
                 {/*    <img
                      src="/assets/img/LOGOS-STREAMINT.svg"
                      alt="StreaMint"
                      style={{ width: "80%", margin: "auto" }}
                    /> */}
                  </div>
                  <a
                    href="/assets/img/cassi.png"
                    class="uk-position-cover"
                    aria-label="Tini Cassi"
                  ></a>
                </div>
                <div class="uni-collection-content uk-card-xsmall uk-padding-remove-top">
                  <div
                    class="uni-collection-avatar uk-grid uk-flex-center"
                    data-uk-grid
                  >
                    <div>
                      <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                        <div class="uni-user-avatar uk-panel">
                          <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                            <canvas width="180" height="180"></canvas>
                            <img
                              src="/assets/img/cassi.png"
                              alt="Tini Cassi"
                              class="uni-user-avatar-image uk-cover uk-radius-circle"
                              data-uk-cover
                              loading="lazy"
                            />{" "}
                            <a
                              aria-label="Tini Cassi"
                              href="https://linktr.ee/tinicassi"
                              class="uk-position-cover"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 class="uni-collection-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                    <a href="https://linktr.ee/tinicassi" class="uk-link">
                      María Agustina Cassi
                    </a>
                  </h3>
                  <span class="uni-collection-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center">
                    <span>Full Stack Developer</span>
                  </span>
                </div>
              </div>
            </div>
         
                    {/* martin */}
            <div
              className="uk-container uk-text-center"
              id="card-dev"
              
            >
              <div class="uni-collection uk-panel uk-overflow-hidden uk-card uk-card-2xsmall uk-card-border uk-radius uk-radius-large@m uk-text-center uk-box-shadow-hover-medium">
                <div class="uni-collection-cover uk-card-media-top uk-panel uk-overflow-hidden uk-radius">
                  <canvas class="uk-visible@m" height="40"></canvas>
                  <canvas class="uk-hidden@m" height="40"></canvas>
                  <div
                    class="uk-cover uk-flex-middle"
                    data-uk-cover
                  >
                 {/*    <img
                      src="/assets/img/LOGOS-STREAMINT.svg"
                      alt="StreaMint"
                      style={{ width: "80%", margin: "auto" }}
                    /> */}
                  </div>
                  <a
                    href="/assets/img/MartinezRizziMartin.png"
                    class="uk-position-cover"
                    aria-label="Tincho Rizzi"
                  ></a>
                </div>
                <div class="uni-collection-content uk-card-xsmall uk-padding-remove-top">
                  <div
                    class="uni-collection-avatar uk-grid uk-flex-center"
                    data-uk-grid
                  >
                    <div>
                      <div class="uk-panel uk-padding-2xsmall uk-radius-circle uk-background-white dark:uk-background-gray-100">
                        <div class="uni-user-avatar uk-panel">
                          <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                            <canvas width="180" height="180"></canvas>
                            <img
                              src="/assets/img/MartinezRizziMartin.png"
                              alt="Tincho Rizzi"
                              class="uni-user-avatar-image uk-cover uk-radius-circle"
                              data-uk-cover
                              loading="lazy"
                            />{" "}
                            <a
                              aria-label="Tincho Rizzi"
                              href="https://linktr.ee/martinezrizzi"
                              class="uk-position-cover"
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 class="uni-collection-name uk-text-small uk-h6@m uk-margin-xsmall-top uk-margin-remove-bottom">
                    <a href="https://linktr.ee/martinezrizzi" class="uk-link">
                    Martin Martinez Rizzi
                    </a>
                  </h3>
                  <span class="uni-collection-sales uk-text-small uk-text-bold uk-text-muted uk-flex-middle uk-flex-center">
                    <span>Full Stack Developer</span>
                  </span>
                </div>
              </div>
            </div>

        </div>

        <div
          class="uni-features uk-section uk-section-large@m uk-padding-bottom@m uk-panel uk-overflow-hidden uk-margin-large"
          data-aos="fade-up"
        >
          <div class="row uk-margin-bottom">
            <div class="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
              <div class="heading text-center wow fadeInUp">
                <span class="badge badge-success badge-pill">
                  <div class="uk-panel"></div>
                </span>
              </div>
            </div>
          </div>
          <div class="uk-container">
            <div class="uk-panel uk-margin-top uk-margin-medium-top@m">
              <div
                class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid uk-flex-top uk-flex-wrap-top"
                data-uk-grid="masonry: true;"
                style={{ height: "286px" }}
              ></div>
            </div>
          </div>

        </div>
      </div>

      {/* <div
        class="uni-features uk-section uk-section-large@m uk-padding-large-bottom@m uk-panel uk-overflow-hidden uk-margin-large"
        data-aos="fade-up"
      >
        <div class="row uk-margin-bottom">
          <div class="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div class="heading text-center wow fadeInUp">
              <span class="badge badge-success badge-pill">
                <div class="uk-panel"></div>
              </span>
            </div>
          </div>
        </div>
        <div class="uk-container">
          <div class="uk-panel uk-margin-top uk-margin-medium-top@m">
            <div
              class="uk-grid-2xsmall uk-grid-small@m uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid uk-flex-top uk-flex-wrap-top"
              data-uk-grid="masonry: true;"
              style={{ height: "286px" }}
            ></div>
          </div>
        </div>
      </div> */}

      </div>

        </div>


      {/* footer */}
      <footer class="uni-footer uk-section-small uk-section-medium@m uk-border-top uk-margin-large-top">
        <div class="uk-container uk-container-expand">
          <div
            class="uk-grid-2xlarge uk-grid-divider uk-child-width-1-1 uk-grid"
            data-uk-grid
          >
            <div>
              <div class="uk-panel uk-section@m">
                <div class="uk-flex-center uk-flex-middle uk-text-center">
                  <div class="uk-panel uk-flex-column uk-flex-middle">
                    <h1 class="uk-h3 uk-h1@m uk-margin-small"></h1>
                    <p class="uk-text-lead uk-text-muted uk-margin-remove"></p>
                    <div class="uk-panel uk-inline uk-width-xlarge@m uk-margin-top uk-margin-medium-top@m"></div>
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
                  <ul class="uni-social-media uk-subnav uk-subnav-small uk-text-muted uk-margin-small">


                    <li>
                     
                    </li>
                    <li>
                      <a
                        aria-label="youtube-play"
                        href="https://www.youtube.com/channel/UCC4mRhngTPwDDM06IyO8mkA"
                      >
                        <i class="uk-icon-small brand-youtube-play"></i>
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
                          <a href="/" className="uk-text-muted">
                            Terms
                          </a>
                        </li>
                        <li>
                          <a href="/" className="uk-text-muted">
                            Privacy policy
                          </a>
                        </li>
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
   
    
    
    
         </>
  );
};

export default Landing;
