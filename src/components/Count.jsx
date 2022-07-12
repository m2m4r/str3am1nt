import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import "../assets/styles/count.css";
import Axios from "../config/axios";
import StreamWrapper from "./StreamWrapper";

const renderer = (
  { days, hours, minutes, seconds, completed },
  handleLogout
) => {
  if (completed) {
    return <StreamWrapper />;
  } else {
    // Render a countdown
    return (
      <>
        <div className="wrap">
          <div className="uni-coming-soon uk-panel uk-overflow-hidden">
            <div
              className="uk-grid-collapse uk-child-width-expand uk-grid-match uk-grid"
              data-uk-grid
            >
              <div className="uk-width-1-3@m">
                <div className="uk-panel uk-overflow-hidden">
                  <canvas
                    className="uk-visible@m"
                    data-uk-height-viewport=""
                  ></canvas>
                  <canvas className="uk-hidden@m" height="200"></canvas>
                  <img
                    src="./assets/images/artworks/festivaimage.jpeg"
                    alt="img"
                    className="uk-cover"
                    data-uk-cover
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="uk-flex-first@m">
                <div className="uk-panel uk-width-xlarge@m uk-margin-auto uk-section uk-flex-middle">
                  <div className="uk-card uk-card-small">
                    <div
                      className="uk-grid-small uk-grid-medium@m uk-child-width-1-1 uk-flex-center uk-text-center uk-grid"
                      data-uk-grid
                    >
                      <div>
                        <h1 className="uk-h3 uk-heading-hero@m">
                          Coming Soon!
                        </h1>
                      </div>
                      <div>
                        <div
                          className="uk-grid-collapse uk-child-width-expand uk-flex-center uk-flex-middle uk-grid"
                          data-uk-grid
                        >
                          <div>
                            <div className="uk-h2 uk-heading-hero@m uk-countdown-days uk-margin-remove">
                              {days}
                            </div>
                            <div className="uk-countdown-label uk-margin-xsmall uk-text-meta uk-text-center uk-visible@s">
                              Days
                            </div>
                          </div>
                          <div className="uk-countdown-separator uk-text-2xlarge@m">
                            :
                          </div>
                          <div>
                            <div className="uk-h2 uk-heading-hero@m uk-countdown-hours uk-margin-remove">
                              {hours}
                            </div>
                            <div className="uk-countdown-label uk-margin-xsmall uk-text-meta uk-text-center uk-visible@s">
                              Hours
                            </div>
                          </div>
                          <div className="uk-countdown-separator uk-text-2xlarge@m">
                            :
                          </div>
                          <div>
                            <div className="uk-h2 uk-heading-hero@m uk-countdown-minutes uk-margin-remove">
                              {minutes}
                            </div>
                            <div className="uk-countdown-label uk-margin-xsmall uk-text-meta uk-text-center uk-visible@s">
                              Minutes
                            </div>
                          </div>
                          <div className="uk-countdown-separator uk-text-2xlarge@m">
                            :
                          </div>
                          <div>
                            <div className="uk-h2 uk-heading-hero@m uk-countdown-seconds uk-margin-remove">
                              {seconds}
                            </div>
                            <div className="uk-countdown-label uk-margin-xsmall uk-text-meta uk-text-center uk-visible@s">
                              Seconds
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
        </div>
      </>
    );
  }
};
const Count = ({ eventTitle }) => {
  const [eventCount, setEvent] = useState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userLogged = JSON.parse(localStorage.getItem("user"));
    await Axios.post("user/logout", userLogged);
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const event = JSON.parse(localStorage.getItem("event"));
    setEvent(event.initialDate);
  }, [eventCount]);

  return (
    <>
      <div
        className="uni-header-navbar uk-flex-between uk-transparent uk-margin-left-medium"
        data-uk-sticky="top: 60; animation: uk-animation-slide-top"
        style={{
          backgroundColor: "black",
          marginTop: "0.5em",
          marginRight: "1em",
          marginBottom: "1em",
        }}
      >
        <a
                          class="uk-logo uk-navbar-item uk-h4 uk-h3@m uk-margin-remove uk-margin-left-small"
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
                              width="160"
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
        <button
          type="button"
          class="uk-button uk-button-primary uk-button-small"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      {eventCount > 0 ? (
        <Countdown date={eventCount} renderer={renderer} />
      ) : (
        <> </>
      )}
    </>
  );
};

export default Count;
