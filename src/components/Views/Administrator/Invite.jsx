import { async } from "@firebase/util";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Axios from "../../../config/axios";
import { actionsToLog } from "../../../enum/enum";
import { TailSpin } from "react-loader-spinner";
import EmailModal from "../../../commons/Modals/EmailModal";
import ErrorModal from "../../../commons/Modals/ErrorModal";

const Invite = ({ action, update }) => {
  const [invites, setInvites] = useState();
  const location = useLocation();

  const handleSingle = () => {
    update("single");
    setInvites("single");
  };
  const handleMultiples = () => {
    update("multiples");
    setInvites("multiples");
  };
  useEffect(() => {
    console.log(invites);
  }, [invites]);

  if (action === "single") {
    return <InviteSingle eventId={location.state.id} />;
  } else if (action === "multiples") {
    return <InviteMultiple eventId={location.state.id} />;
  }

  return (
    <>
      <div class="uni-create uk-section uk-section-large@m uk-panel uk-overflow-hidden ">
        <div class="uk-container">
          <div class="uk-panel uk-width-2xlarge@m uk-margin-auto uk-text-center">
            <div
              class="uk-grid-small uk-grid@m uk-grid-match uk-child-width-1-2@s uk-margin-large-top@m uk-grid"
              data-uk-grid
            >
              <div>
                <div class="uk-card uk-card-2xsmall uk-card-xsmall@m uk-card-default uk-radius-large dark:uk-background-gray-90">
                  <div class="uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-primary-10">
                    <canvas height="250"></canvas>
                    <div class="uk-position-center">
                      <i class="uk-icon-large material-icons uk-text-primary">
                        add_photo_alternate
                      </i>
                    </div>
                    <Link
                      to=""
                      onClick={handleSingle}
                      class="uk-position-cover"
                      aria-label="Create single"
                    ></Link>
                  </div>
                  <div class="uk-padding-xsmall-top uk-padding-small-top@m">
                    <Link
                      to=""
                      onClick={handleSingle}
                      class="uk-button uk-button-medium uk-button-primary uk-button-ghost uk-width-1-1"
                    >
                      Invite single User
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div class="uk-card uk-card-2xsmall uk-card-xsmall@m uk-card-default uk-radius-large dark:uk-background-gray-90">
                  <div class="uk-card-media-top uk-panel uk-overflow-hidden uk-radius uk-background-secondary-10">
                    <canvas height="250"></canvas>
                    <div class="uk-position-center">
                      <i class="uk-icon-large material-icons uk-text-secondary">
                        collections
                      </i>
                    </div>
                    <Link
                      to=""
                      onClick={handleMultiples}
                      class="uk-position-cover"
                      aria-label="Create multiple"
                    ></Link>
                  </div>
                  <div class="uk-padding-xsmall-top uk-padding-small-top@m">
                    <Link
                      to=""
                      onClick={handleMultiples}
                      class="uk-button uk-button-medium uk-button-secondary uk-button-ghost uk-width-1-1"
                    >
                      Invite from file
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InviteSingle = ({ eventId }) => {
  const [error, setError]= useState(false)
  const initialValues = { email: "", name: "", lastName: "" };
  const user = JSON.parse(localStorage.getItem("user"));
  const [inviteConfirmation, setInviteConfirmation] = useState(false)
  const navigate= useNavigate()
  const [showSpinnerSingle, setShowSpinnerSingle] = useState(false);
  const [hideInviteSingle, setHideInviteSingle] = useState(false);


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .required("fields must be completed"),
      name: Yup.string().required("fields must be completed"),
      lastName: Yup.string().required("fields must be completed"),
      poapLink: Yup.string(),
    }),
    onSubmit: async (data) => {
      try {
        setHideInviteSingle(true);
        setShowSpinnerSingle(true);
        data.eventId = eventId;

        const mail = await Axios.post("/nodemailer/sendEmail", data);
        if (mail.data.to) {
          await Axios.post("/logs", {
            userId: user.id,
            email: user.email,
            action: actionsToLog.inviteUser,
            payload: [{ email: data.email }],
          });


          resetFields();
          
      setInviteConfirmation(true)

        }
      } catch (error) {
        setError(true)
        console.log(error);
      }
    },
  });

  const resetFields = () => formik.handleReset();

  useEffect(() => {

  }, [inviteConfirmation]);


  return (
    <>
      {inviteConfirmation? <EmailModal/>: <></>}
      {error? <ErrorModal/>:<></>}
      <div class="uk-border-top uni-create uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-border-top">
        <div class="uk-width-expand@m">
          <div class="uk-card uk-card-border uk-radius uk-card-xsmall uk-card-small@m">
            <form
              action="submit"
              class="uk-grid uk-grid-xsmall uk-child-width-1-1"
              onSubmit={formik.handleSubmit}
              data-uk-grid
            >
              <div class="uk-width-1-2@m">
                <div class="uk-form-controls">
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    className="form-control uk-input"
                    id="formGroupExampleInput"
                    value={formik.values.name}
                    placeholder={"First name"}
                  />
                </div>
              </div>
              <div class="uk-width-1-2@m">
                <div class="uk-form-controls">
                  <input
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="form-control  uk-input"
                    id="formGroupExampleInput"
                    placeholder={"Last name"}
                  />
                  {formik.touched.lastName && (
                    <p className="text-danger">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>
              <div class="uk-form-controls">
                <input
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  className="form-control  uk-input"
                  id="formGroupExampleInput2"
                  value={formik.values.email}
                  placeholder="user@email.com"
                />{" "}
                {formik.touched.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </div>
              <div class="uk-form-controls">
                <input
                  type="text"
                  name="poapLink"
                  onChange={formik.handleChange}
                  className="form-control uk-input"
                  id="formGroupExampleInput2"
                  value={formik.values.poapLink}
                  placeholder="POAP Link"
                />{" "}
                {formik.touched.poapLink && (
                  <p className="text-danger">{formik.errors.poapLink}</p>
                )}
              </div>
              <div class="uk-form-controls">
                <button
                  type="submit"
                  class="uk-button uk-button-primary uk-width-1-1"
                >
                  {showSpinnerSingle ? (
                    <TailSpin
                      height="30"
                      width="30"
                      color="white"
                      ariaLabel="loading"
                    />
                  ) : (
                    <></>
                  )}
                  {hideInviteSingle ? "" : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const InviteMultiple = ({ eventId }) => {
  const [error, setError]= useState(false)
  const [fileCSV, setFileCSV] = useState("");
  const [showSpinnerMultiple, setShowSpinnerMultiple] = useState(false);
  const [hideInviteMultiple, setHideInviteMultiple] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  const [showFileTitle, setShowFileTitle] = useState(false);
  const [inviteConfirmation, setInviteConfirmation] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const onChangeFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      setFileCSV(event.target.result);
      setFileTitle(file.name);
      setShowFileTitle(true);
    };
    reader.readAsText(file);
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      setHideInviteMultiple(true);
      setShowSpinnerMultiple(true);

      const arrayPrueba = fileCSV.split(/\r?\n|\r/);
      const headers = arrayPrueba[0].split(",");
      const rows = fileCSV.slice(fileCSV.indexOf("\n") + 1).split(/\r?\n|\r/);
      const arr = rows.map(function(row) {
        const values = row.split(",");
        let el = headers.reduce(function(object, header, index) {
          object[header] = values[index];
          return object;
        }, {});
        el.eventId = eventId;
        return el;
      });

      for (let i = 0; i < arr.length; i++) {
        let name = arr[i].name;
        let lastName = arr[i].lastName;
        let email = arr[i].email;
        let n = 1;
        console.log("entré acá", n++);

        await Axios.post("/nodemailer/sendEmail", {
          name,
          lastName,
          email,
          eventId,
        });
      }

      setInviteConfirmation(true)

      window.location.reload();
    } catch (error) {
      setError(true)
      console.log(error);
    }
  };

  useEffect(() => {
    setShowFileTitle(false);
    setInviteConfirmation(false);
  }, [inviteConfirmation]);

  return (
    <>
       {inviteConfirmation? <EmailModal/>: <></>}
       {error? <ErrorModal/>:<></>}
      <div class="uk-border-top uni-create uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-border-top">
        <form
          onSubmit={handleSubmitFile}
          class="uk-form-stacked uk-grid-xsmall uk-grid-small@m uk-child-width-1-1 uk-grid"
          data-uk-grid
        >
          <div class="uk-form-group">
            <h3 class="uk-h6 uk-margin-remove">Invite users from file</h3>
            <p class="uk-text-xsmall uk-text-small@m uk-text-bold uk-text-muted uk-margin-remove">
              Drag or choose your file to upload.
            </p>
          </div>
          <div class="uk-form-group">
            <div
              class="uk-panel uk-card uk-card-small uk-card-large@m uk-card-border uk-flex-column uk-flex-middle uk-text-center uk-radius"
              style={{ borderWidth: "2px", borderStyle: "dashed" }}
            >
              <p class="uk-text-bold uk-text-xsmall uk-text-muted uk-text-middle uk-margin-small">
                CSV FILE.
              </p>
              <div data-uk-form-custom="">
                <input
                  type="file"
                  style={{ cursor: "pointer" }}
                  onChange={onChangeFile}
                />
                <span class="uk-button uk-button-xsmall uk-button-default uk-button-outline">
                  <i
                    class="uk-icon-xsmall uk-margin-2xsmall-right"
                    data-feather="upload-cloud"
                  ></i>
                  <span>
                    {showFileTitle
                      ? `${fileTitle}`
                      : "Upload list of users to invite"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="uk-form-group"></div>
          <div class="uk-form-group">
            <div
              class="uk-grid-xsmall uk-flex-middle uk-flex-center uk-flex-between@m uk-grid"
              data-uk-grid
            >
              <div class="uk-width-1-1 uk-width-expand@m">
                <button type="submit" class="uk-button uk-button-primary">
                  {showSpinnerMultiple ? (
                    <TailSpin
                      height="30"
                      width="30"
                      color="white"
                      ariaLabel="loading"
                    />
                  ) : (
                    <></>
                  )}
                  {hideInviteMultiple ? "" : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Invite;
