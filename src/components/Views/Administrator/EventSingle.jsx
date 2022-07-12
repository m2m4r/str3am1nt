import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "../../../config/axios";
import { CreateEvent } from "./Admin";
import Invite from "./Invite";
import ListUser from "./ListUser";
import DeleteModal from "../../../commons/Modals/DeleteModal";

const EventSingle = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [users, setUsers] = useState({});
  const [modal, setModal] = useState({});
  const [option, setOption] = useState("invite");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  location.state = event;

  const checkRole = () => {
    if (user.roleId === 1) navigate("/home");
  };
  const getSingleEvent = async () => {
    try {
      const event = await Axios.get(`/event/eventAndUsers/${title}`);
      setEvent(event.data);
      setUsers(event.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const updatePage = (option) => {
    setOption(option);
  };
  const handleInvite = async () => {
    setOption("invite");
  };
  const handleEdit = async () => {
    setOption("edit");
  };
  const handleDelete = async () => {
    localStorage.setItem("delete", "uk-flex uk-open");
    setModal("uk-flex uk-open");
    navigate(location.pathname);
  };

  useEffect(() => {
    
    getSingleEvent();
  }, [modal]);

  return (
    <>
      <DeleteModal event={event} user={user} />
      <div class="uni-artwork">
        <div class="uni-artwork-media uk-section-xsmall uk-section-medium@m uk-background-gray-10 dark:uk-background-white-5">
          <div class="uk-container uk-container-large">
            <div class="uk-panel" data-uk-lightbox="toggle: .zoom-out">
              <div class="uk-panel uk-flex-center uk-flex-top">
                <div class="featured-image uk-panel uk-overflow-hidden uk-radius-large">
                  <canvas width="300" height="300"></canvas>
                  <img
                    src="http://localhost:3000/assets/images/festival-image2.jpeg"
                    alt="Metaverse Game"
                    class="uk-cover"
                    data-uk-cover
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-section uk-section-medium@m">
          <div class="uk-container uk-container-large">
            <div
              class="uk-grid-small uk-grid-2xlarge@m uk-grid-match uk-grid"
              data-uk-grid
            >
              {/* left side */}

              <div class="uk-width-expand">
                <div className="uk-panel">
                  <div
                    class="uk-grid-2xsmall uk-grid-row-small uk-grid-column-2xlarge@m uk-child-width-1-2 uk-child-width-auto@m uk-grid uk-flex-middle uk-flex-center"
                    data-uk-grid
                  >
                    <div>
                      <button
                        type="button"
                        class="uk-button uk-button-medium uk-button-primary uk-width-1-1"
                        onClick={handleInvite}
                      >
                        {" "}
                        Invite
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="uk-button uk-button-medium uk-button-primary uk-width-1-1"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="uk-button uk-button-medium uk-button-primary uk-width-1-1"
                        onClick={handleDelete}
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div class="uk-panel uk-text-large@m  ">
                  {option === "edit" ? (
                    <CreateEvent state={event} action={option} />
                  ) : (
                    <></>
                  )}
                  {option === "invite" ? (
                    <Invite state={event} action={option} update={updatePage} />
                  ) : (
                    <></>
                  )}
                  {option === "single" ? (
                    <Invite state={event} action={option} update={updatePage} />
                  ) : (
                    <></>
                  )}
                  {option === "multiples" ? (
                    <Invite state={event} action={option} update={updatePage} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* right side */}

              <div class="uk-width-2xlarge@m">
                <div class="uk-panel">
                  <h2 class="uk-h2 uk-h2@m uk-margin-xsmall-bottom uk-margin-bottom@m">
                    {event.title}
                  </h2>
                  <div
                    class="uk-grid-2xsmall uk-grid-row-small uk-grid-column-2xlarge@m uk-child-width-1-2 uk-child-width-auto@m uk-grid"
                    data-uk-grid
                  >
                    <div>
                      <div class="uk-panel">
                        <h5 class="uk-h6 uk-h5@m uk-margin-xsmall-bottom uk-margin-bottom@m">
                          Attendees
                        </h5>
                        <h4 class="uk-h4 uk-h2@m uk-margin-remove">
                          {users.length}
                        </h4>
                      </div>
                    </div>
                    <div>
                      <div class="uk-panel">
                        <h5 class="uk-h6 uk-h5@m uk-margin-xsmall-bottom uk-margin-bottom@m">
                          Event starts in
                        </h5>
                        <div
                          class="uk-countdown uk-grid-2xsmall uk-grid-xsmall@m uk-child-width-auto uk-text-bold uk-text-gray-100 dark:uk-text-white uk-grid"
                          data-uk-grid
                          data-uk-countdown={`date: ${event.initialDate}`}
                          style={{ lineHeight: "1" }}
                        >
                          <div>
                            <div class="uk-countdown-days uk-h3 uk-h2@m uk-margin-2xsmall"></div>
                            <div class="uk-countdown-label uk-text-small uk-text-muted">
                              Days
                            </div>
                          </div>
                          <div>
                            <div class="uk-countdown-hours uk-h3 uk-h2@m uk-margin-2xsmall"></div>
                            <div class="uk-countdown-label uk-text-small uk-text-muted">
                              Hours
                            </div>
                          </div>
                          <div>
                            <div class="uk-countdown-minutes uk-h3 uk-h2@m uk-margin-2xsmall"></div>
                            <div class="uk-countdown-label uk-text-small uk-text-muted">
                              Mins
                            </div>
                          </div>
                          <div>
                            <div class="uk-countdown-seconds uk-h3 uk-h2@m uk-margin-2xsmall"></div>
                            <div class="uk-countdown-label uk-text-small uk-text-muted">
                              Sec
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="uk-margin-medium uk-margin-large@m"></hr>
                  <ul
                    class="uk-subnav uk-subnav-small uk-subnav-opacity uk-margin-small-bottom"
                    data-uk-switcher="connect: .uni-switcher-bids; animation: uk-animation-fade;"
                  >
                    <li class="uk-h6 uk-h5@m">Users invited</li>
                  </ul>
                  <ul
                    class="uni-switcher-bids uk-switcher uk-text-bold uk-text-small uk-text-large@m uk-text-muted"
                    style={{ maxHeight: "355px" }}
                  >
                    <li>
                      <div class="uk-panel tab-overflow">
                        <ul
                          class="uk-list uk-list-small"
                          data-uk-overflow-auto="selContainer: .uk-switcher; selContent: .tab-overflow"
                          style={{ padding: " 4px 4px 16px" }}
                        >
                          {/* aca lista de usuarios */}

                          {users.length &&
                            users.map((user) => (
                              <ListUser key={event.id} user={user} />
                            ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventSingle;
