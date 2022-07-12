import React from "react";

const ListUser = ({ user }) => {
  return (
    <li class="uk-card uk-card-xsmall uk-card-default uk-radius uk-box-shadow-2xsmall uk-background-gray-10 dark:uk-background-white-5">
      <div class="uk-grid-xsmall uk-grid" data-uk-grid>
        <div class="uk-width-auto">
          <div>
            <div class="uni-user-avatar uk-panel">
              <div class="uk-panel uk-overflow-hidden uk-radius-circle"></div>
            </div>
          </div>
        </div>
        <div class="uk-width-expand">
          <div
            class="uk-panel uk-grid-small uk-grid uk-flex-between uk-child-width-auto"
            data-uk-grid
            style={{ lineHeight: "1" }}
          >
            <div>
              <p class="uk-margin-2xsmall">{user.email}</p>
              <span class="uk-text-medium@m">
                User created at {user.createdAt}
              </span>
            </div>
            <div class="uk-width-auto uk-width-1-4@m">
              <div class="uk-panel">
                <h4 class="uk-text-small uk-h7@m uk-margin-remove-bottom">
                  {user.name} {user.lastName}
                </h4>
                <span class="uk-text-medium@m">
                  {user.isLoggedIn ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListUser;
