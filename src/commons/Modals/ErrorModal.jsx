import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const ErrorModal = () => {
    const location= useLocation()
 
    const navigate = useNavigate();
  
      const handleConfirm = () => {
          navigate(location.pathname)
          window.location.reload()
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
              <div class="uk-panel uk-flex-column uk-flex-middle ">
                <h1 class="uk-margin-xsmall ">
                <i class="uk-icon-large uk-text-unsucessful material-icons">
                      error_circle
                   </i>
                </h1>
                <h3 class="uk-h6 uk-margin-top-xsmall">
                Something went wrong.
                </h3>
              </div>
              </li>
              <li>
  
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

export default ErrorModal