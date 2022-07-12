import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../config/axios";
import { actionsToLog } from "../../enum/enum";

const DeleteModal = ({ event, user }) => {
  const path = useLocation();
  let deleteModal = localStorage.getItem("delete");
  const [modal, setModal] = useState(deleteModal);
  const navigate = useNavigate();

  const deleteEvent = async () => {
    const eventData = event;
    try {
      const listEmail = await Axios.get(`/user/listEmail/${eventData.id}`);
      const destroyEvent = await Axios.delete(
        `/event/deleteEvent/${eventData.id}`
      );
      await Axios.post(
        `/nodemailer/deleteNotification`,
        listEmail
      );
      if (!destroyEvent.data.error) {
        await Axios.post("/logs", {
          userId: user.id,
          email: user.email,
          action: actionsToLog.deleteEvent,
          payload: [{ id: event.id }, { title: event.title }],
        });
      }
      localStorage.setItem("delete", false);
      setModal(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    localStorage.setItem("delete", false);
    setModal(false);
    navigate(path.pathname);
  };

  useEffect(() => {
    setModal(deleteModal);
  }, [modal]);

  return (
    <div id="send_report" className={`uk-modal ${deleteModal}`} data-uk-modal>
      <div class="uk-modal-dialog uk-card-xsmall uk-card-small@m uk-margin-auto-vertical uk-width-medium@m uk-radius-large">
        <button
          aria-label="Close"
          onClick={handleCancel}
          class="uk-modal-close-outside"
          type="button"
          data-uk-close
        ></button>
        <div class="uk-panel uk-flex-center uk-flex-middle uk-height-1-1">
          <ul
            hidden
            class="uk-subnav uk-subnav-pill"
            data-uk-switcher="animation: uk-animation-fade; duration: 150;"
          >
            <li>
              <a href="#report">Report</a>
            </li>
            <li>
              <a href="#report_feedback">Feedback</a>
            </li>
          </ul>
          <ul class="uk-switcher">
            <li>
              <div class="uk-panel">
                <h3 class="uk-h4">
                  Are you sure you want to delete this event?
                </h3>
                <div
                  class="uk-form-stack uk-grid-xsmall uk-child-width-1-1 uk-grid"
                  data-uk-grid
                >
                  <div class="uk-form-group">
                    <button
                      type="button"
                      onClick={deleteEvent}
                      class="uk-button uk-button-medium uk-button-danger uk-width-1-1"
                      data-uk-switcher-item="next"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      class="uk-button uk-button-medium uk-button-default uk-button-alt uk-width-1-1 uk-margin-xsmall-top uk-modal-close"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="uk-panel uk-text-center uk-flex-column uk-flex-middle">
                <i class="uk-icon-large uk-text-success material-icons">
                  check_circle
                </i>
                <p class="uk-text-lead">Event deleted succesfully</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
