import React from "react";
import { Link } from "react-router-dom";

const CardEvent = ({ event }) => {
  const deleteEvent = async () => {
    localStorage.setItem("delete", "uk-flex uk-open");
    localStorage.setItem("eventToDelete", JSON.stringify(event));
    const eventToDelete = JSON.parse(localStorage.getItem("eventToDelete"));
  };

  return (
    <>
      <div>
        <div class="uni-artwork uk-card uk-card-xsmall uk-card-border uk-overflow-hidden uk-radius uk-radius-large@m uk-box-shadow-hover-medium uk-visible-toggle uk-transition-toggle">
          <div class="uni-artwork-header uk-panel">
            <div
              class="uk-grid uk-grid-xsmall uk-flex-middle uk-flex-between uk-text-small uk-text-bold"
              data-uk-grid
            >
              <div>
                <div class="uk-text-bold">
                  <div
                    class="uni-user uk-flex-middle uk-grid-2xsmall uk-grid"
                    data-uk-grid
                  >
                    <div class="uk-width-auto">
                      <div class="uni-user-avatar uk-panel">
                        <div class="uk-panel uk-overflow-hidden uk-radius-circle">
                          <canvas width="32" height="32"></canvas>
                          <img
                            src="../assets/images/users/01.gif"
                            alt="TheSalvare"
                            class="uni-user-avatar-image uk-cover uk-radius-circle"
                            data-uk-cover
                            loading="lazy"
                          />{" "}
                          <Link
                            aria-label="TheSalvare"
                            to={`administrator/event/${event.title}`}
                            class="uk-position-cover"
                          ></Link>
                        </div>
                        <i class="uni-user-verified material-icons uk-radius-circle uk-background-white uk-text-info dark:uk-background-gray-100 uk-icon-3xsmall">
                          check_circle
                        </i>
                      </div>
                    </div>
                    <div class="uk-visible@m">
                      <div class="uni-user-link uk-link-reset">
                      {event.title}
                        {/* <Link
                          class="uni-user-link uk-link-reset"
                          to={`administrator/event/${event.title}`}
                        >
                          {event.title}
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="uk-button uk-button-2xsmall uk-button-icon uk-button-default uk-button-ghost uk-radius-circle"
                >
                  <i class="uk-icon-xsmall material-icons">more_horizontal</i>
                </button>
                <div
                  class="uk-dropdown-minimal uk-text-bold uk-dropdown"
                  data-uk-dropdown="mode: click"
                >
                  <ul class="uk-nav uk-dropdown-nav">
                    <li>
                      <Link
                        to={"/administrator/update"}
                        state={event}
                        data-uk-toggle
                      >
                        Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/administrator/event/${event.title}`}
                        data-uk-toggle
                      >
                        Invite
                      </Link>
                    </li>
                    <li class="uk-nav-divider"></li>
                    <li>
                      <a
                        href="#send_report"
                        onClick={deleteEvent}
                        class="uk-text-danger"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            class="uni-artwork-featured-image uk-panel uk-overflow-hidden uk-flex-middle uk-flex-center uk-height-medium@m"
            style={{ margin: "16px 0" }}
          >
            <div class="uk-panel uk-image-middle">
              <img
                src="../assets/images/artworks/07.gif"
                alt=""
                class="uk-radius"
                loading="lazy"
              />
              <Link
                to={`/administrator/event/${event.title}`}
                class="uk-position-cover"
                aria-label="Metaverse Game"
              ></Link>
            </div>
            <div class="uk-label uk-label-primary uk-background-gradient uk-position-bottom-left uk-font-mono">
              <div
                class="uk-grid-gallery uk-child-width-auto uk-text-bold uk-grid"
                data-uk-grid
                data-uk-countdown={`date: ${event.initialDate}`}
              >
                <div class="uk-countdown-days"></div>
                <div class="sep">:</div>
                <div class="uk-countdown-hours"></div>
                <div class="sep">:</div>
                <div class="uk-countdown-minutes"></div>
                <div class="sep">:</div>
                <div class="uk-countdown-seconds"></div>
              </div>
            </div>
          </div>

          <div class="uni-artwork-content uk-panel">
            <h2 class="uk-h6 uk-h5@m uk-margin-2xsmall">
              <Link
                class="uk-link-reset"
                to={`/administrator/event/${event.title}`}
              >
                {event.title}
              </Link>
              <span class="uk-text-meta uk-text-bold uk-text-middle uk-margin-2xsmall-left uk-visible@m"></span>
            </h2>
            <span class="uk-text-bold uk-text-xsmall uk-text-muted uk-display-block">
              Usuarios invitados
            </span>
            <span class="uk-text-bold uk-text-gradient">{event.users}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardEvent;
