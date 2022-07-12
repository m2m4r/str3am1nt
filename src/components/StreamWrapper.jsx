import React, { useEffect, useState } from "react";
import { ChatRoom } from ".";
import "../assets/styles/chat.css";
import Axios from "../config/axios.js";
const QRCode = require("qrcode");

const StreamWrapper = ({ className, url }) => {
  const event = JSON.parse(localStorage.getItem("event"));

  const [hideChat, setHideChat] = useState(true);
  const [chatClass, setChatClass] = useState(
    "uk-grid-collapse uk-child-width-expand uk-grid-match uk-grid"
  );
  const [userPOAP, setUserPOAP] = useState();

  const handleClick = () => {
    console.log(hideChat);

    if (!hideChat) {
      setChatClass(
        "uk-grid-collapse uk-child-width-expand uk-grid-match uk-grid"
      );
    } else {
      setChatClass("uk-grid-collapse uk-child-width-expand uk-grid-match chat");
    }
    setHideChat(!hideChat);

    console.log(chatClass);
  };

  useEffect(() => {}, [hideChat]);

  const getPOAP = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      const getUserPOAP = await Axios.get(`/user/getPOAP/${user.email}`);
      const linkPOAP = await QRCode.toDataURL(getUserPOAP.data);
      setUserPOAP(linkPOAP);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPOAP();
  }, []);

  return (
    <>
      <div className="wrap uk-margin-top-small uk-margin-left" style={{ "background-color": "black" }}>
        <div className="uni-coming-soon uk-panel uk-overflow-hidden">
          <div
            className="uk-grid-collapse uk-child-width-expand uk-grid-match uk-grid"
            style={{ height: "calc(90vh)" }}
          >
            <div className="uk-flex-first@m" >
              <div className="uk-flex-column uk-card-border ">
                <div style={{ "margin-right": "1em",  "margin-left": "1em", backgroundColor: "black", paddingTop: "0px", paddingBottom: "0px", height:"75vh"}}>

                  <iframe className={`uk-width-expand`} width="100%"  height="100%" src={event.url}title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style={{"margin-right": "1em",  "margin-left": "1em", backgroundColor: "black", paddingTop: "0px", paddingBottom: "0px", height:"10vh"}}>
                <h4 class="heading uk-h4  uk-text-left uk-text-white uk-margin-top">{event.title}</h4>

                </div>

              </div>
            
              
            </div>   
            
            <div
              className={hideChat ? "uk-width-1-4@m" : "uk-width-1-12@m"}
              style={{ float: "left" }}
            >
              {hideChat ? (
                <div
                  className="uk-panel uk-card-border "
                  style={{ "margin-right": "1em" }}
                >
                  <div
                    className="uk-flex-column uk-flex-center uk-margin-auto"
                    style={{ padding: "0.5em" }}
                  >
                    <div className=" chat-top uk-card-border">
                      <div className="one">
                        <span className="hide-chat" onClick={handleClick}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            class="bi bi-caret-right-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z" />
                          </svg>
                        </span>
                      </div>
                      <div className="two">
                        <img src="../assets/img/live.png" alt="s" />
                        <h2 className="uk-h6 uk-text-bold" id="chat-title">
                          Live Chat
                        </h2>
                      </div>
                    </div>
                    <ChatRoom eventId={event.eventId} />
                    <div className="uk-panel uk-flex-column uk-text-center ">
                      <p style={{margin:'0px'}}>Claim your POAP</p>
                      
                      <img
                        style={{ height: "6rem" }}
                        src={userPOAP}
                        alt="POAP"
                        class="CToWUd uk-container"
                      ></img>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="uk-panel uk-card-border "
                    style={{ "margin-top": "0.5em", "margin-right": "1em" }}
                  >
                    <div
                      className="uk-flex-column uk-flex-center uk-margin-auto"
                      style={{ padding: "0.5em" }}
                    >
                      <div className=" flex-middle">
                        <div className="one">
                          <span className="hide-chat" onClick={handleClick}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="white"
                              class="bi bi-caret-right-square-fill"
                              viewBox="0 0 16 16"
                              style={{ transform: "rotate(180deg)" }}
                            >
                              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StreamWrapper;
