import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/landing.css"


const   Demo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userLogged, setUser] = useState(false);
  const location = useLocation();

  const route = () => {
    console.log(location.pathname);
    return  "/";
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
                    <div class="uk-navbar-item">{
                        <Link className="btn btn-outline-white" to={route()}>
                          Home
                        </Link>}
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
                        Invite your guest, stream your private event and make it memorable.<br/>
                        Watch our demos.
                      </h1>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}

        <div
        class="uni-features uk-section uk-section-large@m uk-padding-large-bottom@m uk-panel uk-overflow-hidden "
        data-aos="fade-up"
      >
       
        <div class="uk-container">
          <div className="uk-text-center">
            <h1 class="uk-h3 uk-h1@m uk-margin-small uk-margin@m" >See our features in action</h1>
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

    

        {/*Admin view*/}

          <div class="uk-container" data-aos="fade-up">
            <div className="uk-text-center">
              <h1 class="uk-h3 uk-h1@m uk-margin-small uk-margin@m">Admin features  </h1>
            </div>
          </div>
          <div class="uni-features uk-section uk-section-large@m uk-padding-large-bottom@m uk-panel uk-overflow uk-margin-large" data-aos="fade-up">
            <div className="uk-panel" >
              <div className="uk-container">
                <div className="uk-card-border ">
                  <div style={{ "margin-right": "1em",  "margin-left": "1em", backgroundColor: "black", paddingTop: "0px", paddingBottom: "0px", height:"75vh"}}>
                    <iframe className={`uk-width-expand`} width="100%"  height="100%" src="https://www.youtube.com/embed/E70y-bP0RqU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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


        {/* User view*/}
        <div class="uk-container" data-aos="fade-up">
            <div className="uk-text-center">
              <h1 class="uk-h3 uk-h1@m uk-margin-small uk-margin@m">User features  </h1>
            </div>
          </div>
          <div class="uni-features uk-section uk-section-large@m uk-padding-large-bottom@m uk-panel uk-overflow uk-margin-large" data-aos="fade-up">
            <div className="uk-panel" >
              <div className="uk-container">
                <div className="uk-card-border ">
                  <div style={{ "margin-right": "1em",  "margin-left": "1em", backgroundColor: "black", paddingTop: "0px", paddingBottom: "0px", height:"75vh"}}>
                    <iframe className={`uk-width-expand`} width="100%"  height="100%" src="https://www.youtube.com/embed/viYm1k8BR_s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>   
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

export default Demo;
