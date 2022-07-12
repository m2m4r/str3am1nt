import React from "react";
import Logs from "./Logs";

const LogsCard = ({ log, load }) => {
  const day = new Date(log.createdAt);
  const dateParsed = day.toUTCString();
  const action = log.action;
  const actionParsed = action.replace(/([a-z](?=[A-Z]))/g, "$1 ").toUpperCase();

  return (
    <div
      data-name={log.action}
      style={load ? { display: "block" } : { display: "" }}
    >
      <div class="uni-activity-item uk-card uk-card-border uk-card-xsmall uk-card-small@m uk-radius-large">
        <div
          class="uk-grid-xsmall uk-grid@m uk-flex-middle uk-grid"
          data-uk-grid
        >
          <div class="uk-width-auto">
            <div class="uk-panel">
              <div class="uk-panel uk-overflow-hidden uk-radius">
                <canvas width="72" height="72"></canvas>
                <img
                  src="../assets/images/artworks/03.jpg"
                  alt="#24 Midnite"
                  class="uk-cover"
                  data-uk-cover
                  loading="lazy"
                />
              </div>
              <span class="uni-filter-category uk-position-top-left">
                <i class="material-icons uk-icon-2xsmall uk-radius-circle uk-background-tertiary uk-text-white">
                  gavel
                </i>
              </span>
            </div>
          </div>
          <div class="uk-width-expand">
            <div class="uk-panel uk-text-bold uk-text-muted uk-text-small uk-text-medium@m">
              <h6 class="uk-text-small uk-h6@m uk-margin-remove">
                <p>User: {log.email}</p>
              </h6>
              <h6 class="uk-text-small uk-h6@m uk-margin-remove">
                <p>Action: {actionParsed}</p>
              </h6>
              <h6 class="uk-text-small uk-h6@m uk-margin-remove">
                <p>Date: {dateParsed}</p>
              </h6>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsCard;
