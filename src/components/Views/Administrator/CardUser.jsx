import React, { useState } from "react";
import DeleteUserModal from "../../../commons/Modals/DeleteUserModal";

const CardUser = ({user}) => {

    const [modal, setModal] = useState(false);

    const handleClick=()=>{
        localStorage.setItem('userToDelete',JSON.stringify(user))
        localStorage.setItem("deleteUser", "uk-flex uk-open");
        setModal(true);
      }
    


  return (
    <>


    <tr>
      <td class="uk-text-middle">Information</td>
      <td>
                              <p class="uk-width-expand uk-button uk-button-darkgrey uk-button-alt">
                                {user.name}
                              </p>
      </td>
      <td>
                              <p
                                href="#link"
                                class="uk-width-expand uk-button uk-button-darkgrey uk-button-alt"
                              >
                                {user.lastName}
                              </p>
      </td>
      <td>
                              <p
                                href="#link"
                                class="uk-width-expand uk-button uk-button-darkgrey uk-button-alt"
                              >
                                {user.email}
                              </p>
      </td>
      <td>
                              <p
                                href="#link"
                                class="uk-width-expand uk-button uk-button-darkgrey uk-button-alt"
                              >
                                {user.eventId}
                              </p>
      </td>
      <td className="d-flex">
                              <button
                                onClick={handleClick}
                                type="button"
                                className="uk-width-expand uk-button uk-button-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                Delete
                              </button>
      </td>{" "}
      {modal ? <DeleteUserModal/>:<></>}
    </tr>



    
{/*       <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.eventId}</td>
        <td className="d-flex">
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Delete
          </button>
        </td>
      </tr>
      {modal ? <DeleteUserModal/>:<></>} */}
    </>
  );
};

export default CardUser;
