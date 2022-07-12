import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
  onChildChanged,
} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import Picker from "emoji-picker-react";
import "../assets/styles/chat.css";

const firebaseConfig = {
  apiKey: "AIzaSyChblLN2L_1vL75QXQlBdzlnjmFreuDVVA",
  authDomain: "tonic3-6cbc8.firebaseapp.com",
  databaseURL: "https://tonic3-6cbc8-default-rtdb.firebaseio.com",
  projectId: "tonic3-6cbc8",
  storageBucket: "tonic3-6cbc8.appspot.com",
  messagingSenderId: "291368280511",
  appId: "1:291368280511:web:f270480e6a0a918f2b810a",
  measurementId: "G-KNVRT9JCE5",
};

const user = JSON.parse(localStorage.getItem("user"));
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const analytics = getAnalytics(app);

const color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
const img = "../assets/img/live.png";

function writeUserData(
  eventId,
  userId,
  name,
  email,
  message,
  timestamp,
  color
) {
  const auth = getAuth();
  const db = getDatabase();
  set(ref(db, `1/messages/${timestamp}`), {
    name: name,
    text: message,
    color: color,
  });
}

onChildChanged(ref(db, "1/messages"), (data) => {
  document.getElementById("messages").innerHTML +=
    `<div class= 'uk-text-muted uk-padding-left'><i class="fa fa-user" aria-hidden="true"></i>  <span style=color:${
      data.val().color
    }>${data.val().name}</span> : ` + data.val().text;
});

const ChatRoom = ({ eventId }) => {
  const dummy = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState({});
  const [emojiToggle, setEmojiToggle] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const timestamp = Date.now();
    writeUserData(
      eventId,
      user.credential.uid,
      user.name,
      user.email,
      message,
      timestamp,
      color
    );

    setMessage("");
  };

  const handleClose = (e)=>{
    e.preventDefault();
    if (emojiToggle){
      setChosenEmoji("")
      setEmojiToggle(false);
    }



  }

  const handleButton = (e) => {
    e.preventDefault();
    if (emojiToggle) {
      setMessage(message + chosenEmoji.emoji);
      setEmojiToggle(false);
    } else {
      setEmojiToggle(true);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    
    if(emojiObject!==null){

      setChosenEmoji(emojiObject.emoji);
      console.log(emojiObject.emoji)
      console.log(message)
      setMessage(message + emojiObject.emoji);
      console.log(message)
      setEmojiToggle(false);

    }
  };

  useEffect(() => {}, [emojiToggle]);

  return (
    <>
      <div
        className="p-4 rounded-3 uk-card-border uk-padding-left-small"
        style={{
          overflow: "auto",
          height: "59vh",
          backgroundColor: "BLACK",
        }}
        id="messages"
      ></div>
      <form
        onSubmit={onSubmit}
        className="uk-form-stacked uk-grid-xsmall uk-grid-small@m uk-child-width-1-1 uk-card-border "
      >
        <div className="uk-panel uk-padding-top ">
          <div
            className="uk-panel uk-text-primary uk-box-shadow-medium uk-radius-small"
            style={{ "background-color": "white" }}
          >
            <div className="uk-panel uk-background-darkgrey">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="uk-input uk-text  "
                placeholder="put your message here"
                aria-label="put your message here"
                aria-describedby="button-addon2"
              />
            </div>
          </div>
          <div
            className="uk-flex-between uk-flex-middle"
            style={{ "background-color": "black" }}
          >
            <div className="uk-flex uk-flex-middle uk-first-column">
              {emojiToggle ? (
                <>
                  <Picker
                    onEmojiClick={onEmojiClick}
                    disableSearchBar={true}
                    groupVisibility={{
                      flags: false,
                      animals_nature: false,
                      travel_places: false,
                      activities: false,
                      symbols: false,
                      objects: false,
                      food_drink: false,
                    }}
                    className={"uk-panel"}
                    pickerStyle={{
                      position: "absolute",
                      bottom: "4em",
                      right: "8em",
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="white"
                    class="bi bi-x"
                    viewBox="0 0 16 16"
                    onClick={handleClose}
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </>
              ) : (
                <span onClick={handleButton} style={{ marginLeft: "1em" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    class="bi bi-emoji-smile"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>
                </span>
              )}
            </div>
            <button
              className="uk-position-absolute-top-right uk-button uk-button-small uk-button-quaternary"
              style={{
                margin: "4px",
                borderRadius: "12px",
                "background-color": "black",
              }}
              type="submit"
              id="button-addon2"
              disabled={message === ""}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChatRoom;
