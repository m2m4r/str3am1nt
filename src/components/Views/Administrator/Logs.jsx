import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../config/axios";
import LogsCard from "./LogsCard";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const checkRole = () => {
    if (user.roleId === 1) navigate("/home");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const getAllLogs = async () => {
    try {
      const logList = await Axios.get("/logs");
      setLogs(logList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    getAllLogs();
    setLoad(!load);
  };


    useEffect(() => {
      
        getAllLogs();
      }, [load]);


  return (
    <>
      <div class="uni-activity uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-border-top">
        <header class="uni-page-header">
          <div class="uk-container">
            <h1 class="heading uk-h3 uk-h1@m uk-text-center">Dashboard</h1>
          </div>
        </header>
        <div class="uk-margin-top uk-margin-large-top@m">
          <div class="uk-container">
            <div class="uk-panel">
              <div
                class="uni-activity-filters uk-grid-small uk-grid"
                data-uk-grid
                data-uk-filter="target: .uni-activity-filter; animation: delayed-fade;"
              >
                <div class="uni-activity-filter-wrap uk-width-1-3@m uk-visible@m">
                  <div
                    class="uk-panel uk-card uk-card-border uk-card-small uk-radius"
                    data-uk-sticky="offset: 100; bottom: true; media: 720"
                  >
                    <div
                      class="uk-grid-xsmall uk-flex-middle uk-grid"
                      data-uk-grid
                    >
                      <div>
                        <h5 class="uk-h6 uk-h5@m uk-margin-remove">Select filter</h5>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="uk-button uk-button-xsmall uk-button-primary uk-button-ghost"
                          onClick={handleClick}
                        >
                          Reset filter
                        </button>
                      </div>
                    </div>
                    <div class="uk-margin-top">
                      <div class="uk-grid-2xsmall uk-grid" data-uk-grid>
                        <div data-uk-filter-control="[data-name='createEvent']">
                          <a
                            class="uk-button uk-button-default uk-button-xsmall uk-button-outline"
                            href="#listings"
                          >
                            <span>Create</span>
                          </a>
                        </div>
                        <div data-uk-filter-control="[data-name='inviteUser']">
                          <a
                            class="uk-button uk-button-default uk-button-xsmall uk-button-outline"
                            href="#sales"
                          >
                            <span>Invite</span>
                          </a>
                        </div>
                        <div data-uk-filter-control="[data-name='editEvent']">
                          <a
                            class="uk-button uk-button-default uk-button-xsmall uk-button-outline"
                            href="#purchases"
                          >
                            <span>Edit</span>
                          </a>
                        </div>
                        <div data-uk-filter-control="[data-name='deleteEvent']">
                          <a
                            class="uk-button uk-button-default uk-button-xsmall uk-button-outline"
                            href="#burns"
                          >
                            <span>Delete</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="uk-width-expand@m uk-flex-first@m">
                  <div class="uk-panel uk-width-1-1">
                    <div
                      id="activities-list-container"
                      class="uni-activity-filter uk-grid-xsmall uk-child-width-1-1 uk-grid"
                      data-uk-grid
                    >
                      {logs.length ?
                        logs.map((log) => (
                          <LogsCard key={logs.id} log={log} load={load} />
                        ))
                        :
                        <p class="heading uk-h6 uk-h6@m uk-text-margin">No activity registered yet</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="uk-height-2xsmall" hidden></div>
    </>
  );
};

export default Logs;
