import React, { useEffect, useState } from "react";
import Axios from "../config/axios";
import "../assets/styles/event.css";
import { useNavigate } from "react-router-dom";
import CardUser from "./Views/Administrator/CardUser";
import DeleteUserModal from "../commons/Modals/DeleteUserModal";
import { use } from "passport";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState({
    id: "",
    email: "",
    fullName: "",
  });

  const navigate = useNavigate();
  const checkRole = () => {
    if (user.roleId === 1) navigate("/home");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const getAllUsers = async () => {
    try {
      const userList = await Axios.get("/user/list");

      setUsers(userList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    localStorage.setItem("userToDelete", JSON.stringify(user));
    localStorage.setItem("deleteUser", "uk-flex uk-open");
    setModal(true);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ position: "static" }}>
      <div
        className="uni-activity uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-border-top"
        style={{ height: "50vh" }}
      >
        <div className="uk-container uk-margin-top">
          <div className="">
            <h2 class="heading uk-h3 uk-h1@m uk-text-center">Users</h2>
            {/* <div>
            <Link className="btn btn-warning m-3" to={`/administrator/logs`}>
              Dashboard
            </Link>
            <Link className="btn btn-warning" to={`/administrator/events`}>
              Events
            </Link>
          </div> */}
          </div>
          <div class="uk-width-expand">
            <div class="uk-panel">
              <table class="uk-table uk-table-small uk-table-justify uk-table-divider uk-text-meta">
                <tbody>
                  <tr class="uk-text-center">
                    <td class="uk-width-xsmall"></td>
                    <td>Name</td>
                    <td>Last Name</td>
                    <td>Email</td>
                    <td>Related Events</td>
                    <td>Actions</td>
                  </tr>
                  {users.length &&
                    users.map((user) => (
                      <>
                        <CardUser user={user}/>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
