import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../config/axios";
import { actionsToLog } from "../../enum/enum";

const DeleteUserModal = ({  user }) => {
  const path = useLocation();
  const userLog = localStorage.getItem("user")
  let deleteModal = localStorage.getItem("deleteUser");
  const [modal, setModal] = useState(deleteModal);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const userList = await Axios.get("/user/list");
      setUsers(userList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const userToDelete = JSON.parse(localStorage.getItem("userToDelete"));
      console.log(userToDelete)
      const destroyUser = await Axios.delete(`/user/delete/${userToDelete.id}`);
      if (!destroyUser.data.error) {
        getAllUsers();
        
        await Axios.post("/logs", {
          userId: userLog.id,
          email: userLog.email,
          action: actionsToLog.deleteUser,
          payload: [{ id: userToDelete.id }, { email: userToDelete.email }],
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    localStorage.setItem("deleteUser", false);
    setModal(false);
    window.location.reload()
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
                  Are you sure you want to delete this user?
                </h3>
                <div
                  class="uk-form-stack uk-grid-xsmall uk-child-width-1-1 uk-grid"
                  data-uk-grid
                >
                  <div class="uk-form-group">
                    <button
                      type="button"
                      onClick={deleteUser}
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

export default DeleteUserModal;
