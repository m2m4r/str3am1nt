import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {

    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate("/login")
    }

    

  return (
    <div id="send_report" className={`uk-modal uk-flex uk-open`} data-uk-modal>
      <div class="uk-modal-dialog uk-card-xsmall uk-card-small@m uk-margin-auto-vertical uk-width-medium@m uk-radius-large">
        <button
          aria-label="Close"
          onClick={handleConfirm}
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
                <h1 class="uk-h4">
                Congratulations!
                </h1>
                <h3 class="uk-h6">
                You have been successfully registered. Please verify your email to obtain your access token.
                </h3>
                <div
                  class="uk-form-stack uk-grid-xsmall uk-child-width-1-1 uk-grid"
                  data-uk-grid
                >
                  <div class="uk-form-group">
                    <button
                      type="button"
                      class="uk-button uk-button-primary uk-button-large@m uk-width-expand"
                      data-uk-switcher-item="next"
                    >
                      Continue
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
                <p class="uk-text-lead">Check your Inbox</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
