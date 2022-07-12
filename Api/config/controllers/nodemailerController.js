const nodemailer = require("nodemailer");
const { User, Event } = require("../../models");
const bcrypt = require("bcrypt");
const axios = require("axios");
const QRCode = require("qrcode");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "streamint3@gmail.com",
    pass: "pfizqtrxpibblylc",
  },
});



exports.sendEmail = async (req, res) => {
  const { email, name, lastName, eventId, poapLink } = req.body;

  await User.findOrCreate({
    where: { email },
    defaults: {
      name: name,
      lastName: lastName,
      email: email,
      password: "12345678",
      roleId: "1",
      eventId: eventId,
      poapLink: poapLink,
    },
  });
  const evento = await Event.findByPk(eventId);

  const img1 = await QRCode.toDataURL("http://localhost:3000/register");

  const emailConfig = {
    from: "streamint3@gmail.com",
    to: email,
    attachDataUrls: true,
    subject:
      "StreaMint te invita al evento del momento ¿Te lo vas a perder? ¡Registrate ya! ",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      lang="en"
      xml:lang="en"
      style="background: #f3f3f3 !important"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>¡Hola,${name} ${lastName}! 😄 </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>
          @media only screen {
            html {
              min-height: 100%;
              background: #f3f3f3;
            }
          }
          @media only screen and (max-width: 784px) {
            table.body img {
              width: auto;
              height: auto;
            }
            table.body center {
              min-width: 0 !important;
            }
            table.body .container {
              width: 95% !important;
            }
            table.body .columns {
              height: auto !important;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            table.body .columns .columns {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            th.small-3 {
              display: inline-block !important;
              width: 25% !important;
            }
            th.small-4 {
              display: inline-block !important;
              width: 33.33333% !important;
            }
            th.small-6 {
              display: inline-block !important;
              width: 50% !important;
            }
            th.small-8 {
              display: inline-block !important;
              width: 66.66667% !important;
            }
            th.small-9 {
              display: inline-block !important;
              width: 75% !important;
            }
            th.small-12 {
              display: inline-block !important;
              width: 100% !important;
            }
            .columns th.small-12 {
              display: block !important;
              width: 100% !important;
            }
            table.menu {
              width: 100% !important;
            }
            table.menu td,
            table.menu th {
              width: auto !important;
              display: inline-block !important;
            }
            table.menu[align="center"] {
              width: auto !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download {
              margin: 0 -5px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download a {
              padding: 0 5px !important;
              width: 120px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .bg {
              display: none !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .desc {
              margin-left: 0 !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list-card .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list-card .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-2 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-3 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__5 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__3 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .d-sm-none {
              display: none;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 28px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__28-sm {
              font-size: 20px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__18-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .text__18-xs {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__16-1024 {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__16-sm {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__20-1024 {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 768px) {
            .text__20-md {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__20-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__14-1024 {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__14-sm {
              font-size: 10px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__24-1024 {
              font-size: 18px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__24-sm {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 30px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .text__36-xx {
              font-size: 26px !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body
        style="
          -moz-box-sizing: border-box;
          -ms-text-size-adjust: 100%;
          -webkit-box-sizing: border-box;
          -webkit-text-size-adjust: 100%;
          margin: 0;
          background: #f3f3f3 !important;
          box-sizing: border-box;
          color: #072227;
          font-family: Poppins, sans-serif !important;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 1.7em;
          margin: 0;
          min-width: 100%;
          padding: 0;
          text-align: left;
          width: 100% !important;
        "
      >
        <span
          class="preheader"
          style="
            color: #f3f3f3;
            display: none !important;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            mso-hide: all !important;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
          "
        ></span>
        <table
          class="body"
          style="
            margin: 0;
            background: #f3f3f3 !important;
            border-collapse: collapse;
            border-spacing: 0;
            color: #0a0a0a;
            font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
            font-size: 16px;
            font-weight: 400;
            height: 100%;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            text-align: left;
            vertical-align: top;
            width: 100%;
          "
        >
          <tr style="padding: 0; text-align: left; vertical-align: top">
            <td
              class="center"
              align="center"
              valign="top"
              style="
                -moz-hyphens: auto;
                -webkit-hyphens: auto;
                margin: 0;
                border-collapse: collapse !important;
                color: #0a0a0a;
                font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
                font-size: 16px;
                font-weight: 400;
                hyphens: auto;
                line-height: 1.3;
                margin: 0;
                padding: 0;
                text-align: left;
                vertical-align: top;
                word-wrap: break-word;
              "
            >
              <center data-parsed style="min-width: 768px; width: 100%">
                <table
                  align="center"
                  class="wrapper float-center"
                  style="
                    margin: 0 auto;
                    border-collapse: collapse;
                    border-spacing: 0;
                    float: none;
                    margin: 0 auto;
                    padding: 0;
                    text-align: center;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <tr style="padding: 0; text-align: left; vertical-align: top">
                    <td
                      class="wrapper-inner"
                      style="
                        -moz-hyphens: auto;
                        -webkit-hyphens: auto;
                        margin: 0;
                        border-collapse: collapse !important;
                        color: #0a0a0a;
                        font-family: Poppins, sans-serif, Helvetica, Arial,
                          sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        hyphens: auto;
                        line-height: 1.3;
                        margin: 0;
                        padding: 0;
                        text-align: left;
                        vertical-align: top;
                        word-wrap: break-word;
                      "
                    >
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="row bg__gray-1"
                                style="
                                  background-color: #f3f3f3 !important;
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-6 large-6 columns first"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 8px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__logo"
                                              style="
                                                align-items: center;
                                                display: flex;
                                              "
                                            >
                                              <img
                                                src="https://i.ibb.co/8rrpLdq/Group-1-1.png"
                                                alt
                                                style="
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block;
                                                  max-width: 100%;
                                                  outline: 0;
                                                  text-decoration: none;
                                                  width: auto;
                                                "
                                              />
                                              <span
                                                class="bold font__size--36 text__36-sm text color__pink"
                                                style="
                                                  color: #ff008e !important;
                                                  font-size: 36px;
                                                  font-weight: 700 !important;
                                                  margin-left: 1rem;
                                                "
                                                >StreaMint</span
                                              >
                                            </div>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                    <th
                                      class="small-6 large-6 columns last"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 8px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <p
                                              class="text-right mb-0 font__size--18 text__18-sm text__18-xs"
                                              style="
                                                margin: 0;
                                                margin-bottom: 10px;
                                                color: #0a0a0a;
                                                font-family: Poppins, sans-serif,
                                                  Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 1.3;
                                                margin: 0;
                                                margin-bottom: 0 !important;
                                                padding: 0;
                                                text-align: right;
                                              "
                                            >
                                              ¡Los mejores eventos<br />en línea!
                                            </p>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="15px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 15px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 15px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <img
                                src="https://i.ibb.co/dJVZ3jr/unsplash-ru-Jm3d-BXCqw.png"
                                class="images__4"
                                alt
                                style="
                                  -ms-interpolation-mode: bicubic;
                                  clear: both;
                                  display: block;
                                  height: 350px;
                                  max-width: 100%;
                                  object-fit: cover;
                                  outline: 0;
                                  text-decoration: none;
                                  width: 100% !important;
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="row"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-12 large-12 columns first last"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 752px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__box"
                                              style="padding: 1rem 2rem"
                                            >
                                              <p
                                                class="normal font__size--18 text__18-sm lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                "
                                              >
                                              </p>
                                              <h4
                                                class="semi-bold font__size--28 text__28-sm mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: inherit;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 28px;
                                                  font-weight: 600 !important;
                                                  line-height: 1.3;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                  word-wrap: normal;
                                                "
                                              >
                                                ¡Hola, ${name}! 😄
                                              </h4>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                 
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                  ¡Estamos muy felices de invitarte a nuestro evento virtual ${evento.dataValues.title}!
                                              </p>
                                            
                                              <p
                                              class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-2"
                                              style="
                                                margin: 0;
                                                margin-bottom: 10px;
                                                color: #0a0a0a;
                                                font-family: Poppins, sans-serif,
                                                  Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400 !important;
                                                line-height: 2 !important;
                                                margin: 0;
                                                margin-bottom: 1.5rem;
                                                opacity: 0.5;
                                                padding: 0;
                                                text-align: left;
                                                transition: 0.5s;
                                              "
                                            >
                                            Esperamos tu confirmación de asistencia. 
                                            </p>      

                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-2"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1.5rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                              Por favor, hacé click en el botón o escaneá el código QR para registrarte. Recordá utilizar el mismo email al que te enviamos este correo.

                                              </p>                                          
                                              <table
                                                class="button semi-bold font__size--18 text__18-sm color__white btn__link-more mb-0"
                                                style="
                                                  margin: 0 0 16px 0;
                                                  border-collapse: collapse;
                                                  border-spacing: 0;
                                                  color: #fff !important;
                                                  font-size: 18px;
                                                  font-weight: 600 !important;
                                                  margin: 0 0 16px 0;
                                                  margin-bottom: 0 !important;
                                                  padding: 0;
                                                  text-align: left;
                                                  vertical-align: top;
                                                  width: auto;
                                                "
                                              >
                                                <tr
                                                  style="
                                                    padding: 0;
                                                    text-align: left;
                                                    vertical-align: top;
                                                  "
                                                >

                                                  <td
                                                    style="
                                                      -moz-hyphens: auto;
                                                      -webkit-hyphens: auto;
                                                      margin: 0;
                                                      background-color: #d22779 !important;
                                                      border: 1px solid #d22779 !important;
                                                      border-collapse: collapse !important;
                                                      color: #0a0a0a;
                                                      font-family: Poppins,
                                                        sans-serif, Helvetica, Arial,
                                                        sans-serif;
                                                      font-size: 16px;
                                                      font-weight: 400;
                                                      hyphens: auto;
                                                      line-height: 1.3;
                                                      margin: 0;
                                                      padding: 0;
                                                      text-align: left;
                                                      vertical-align: top;
                                                      word-wrap: break-word;
                                                    "
                                                  >
                                                  
                                                    <table
                                                      style="
                                                        border-collapse: collapse;
                                                        border-spacing: 0;
                                                        padding: 0;
                                                        text-align: left;
                                                        vertical-align: top;
                                                        width: 100%;
                                                      "
                                                    >
                                                      <tr
                                                        style="
                                                          padding: 0;
                                                          text-align: left;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <td
                                                          style="
                                                            -moz-hyphens: auto;
                                                            -webkit-hyphens: auto;
                                                            margin: 0;
                                                            background: #2199e8;
                                                            background-color: #d22779 !important;
                                                            border: 1px solid
                                                              #d22779 !important;
                                                            border-collapse: collapse !important;
                                                            color: #fefefe;
                                                            font-family: Poppins,
                                                              sans-serif, Helvetica,
                                                              Arial, sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            hyphens: auto;
                                                            line-height: 1.3;
                                                            margin: 0;
                                                            padding: 0;
                                                            text-align: left;
                                                            vertical-align: top;
                                                            word-wrap: break-word;
                                                          "
                                                        >
                                                          <a
                                                            href="http://localhost:3000/register"
                                                            style="
                                                              margin: 0;
                                                              background-color: #d22779 !important;
                                                              border: 1px solid
                                                                #d22779 !important;
                                                              border-radius: 3px;
                                                              color: #fefefe;
                                                              display: inline-block;
                                                              font-family: Poppins,
                                                                sans-serif,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 16px;
                                                              font-weight: 700;
                                                              line-height: 1.3;
                                                              margin: 0;
                                                              padding: 20px 54px !important;
                                                              text-align: left;
                                                              text-decoration: none;
                                                            "
                                                            >Ingresá y registrate</a
                                                          >
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </th>
                                          <th
                                            class="expander"
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0 !important;
                                              text-align: left;
                                              visibility: hidden;
                                              width: 0;
                                            "
                                          ></th>
                                          <td>
                                          <img src=${img1}>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="40px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 40px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 40px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container bg__gray-1"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          background-color: #f3f3f3 !important;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <div
                                class="text__center w-100"
                                style="text-align: center; width: 100% !important"
                              >
                                <div
                                  class="d-inline-block"
                                  style="display: inline-block"
                                >
                                  <h4
                                    class="normal font__size--18 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: inherit;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 18px;
                                      font-weight: 400 !important;
                                      line-height: 1.3;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      padding: 0;
                                      text-align: center;
                                      word-wrap: normal;
                                    "
                                  >
                                    With ❤️ from
                                    <span
                                      class="color__pink"
                                      style="color: #ff008e !important"
                                      >StreaMint</span
                                    >
                                  </h4>
                                  <p
                                    class="opacity__5 lh-2 font__size--14 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: #0a0a0a;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 2 !important;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      opacity: 0.5;
                                      padding: 0;
                                      text-align: center;
                                      transition: 0.5s;
                                    "
                                  >
                                    Buenos Aires<br />Argentina
                                  </p>
                                  <center
                                    data-parsed
                                    style="min-width: 768px; width: 100%"
                                  >
                                    <table
                                      align="center"
                                      class="menu list__sosmed float-center"
                                      style="
                                        margin: 0 auto;
                                        border-collapse: collapse;
                                        border-spacing: 0;
                                        float: none;
                                        margin: 0 auto;
                                        padding: 0;
                                        text-align: center;
                                        vertical-align: top;
                                        width: auto !important;
                                      "
                                    >
                                      <tr
                                        style="
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                        "
                                      >
                                        <td
                                          style="
                                            -moz-hyphens: auto;
                                            -webkit-hyphens: auto;
                                            margin: 0;
                                            border-collapse: collapse !important;
                                            color: #0a0a0a;
                                            font-family: Poppins, sans-serif,
                                              Helvetica, Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: 400;
                                            hyphens: auto;
                                            line-height: 1.3;
                                            margin: 0;
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                            word-wrap: break-word;
                                          "
                                        >
                                          <table
                                            style="
                                              border-collapse: collapse;
                                              border-spacing: 0;
                                              padding: 0;
                                              text-align: left;
                                              vertical-align: top;
                                            "
                                          >
                                            <tr
                                              style="
                                                padding: 0;
                                                text-align: left;
                                                vertical-align: top;
                                              "
                                            >
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/LrvZF08/mdi-web.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Yp7SSQS/akar-icons-twitter-fill.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/TwPdsg7/ant-design-instagram-filled.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Y08N0jJ/cib-tiktok.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
        <!-- prevent Gmail on iOS font size manipulation -->
        <div
          style="
            display: none;
            white-space: nowrap;
            font: 15px courier;
            line-height: 0;
          "
        >
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      </body>
    </html>
    `,
  };
  transporter.sendMail(emailConfig, (error, info) => {
    console.log('lo mande ',info)
    res.status(200).json(emailConfig);
  });
};

exports.sendToken = async (req, res) => {
  let token;
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email }, include: [Event] });
    token = user.event.token;
    const img2 = await QRCode.toDataURL("http://localhost:3000/login");

    const emailConfig = {
      from: "streamint3@gmail.com",
      to: email,
      attachDataUrls: true,
      subject: "¡Recibe aquí tu código de acceso a nuestro evento virtual",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      lang="en"
      xml:lang="en"
      style="background: #f3f3f3 !important"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>¡Hola,${user.name} ${user.lastName}! 😄 </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>
          @media only screen {
            html {
              min-height: 100%;
              background: #f3f3f3;
            }
          }
          @media only screen and (max-width: 784px) {
            table.body img {
              width: auto;
              height: auto;
            }
            table.body center {
              min-width: 0 !important;
            }
            table.body .container {
              width: 95% !important;
            }
            table.body .columns {
              height: auto !important;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            table.body .columns .columns {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            th.small-3 {
              display: inline-block !important;
              width: 25% !important;
            }
            th.small-4 {
              display: inline-block !important;
              width: 33.33333% !important;
            }
            th.small-6 {
              display: inline-block !important;
              width: 50% !important;
            }
            th.small-8 {
              display: inline-block !important;
              width: 66.66667% !important;
            }
            th.small-9 {
              display: inline-block !important;
              width: 75% !important;
            }
            th.small-12 {
              display: inline-block !important;
              width: 100% !important;
            }
            .columns th.small-12 {
              display: block !important;
              width: 100% !important;
            }
            table.menu {
              width: 100% !important;
            }
            table.menu td,
            table.menu th {
              width: auto !important;
              display: inline-block !important;
            }
            table.menu[align="center"] {
              width: auto !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download {
              margin: 0 -5px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download a {
              padding: 0 5px !important;
              width: 120px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .bg {
              display: none !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .desc {
              margin-left: 0 !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list-card .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list-card .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-2 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-3 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__5 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__3 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .d-sm-none {
              display: none;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 28px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__28-sm {
              font-size: 20px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__18-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .text__18-xs {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__16-1024 {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__16-sm {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__20-1024 {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 768px) {
            .text__20-md {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__20-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__14-1024 {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__14-sm {
              font-size: 10px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__24-1024 {
              font-size: 18px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__24-sm {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 30px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .text__36-xx {
              font-size: 26px !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body
        style="
          -moz-box-sizing: border-box;
          -ms-text-size-adjust: 100%;
          -webkit-box-sizing: border-box;
          -webkit-text-size-adjust: 100%;
          margin: 0;
          background: #f3f3f3 !important;
          box-sizing: border-box;
          color: #072227;
          font-family: Poppins, sans-serif !important;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 1.7em;
          margin: 0;
          min-width: 100%;
          padding: 0;
          text-align: left;
          width: 100% !important;
        "
      >
        <span
          class="preheader"
          style="
            color: #f3f3f3;
            display: none !important;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            mso-hide: all !important;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
          "
        ></span>
        <table
          class="body"
          style="
            margin: 0;
            background: #f3f3f3 !important;
            border-collapse: collapse;
            border-spacing: 0;
            color: #0a0a0a;
            font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
            font-size: 16px;
            font-weight: 400;
            height: 100%;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            text-align: left;
            vertical-align: top;
            width: 100%;
          "
        >
          <tr style="padding: 0; text-align: left; vertical-align: top">
            <td
              class="center"
              align="center"
              valign="top"
              style="
                -moz-hyphens: auto;
                -webkit-hyphens: auto;
                margin: 0;
                border-collapse: collapse !important;
                color: #0a0a0a;
                font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
                font-size: 16px;
                font-weight: 400;
                hyphens: auto;
                line-height: 1.3;
                margin: 0;
                padding: 0;
                text-align: left;
                vertical-align: top;
                word-wrap: break-word;
              "
            >
              <center data-parsed style="min-width: 768px; width: 100%">
                <table
                  align="center"
                  class="wrapper float-center"
                  style="
                    margin: 0 auto;
                    border-collapse: collapse;
                    border-spacing: 0;
                    float: none;
                    margin: 0 auto;
                    padding: 0;
                    text-align: center;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <tr style="padding: 0; text-align: left; vertical-align: top">
                    <td
                      class="wrapper-inner"
                      style="
                        -moz-hyphens: auto;
                        -webkit-hyphens: auto;
                        margin: 0;
                        border-collapse: collapse !important;
                        color: #0a0a0a;
                        font-family: Poppins, sans-serif, Helvetica, Arial,
                          sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        hyphens: auto;
                        line-height: 1.3;
                        margin: 0;
                        padding: 0;
                        text-align: left;
                        vertical-align: top;
                        word-wrap: break-word;
                      "
                    >
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="row bg__gray-1"
                                style="
                                  background-color: #f3f3f3 !important;
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-6 large-6 columns first"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 8px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__logo"
                                              style="
                                                align-items: center;
                                                display: flex;
                                              "
                                            >
                                              <img
                                                src="https://i.ibb.co/8rrpLdq/Group-1-1.png"
                                                alt
                                                style="
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block;
                                                  max-width: 100%;
                                                  outline: 0;
                                                  text-decoration: none;
                                                  width: auto;
                                                "
                                              />
                                              <span
                                                class="bold font__size--36 text__36-sm text color__pink"
                                                style="
                                                  color: #ff008e !important;
                                                  font-size: 36px;
                                                  font-weight: 700 !important;
                                                  margin-left: 1rem;
                                                "
                                                >StreaMint</span
                                              >
                                            </div>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                    <th
                                      class="small-6 large-6 columns last"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 8px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <p
                                              class="text-right mb-0 font__size--18 text__18-sm text__18-xs"
                                              style="
                                                margin: 0;
                                                margin-bottom: 10px;
                                                color: #0a0a0a;
                                                font-family: Poppins, sans-serif,
                                                  Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 1.3;
                                                margin: 0;
                                                margin-bottom: 0 !important;
                                                padding: 0;
                                                text-align: right;
                                              "
                                            >
                                              ¡Los mejores eventos<br />en línea!
                                            </p>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="15px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 15px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 15px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <img
                                src="https://i.ibb.co/dJVZ3jr/unsplash-ru-Jm3d-BXCqw.png"
                                class="images__4"
                                alt
                                style="
                                  -ms-interpolation-mode: bicubic;
                                  clear: both;
                                  display: block;
                                  height: 350px;
                                  max-width: 100%;
                                  object-fit: cover;
                                  outline: 0;
                                  text-decoration: none;
                                  width: 100% !important;
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="row"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-12 large-12 columns first last"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 752px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__box"
                                              style="padding: 1rem 2rem"
                                            >
                                              <p
                                                class="normal font__size--18 text__18-sm lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                "
                                              >
                                              </p>
                                              <h4
                                                class="semi-bold font__size--28 text__28-sm mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: inherit;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 28px;
                                                  font-weight: 600 !important;
                                                  line-height: 1.3;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                  word-wrap: normal;
                                                "
                                              >
                                                ¡Hola, ${user.name}! 😄
                                              </h4>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                 
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                ¡Muchas gracias por registrarte en nuestra plataforma! 
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-2"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1.5rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                Para ingresar al evento, hacé click en el botón o usá el código QR, y utilizá tu correo electrónico con el siguiente código de acceso: 
                                                <b>${user.event.token}</b>
                                              </p>
                                              <table
                                                class="button semi-bold font__size--18 text__18-sm color__white btn__link-more mb-0"
                                                style="
                                                  margin: 0 0 16px 0;
                                                  border-collapse: collapse;
                                                  border-spacing: 0;
                                                  color: #fff !important;
                                                  font-size: 18px;
                                                  font-weight: 600 !important;
                                                  margin: 0 0 16px 0;
                                                  margin-bottom: 0 !important;
                                                  padding: 0;
                                                  text-align: left;
                                                  vertical-align: top;
                                                  width: auto;
                                                "
                                              >
                                                <tr
                                                  style="
                                                    padding: 0;
                                                    text-align: left;
                                                    vertical-align: top;
                                                  "
                                                >
                                                  <td
                                                    style="
                                                      -moz-hyphens: auto;
                                                      -webkit-hyphens: auto;
                                                      margin: 0;
                                                      background-color: #d22779 !important;
                                                      border: 1px solid #d22779 !important;
                                                      border-collapse: collapse !important;
                                                      color: #0a0a0a;
                                                      font-family: Poppins,
                                                        sans-serif, Helvetica, Arial,
                                                        sans-serif;
                                                      font-size: 16px;
                                                      font-weight: 400;
                                                      hyphens: auto;
                                                      line-height: 1.3;
                                                      margin: 0;
                                                      padding: 0;
                                                      text-align: left;
                                                      vertical-align: top;
                                                      word-wrap: break-word;
                                                    "
                                                  >
                                                    <table
                                                      style="
                                                        border-collapse: collapse;
                                                        border-spacing: 0;
                                                        padding: 0;
                                                        text-align: left;
                                                        vertical-align: top;
                                                        width: 100%;
                                                      "
                                                    >
                                                      <tr
                                                        style="
                                                          padding: 0;
                                                          text-align: left;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <td
                                                          style="
                                                            -moz-hyphens: auto;
                                                            -webkit-hyphens: auto;
                                                            margin: 0;
                                                            background: #2199e8;
                                                            background-color: #d22779 !important;
                                                            border: 1px solid
                                                              #d22779 !important;
                                                            border-collapse: collapse !important;
                                                            color: #fefefe;
                                                            font-family: Poppins,
                                                              sans-serif, Helvetica,
                                                              Arial, sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            hyphens: auto;
                                                            line-height: 1.3;
                                                            margin: 0;
                                                            padding: 0;
                                                            text-align: left;
                                                            vertical-align: top;
                                                            word-wrap: break-word;
                                                          "
                                                        >
                                                          <a
                                                            href="http://localhost:3000/login"
                                                            style="
                                                              margin: 0;
                                                              background-color: #d22779 !important;
                                                              border: 1px solid
                                                                #d22779 !important;
                                                              border-radius: 3px;
                                                              color: #fefefe;
                                                              display: inline-block;
                                                              font-family: Poppins,
                                                                sans-serif,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 16px;
                                                              font-weight: 700;
                                                              line-height: 1.3;
                                                              margin: 0;
                                                              padding: 20px 54px !important;
                                                              text-align: left;
                                                              text-decoration: none;
                                                            "
                                                            >Ingresá al evento</a
                                                          >
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </th>
                                          <th
                                            class="expander"
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0 !important;
                                              text-align: left;
                                              visibility: hidden;
                                              width: 0;
                                            "
                                          ></th>
                                          <td>
                                          <img src=${img2}>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="40px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 40px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 40px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container bg__gray-1"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          background-color: #f3f3f3 !important;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <div
                                class="text__center w-100"
                                style="text-align: center; width: 100% !important"
                              >
                                <div
                                  class="d-inline-block"
                                  style="display: inline-block"
                                >
                                  <h4
                                    class="normal font__size--18 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: inherit;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 18px;
                                      font-weight: 400 !important;
                                      line-height: 1.3;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      padding: 0;
                                      text-align: center;
                                      word-wrap: normal;
                                    "
                                  >
                                    With ❤️ from
                                    <span
                                      class="color__pink"
                                      style="color: #ff008e !important"
                                      >StreaMint</span
                                    >
                                  </h4>
                                  <p
                                    class="opacity__5 lh-2 font__size--14 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: #0a0a0a;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 2 !important;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      opacity: 0.5;
                                      padding: 0;
                                      text-align: center;
                                      transition: 0.5s;
                                    "
                                  >
                                    Buenos Aires<br />Argentina
                                  </p>
                                  <center
                                    data-parsed
                                    style="min-width: 768px; width: 100%"
                                  >
                                    <table
                                      align="center"
                                      class="menu list__sosmed float-center"
                                      style="
                                        margin: 0 auto;
                                        border-collapse: collapse;
                                        border-spacing: 0;
                                        float: none;
                                        margin: 0 auto;
                                        padding: 0;
                                        text-align: center;
                                        vertical-align: top;
                                        width: auto !important;
                                      "
                                    >
                                      <tr
                                        style="
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                        "
                                      >
                                        <td
                                          style="
                                            -moz-hyphens: auto;
                                            -webkit-hyphens: auto;
                                            margin: 0;
                                            border-collapse: collapse !important;
                                            color: #0a0a0a;
                                            font-family: Poppins, sans-serif,
                                              Helvetica, Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: 400;
                                            hyphens: auto;
                                            line-height: 1.3;
                                            margin: 0;
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                            word-wrap: break-word;
                                          "
                                        >
                                          <table
                                            style="
                                              border-collapse: collapse;
                                              border-spacing: 0;
                                              padding: 0;
                                              text-align: left;
                                              vertical-align: top;
                                            "
                                          >
                                            <tr
                                              style="
                                                padding: 0;
                                                text-align: left;
                                                vertical-align: top;
                                              "
                                            >
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/LrvZF08/mdi-web.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Yp7SSQS/akar-icons-twitter-fill.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/TwPdsg7/ant-design-instagram-filled.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Y08N0jJ/cib-tiktok.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
        <!-- prevent Gmail on iOS font size manipulation -->
        <div
          style="
            display: none;
            white-space: nowrap;
            font: 15px courier;
            line-height: 0;
          "
        >
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      </body>
    </html>
    `,
    };
    transporter.sendMail(emailConfig, (error, info) => {
      res.status(200).json(emailConfig);
    });

    const hashToken = await bcrypt.hash(token, user.salt);

    await user.update({ password: hashToken });
    await user.save();
  } catch (err) {
    res.status(404).send("User not invited. Try again.");
  }
};

exports.sendReminder = async (req, res) => {
  const { id, name, lastName, email, eventId } = req.body;
  const img3 = await QRCode.toDataURL("http://localhost:3000/login");

  const emailConfig = {
    from: "streamint3@gmail.com",
    to: email,
    attachDataUrls: true,
    subject: "StreaMint te recuerda que en 24 horas comienza tu evento",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      lang="en"
      xml:lang="en"
      style="background: #f3f3f3 !important"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>¡Hola, ${name}! 😄 </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>
          @media only screen {
            html {
              min-height: 100%;
              background: #f3f3f3;
            }
          }
          @media only screen and (max-width: 784px) {
            table.body img {
              width: auto;
              height: auto;
            }
            table.body center {
              min-width: 0 !important;
            }
            table.body .container {
              width: 95% !important;
            }
            table.body .columns {
              height: auto !important;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            table.body .columns .columns {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            th.small-3 {
              display: inline-block !important;
              width: 25% !important;
            }
            th.small-4 {
              display: inline-block !important;
              width: 33.33333% !important;
            }
            th.small-6 {
              display: inline-block !important;
              width: 50% !important;
            }
            th.small-8 {
              display: inline-block !important;
              width: 66.66667% !important;
            }
            th.small-9 {
              display: inline-block !important;
              width: 75% !important;
            }
            th.small-12 {
              display: inline-block !important;
              width: 100% !important;
            }
            .columns th.small-12 {
              display: block !important;
              width: 100% !important;
            }
            table.menu {
              width: 100% !important;
            }
            table.menu td,
            table.menu th {
              width: auto !important;
              display: inline-block !important;
            }
            table.menu[align="center"] {
              width: auto !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download {
              margin: 0 -5px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download a {
              padding: 0 5px !important;
              width: 120px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .bg {
              display: none !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .desc {
              margin-left: 0 !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list-card .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list-card .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-2 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-3 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__5 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__3 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .d-sm-none {
              display: none;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 28px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__28-sm {
              font-size: 20px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__18-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .text__18-xs {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__16-1024 {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__16-sm {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__20-1024 {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 768px) {
            .text__20-md {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__20-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__14-1024 {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__14-sm {
              font-size: 10px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__24-1024 {
              font-size: 18px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__24-sm {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 30px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .text__36-xx {
              font-size: 26px !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body
        style="
          -moz-box-sizing: border-box;
          -ms-text-size-adjust: 100%;
          -webkit-box-sizing: border-box;
          -webkit-text-size-adjust: 100%;
          margin: 0;
          background: #f3f3f3 !important;
          box-sizing: border-box;
          color: #072227;
          font-family: Poppins, sans-serif !important;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 1.7em;
          margin: 0;
          min-width: 100%;
          padding: 0;
          text-align: left;
          width: 100% !important;
        "
      >
        <span
          class="preheader"
          style="
            color: #f3f3f3;
            display: none !important;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            mso-hide: all !important;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
          "
        ></span>
        <table
          class="body"
          style="
            margin: 0;
            background: #f3f3f3 !important;
            border-collapse: collapse;
            border-spacing: 0;
            color: #0a0a0a;
            font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
            font-size: 16px;
            font-weight: 400;
            height: 100%;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            text-align: left;
            vertical-align: top;
            width: 100%;
          "
        >
          <tr style="padding: 0; text-align: left; vertical-align: top">
            <td
              class="center"
              align="center"
              valign="top"
              style="
                -moz-hyphens: auto;
                -webkit-hyphens: auto;
                margin: 0;
                border-collapse: collapse !important;
                color: #0a0a0a;
                font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
                font-size: 16px;
                font-weight: 400;
                hyphens: auto;
                line-height: 1.3;
                margin: 0;
                padding: 0;
                text-align: left;
                vertical-align: top;
                word-wrap: break-word;
              "
            >
              <center data-parsed style="min-width: 768px; width: 100%">
                <table
                  align="center"
                  class="wrapper float-center"
                  style="
                    margin: 0 auto;
                    border-collapse: collapse;
                    border-spacing: 0;
                    float: none;
                    margin: 0 auto;
                    padding: 0;
                    text-align: center;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <tr style="padding: 0; text-align: left; vertical-align: top">
                    <td
                      class="wrapper-inner"
                      style="
                        -moz-hyphens: auto;
                        -webkit-hyphens: auto;
                        margin: 0;
                        border-collapse: collapse !important;
                        color: #0a0a0a;
                        font-family: Poppins, sans-serif, Helvetica, Arial,
                          sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        hyphens: auto;
                        line-height: 1.3;
                        margin: 0;
                        padding: 0;
                        text-align: left;
                        vertical-align: top;
                        word-wrap: break-word;
                      "
                    >
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="row bg__gray-1"
                                style="
                                  background-color: #f3f3f3 !important;
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-6 large-6 columns first"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 8px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__logo"
                                              style="
                                                align-items: center;
                                                display: flex;
                                              "
                                            >
                                              <img
                                                src="https://i.ibb.co/8rrpLdq/Group-1-1.png"
                                                alt
                                                style="
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block;
                                                  max-width: 100%;
                                                  outline: 0;
                                                  text-decoration: none;
                                                  width: auto;
                                                "
                                              />
                                              <span
                                                class="bold font__size--36 text__36-sm text color__pink"
                                                style="
                                                  color: #ff008e !important;
                                                  font-size: 36px;
                                                  font-weight: 700 !important;
                                                  margin-left: 1rem;
                                                "
                                                >StreaMint</span
                                              >
                                            </div>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                    <th
                                      class="small-6 large-6 columns last"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 8px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <p
                                              class="text-right mb-0 font__size--18 text__18-sm text__18-xs"
                                              style="
                                                margin: 0;
                                                margin-bottom: 10px;
                                                color: #0a0a0a;
                                                font-family: Poppins, sans-serif,
                                                  Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 1.3;
                                                margin: 0;
                                                margin-bottom: 0 !important;
                                                padding: 0;
                                                text-align: right;
                                              "
                                            >
                                              ¡Los mejores eventos<br />en línea!
                                            </p>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="15px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 15px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 15px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <img
                                src="https://i.ibb.co/dJVZ3jr/unsplash-ru-Jm3d-BXCqw.png"
                                class="images__4"
                                alt
                                style="
                                  -ms-interpolation-mode: bicubic;
                                  clear: both;
                                  display: block;
                                  height: 350px;
                                  max-width: 100%;
                                  object-fit: cover;
                                  outline: 0;
                                  text-decoration: none;
                                  width: 100% !important;
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="row"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-12 large-12 columns first last"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 752px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__box"
                                              style="padding: 1rem 2rem"
                                            >
                                              <p
                                                class="normal font__size--18 text__18-sm lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                "
                                              >
                                              </p>
                                              <h4
                                                class="semi-bold font__size--28 text__28-sm mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: inherit;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 28px;
                                                  font-weight: 600 !important;
                                                  line-height: 1.3;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                  word-wrap: normal;
                                                "
                                              >
                                                ¡Hola, ${name}! 😄
                                              </h4>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                 
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                  ¡Te recordamos que estás invitado a asistir a un evento de StreaMint dentro de las próximas 24 horas!
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-2"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1.5rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                              Te esperamos. 
                                              
                                              ¡Chequeá la cuenta regresiva aquí!

                                              </p>
                                              <table
                                                class="button semi-bold font__size--18 text__18-sm color__white btn__link-more mb-0"
                                                style="
                                                  margin: 0 0 16px 0;
                                                  border-collapse: collapse;
                                                  border-spacing: 0;
                                                  color: #fff !important;
                                                  font-size: 18px;
                                                  font-weight: 600 !important;
                                                  margin: 0 0 16px 0;
                                                  margin-bottom: 0 !important;
                                                  padding: 0;
                                                  text-align: left;
                                                  vertical-align: top;
                                                  width: auto;
                                                "
                                              >
                                                <tr
                                                  style="
                                                    padding: 0;
                                                    text-align: left;
                                                    vertical-align: top;
                                                  "
                                                >
                                                  <td
                                                    style="
                                                      -moz-hyphens: auto;
                                                      -webkit-hyphens: auto;
                                                      margin: 0;
                                                      background-color: #d22779 !important;
                                                      border: 1px solid #d22779 !important;
                                                      border-collapse: collapse !important;
                                                      color: #0a0a0a;
                                                      font-family: Poppins,
                                                        sans-serif, Helvetica, Arial,
                                                        sans-serif;
                                                      font-size: 16px;
                                                      font-weight: 400;
                                                      hyphens: auto;
                                                      line-height: 1.3;
                                                      margin: 0;
                                                      padding: 0;
                                                      text-align: left;
                                                      vertical-align: top;
                                                      word-wrap: break-word;
                                                    "
                                                  >
                                                    <table
                                                      style="
                                                        border-collapse: collapse;
                                                        border-spacing: 0;
                                                        padding: 0;
                                                        text-align: left;
                                                        vertical-align: top;
                                                        width: 100%;
                                                      "
                                                    >
                                                      <tr
                                                        style="
                                                          padding: 0;
                                                          text-align: left;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <td
                                                          style="
                                                            -moz-hyphens: auto;
                                                            -webkit-hyphens: auto;
                                                            margin: 0;
                                                            background: #2199e8;
                                                            background-color: #d22779 !important;
                                                            border: 1px solid
                                                              #d22779 !important;
                                                            border-collapse: collapse !important;
                                                            color: #fefefe;
                                                            font-family: Poppins,
                                                              sans-serif, Helvetica,
                                                              Arial, sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            hyphens: auto;
                                                            line-height: 1.3;
                                                            margin: 0;
                                                            padding: 0;
                                                            text-align: left;
                                                            vertical-align: top;
                                                            word-wrap: break-word;
                                                          "
                                                        >
                                                          <a
                                                            href="http://localhost:3000/register"
                                                            style="
                                                              margin: 0;
                                                              background-color: #d22779 !important;
                                                              border: 1px solid
                                                                #d22779 !important;
                                                              border-radius: 3px;
                                                              color: #fefefe;
                                                              display: inline-block;
                                                              font-family: Poppins,
                                                                sans-serif,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 16px;
                                                              font-weight: 700;
                                                              line-height: 1.3;
                                                              margin: 0;
                                                              padding: 20px 54px !important;
                                                              text-align: left;
                                                              text-decoration: none;
                                                            "
                                                            >Ingresá al sitio</a
                                                          >
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </th>
                                          <th
                                            class="expander"
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0 !important;
                                              text-align: left;
                                              visibility: hidden;
                                              width: 0;
                                            "
                                          ></th>
                                          <td>
                                          <img src=${img3}>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="40px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 40px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 40px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container bg__gray-1"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          background-color: #f3f3f3 !important;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <div
                                class="text__center w-100"
                                style="text-align: center; width: 100% !important"
                              >
                                <div
                                  class="d-inline-block"
                                  style="display: inline-block"
                                >
                                  <h4
                                    class="normal font__size--18 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: inherit;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 18px;
                                      font-weight: 400 !important;
                                      line-height: 1.3;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      padding: 0;
                                      text-align: center;
                                      word-wrap: normal;
                                    "
                                  >
                                    With ❤️ from
                                    <span
                                      class="color__pink"
                                      style="color: #ff008e !important"
                                      >StreaMint</span
                                    >
                                  </h4>
                                  <p
                                    class="opacity__5 lh-2 font__size--14 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: #0a0a0a;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 2 !important;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      opacity: 0.5;
                                      padding: 0;
                                      text-align: center;
                                      transition: 0.5s;
                                    "
                                  >
                                    Buenos Aires<br />Argentina
                                  </p>
                                  <center
                                    data-parsed
                                    style="min-width: 768px; width: 100%"
                                  >
                                    <table
                                      align="center"
                                      class="menu list__sosmed float-center"
                                      style="
                                        margin: 0 auto;
                                        border-collapse: collapse;
                                        border-spacing: 0;
                                        float: none;
                                        margin: 0 auto;
                                        padding: 0;
                                        text-align: center;
                                        vertical-align: top;
                                        width: auto !important;
                                      "
                                    >
                                      <tr
                                        style="
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                        "
                                      >
                                        <td
                                          style="
                                            -moz-hyphens: auto;
                                            -webkit-hyphens: auto;
                                            margin: 0;
                                            border-collapse: collapse !important;
                                            color: #0a0a0a;
                                            font-family: Poppins, sans-serif,
                                              Helvetica, Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: 400;
                                            hyphens: auto;
                                            line-height: 1.3;
                                            margin: 0;
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                            word-wrap: break-word;
                                          "
                                        >
                                          <table
                                            style="
                                              border-collapse: collapse;
                                              border-spacing: 0;
                                              padding: 0;
                                              text-align: left;
                                              vertical-align: top;
                                            "
                                          >
                                            <tr
                                              style="
                                                padding: 0;
                                                text-align: left;
                                                vertical-align: top;
                                              "
                                            >
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/LrvZF08/mdi-web.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Yp7SSQS/akar-icons-twitter-fill.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/TwPdsg7/ant-design-instagram-filled.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Y08N0jJ/cib-tiktok.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
        <!-- prevent Gmail on iOS font size manipulation -->
        <div
          style="
            display: none;
            white-space: nowrap;
            font: 15px courier;
            line-height: 0;
          "
        >
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      </body>
    </html>
    `,
  };
  transporter.sendMail(emailConfig, (error, info) => {
    res.status(200).json(emailConfig);
  });
};

exports.modifyNotification = async (req, res) => {
  const emails = req.body.data;

  const img3 = await QRCode.toDataURL("http://localhost:3000/login");

  const emailConfig = {
    from: "streamint3@gmail.com",
    to: emails,
    attachDataUrls: true,
    subject: "El evento al que estás invitado fue modificado",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      lang="en"
      xml:lang="en"
      style="background: #f3f3f3 !important"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>¡Hola! 😄 </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>
          @media only screen {
            html {
              min-height: 100%;
              background: #f3f3f3;
            }
          }
          @media only screen and (max-width: 784px) {
            table.body img {
              width: auto;
              height: auto;
            }
            table.body center {
              min-width: 0 !important;
            }
            table.body .container {
              width: 95% !important;
            }
            table.body .columns {
              height: auto !important;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            table.body .columns .columns {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            th.small-3 {
              display: inline-block !important;
              width: 25% !important;
            }
            th.small-4 {
              display: inline-block !important;
              width: 33.33333% !important;
            }
            th.small-6 {
              display: inline-block !important;
              width: 50% !important;
            }
            th.small-8 {
              display: inline-block !important;
              width: 66.66667% !important;
            }
            th.small-9 {
              display: inline-block !important;
              width: 75% !important;
            }
            th.small-12 {
              display: inline-block !important;
              width: 100% !important;
            }
            .columns th.small-12 {
              display: block !important;
              width: 100% !important;
            }
            table.menu {
              width: 100% !important;
            }
            table.menu td,
            table.menu th {
              width: auto !important;
              display: inline-block !important;
            }
            table.menu[align="center"] {
              width: auto !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download {
              margin: 0 -5px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download a {
              padding: 0 5px !important;
              width: 120px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .bg {
              display: none !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .desc {
              margin-left: 0 !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list-card .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list-card .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-2 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-3 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__5 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__3 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .d-sm-none {
              display: none;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 28px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__28-sm {
              font-size: 20px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__18-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .text__18-xs {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__16-1024 {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__16-sm {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__20-1024 {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 768px) {
            .text__20-md {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__20-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__14-1024 {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__14-sm {
              font-size: 10px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__24-1024 {
              font-size: 18px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__24-sm {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 30px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .text__36-xx {
              font-size: 26px !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body
        style="
          -moz-box-sizing: border-box;
          -ms-text-size-adjust: 100%;
          -webkit-box-sizing: border-box;
          -webkit-text-size-adjust: 100%;
          margin: 0;
          background: #f3f3f3 !important;
          box-sizing: border-box;
          color: #072227;
          font-family: Poppins, sans-serif !important;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 1.7em;
          margin: 0;
          min-width: 100%;
          padding: 0;
          text-align: left;
          width: 100% !important;
        "
      >
        <span
          class="preheader"
          style="
            color: #f3f3f3;
            display: none !important;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            mso-hide: all !important;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
          "
        ></span>
        <table
          class="body"
          style="
            margin: 0;
            background: #f3f3f3 !important;
            border-collapse: collapse;
            border-spacing: 0;
            color: #0a0a0a;
            font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
            font-size: 16px;
            font-weight: 400;
            height: 100%;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            text-align: left;
            vertical-align: top;
            width: 100%;
          "
        >
          <tr style="padding: 0; text-align: left; vertical-align: top">
            <td
              class="center"
              align="center"
              valign="top"
              style="
                -moz-hyphens: auto;
                -webkit-hyphens: auto;
                margin: 0;
                border-collapse: collapse !important;
                color: #0a0a0a;
                font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
                font-size: 16px;
                font-weight: 400;
                hyphens: auto;
                line-height: 1.3;
                margin: 0;
                padding: 0;
                text-align: left;
                vertical-align: top;
                word-wrap: break-word;
              "
            >
              <center data-parsed style="min-width: 768px; width: 100%">
                <table
                  align="center"
                  class="wrapper float-center"
                  style="
                    margin: 0 auto;
                    border-collapse: collapse;
                    border-spacing: 0;
                    float: none;
                    margin: 0 auto;
                    padding: 0;
                    text-align: center;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <tr style="padding: 0; text-align: left; vertical-align: top">
                    <td
                      class="wrapper-inner"
                      style="
                        -moz-hyphens: auto;
                        -webkit-hyphens: auto;
                        margin: 0;
                        border-collapse: collapse !important;
                        color: #0a0a0a;
                        font-family: Poppins, sans-serif, Helvetica, Arial,
                          sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        hyphens: auto;
                        line-height: 1.3;
                        margin: 0;
                        padding: 0;
                        text-align: left;
                        vertical-align: top;
                        word-wrap: break-word;
                      "
                    >
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="row bg__gray-1"
                                style="
                                  background-color: #f3f3f3 !important;
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-6 large-6 columns first"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 8px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__logo"
                                              style="
                                                align-items: center;
                                                display: flex;
                                              "
                                            >
                                              <img
                                                src="https://i.ibb.co/8rrpLdq/Group-1-1.png"
                                                alt
                                                style="
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block;
                                                  max-width: 100%;
                                                  outline: 0;
                                                  text-decoration: none;
                                                  width: auto;
                                                "
                                              />
                                              <span
                                                class="bold font__size--36 text__36-sm text color__pink"
                                                style="
                                                  color: #ff008e !important;
                                                  font-size: 36px;
                                                  font-weight: 700 !important;
                                                  margin-left: 1rem;
                                                "
                                                >StreaMint</span
                                              >
                                            </div>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                    <th
                                      class="small-6 large-6 columns last"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 8px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <p
                                              class="text-right mb-0 font__size--18 text__18-sm text__18-xs"
                                              style="
                                                margin: 0;
                                                margin-bottom: 10px;
                                                color: #0a0a0a;
                                                font-family: Poppins, sans-serif,
                                                  Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 1.3;
                                                margin: 0;
                                                margin-bottom: 0 !important;
                                                padding: 0;
                                                text-align: right;
                                              "
                                            >
                                              ¡Los mejores eventos<br />en línea!
                                            </p>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="15px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 15px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 15px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <img
                                src="https://i.ibb.co/dJVZ3jr/unsplash-ru-Jm3d-BXCqw.png"
                                class="images__4"
                                alt
                                style="
                                  -ms-interpolation-mode: bicubic;
                                  clear: both;
                                  display: block;
                                  height: 350px;
                                  max-width: 100%;
                                  object-fit: cover;
                                  outline: 0;
                                  text-decoration: none;
                                  width: 100% !important;
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="row"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-12 large-12 columns first last"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 752px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__box"
                                              style="padding: 1rem 2rem"
                                            >
                                              <p
                                                class="normal font__size--18 text__18-sm lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                "
                                              >
                                              </p>
                                              <h4
                                                class="semi-bold font__size--28 text__28-sm mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: inherit;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 28px;
                                                  font-weight: 600 !important;
                                                  line-height: 1.3;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                  word-wrap: normal;
                                                "
                                              >
                                                ¡Hola! 😄
                                              </h4>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                 
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                  ¡Queremos avisarte que el evento al que estás invitado tuvo algunas modificaciones!
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-2"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1.5rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                              
                                              Para conocer el nuevo horario, ¡Chequeá la cuenta regresiva aquí!

                                              </p>
                                              <table
                                                class="button semi-bold font__size--18 text__18-sm color__white btn__link-more mb-0"
                                                style="
                                                  margin: 0 0 16px 0;
                                                  border-collapse: collapse;
                                                  border-spacing: 0;
                                                  color: #fff !important;
                                                  font-size: 18px;
                                                  font-weight: 600 !important;
                                                  margin: 0 0 16px 0;
                                                  margin-bottom: 0 !important;
                                                  padding: 0;
                                                  text-align: left;
                                                  vertical-align: top;
                                                  width: auto;
                                                "
                                              >
                                                <tr
                                                  style="
                                                    padding: 0;
                                                    text-align: left;
                                                    vertical-align: top;
                                                  "
                                                >
                                                  <td
                                                    style="
                                                      -moz-hyphens: auto;
                                                      -webkit-hyphens: auto;
                                                      margin: 0;
                                                      background-color: #d22779 !important;
                                                      border: 1px solid #d22779 !important;
                                                      border-collapse: collapse !important;
                                                      color: #0a0a0a;
                                                      font-family: Poppins,
                                                        sans-serif, Helvetica, Arial,
                                                        sans-serif;
                                                      font-size: 16px;
                                                      font-weight: 400;
                                                      hyphens: auto;
                                                      line-height: 1.3;
                                                      margin: 0;
                                                      padding: 0;
                                                      text-align: left;
                                                      vertical-align: top;
                                                      word-wrap: break-word;
                                                    "
                                                  >
                                                    <table
                                                      style="
                                                        border-collapse: collapse;
                                                        border-spacing: 0;
                                                        padding: 0;
                                                        text-align: left;
                                                        vertical-align: top;
                                                        width: 100%;
                                                      "
                                                    >
                                                      <tr
                                                        style="
                                                          padding: 0;
                                                          text-align: left;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <td
                                                          style="
                                                            -moz-hyphens: auto;
                                                            -webkit-hyphens: auto;
                                                            margin: 0;
                                                            background: #2199e8;
                                                            background-color: #d22779 !important;
                                                            border: 1px solid
                                                              #d22779 !important;
                                                            border-collapse: collapse !important;
                                                            color: #fefefe;
                                                            font-family: Poppins,
                                                              sans-serif, Helvetica,
                                                              Arial, sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            hyphens: auto;
                                                            line-height: 1.3;
                                                            margin: 0;
                                                            padding: 0;
                                                            text-align: left;
                                                            vertical-align: top;
                                                            word-wrap: break-word;
                                                          "
                                                        >
                                                          <a
                                                            href="http://localhost:3000/login"
                                                            style="
                                                              margin: 0;
                                                              background-color: #d22779 !important;
                                                              border: 1px solid
                                                                #d22779 !important;
                                                              border-radius: 3px;
                                                              color: #fefefe;
                                                              display: inline-block;
                                                              font-family: Poppins,
                                                                sans-serif,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 16px;
                                                              font-weight: 700;
                                                              line-height: 1.3;
                                                              margin: 0;
                                                              padding: 20px 54px !important;
                                                              text-align: left;
                                                              text-decoration: none;
                                                            "
                                                            >Ingresá al sitio</a
                                                          >
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </th>
                                          <th
                                            class="expander"
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0 !important;
                                              text-align: left;
                                              visibility: hidden;
                                              width: 0;
                                            "
                                          ></th>
                                          <td>
                                          <img src=${img3}>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="40px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 40px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 40px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container bg__gray-1"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          background-color: #f3f3f3 !important;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <div
                                class="text__center w-100"
                                style="text-align: center; width: 100% !important"
                              >
                                <div
                                  class="d-inline-block"
                                  style="display: inline-block"
                                >
                                  <h4
                                    class="normal font__size--18 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: inherit;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 18px;
                                      font-weight: 400 !important;
                                      line-height: 1.3;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      padding: 0;
                                      text-align: center;
                                      word-wrap: normal;
                                    "
                                  >
                                    With ❤️ from
                                    <span
                                      class="color__pink"
                                      style="color: #ff008e !important"
                                      >StreaMint</span
                                    >
                                  </h4>
                                  <p
                                    class="opacity__5 lh-2 font__size--14 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: #0a0a0a;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 2 !important;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      opacity: 0.5;
                                      padding: 0;
                                      text-align: center;
                                      transition: 0.5s;
                                    "
                                  >
                                    Buenos Aires<br />Argentina
                                  </p>
                                  <center
                                    data-parsed
                                    style="min-width: 768px; width: 100%"
                                  >
                                    <table
                                      align="center"
                                      class="menu list__sosmed float-center"
                                      style="
                                        margin: 0 auto;
                                        border-collapse: collapse;
                                        border-spacing: 0;
                                        float: none;
                                        margin: 0 auto;
                                        padding: 0;
                                        text-align: center;
                                        vertical-align: top;
                                        width: auto !important;
                                      "
                                    >
                                      <tr
                                        style="
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                        "
                                      >
                                        <td
                                          style="
                                            -moz-hyphens: auto;
                                            -webkit-hyphens: auto;
                                            margin: 0;
                                            border-collapse: collapse !important;
                                            color: #0a0a0a;
                                            font-family: Poppins, sans-serif,
                                              Helvetica, Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: 400;
                                            hyphens: auto;
                                            line-height: 1.3;
                                            margin: 0;
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                            word-wrap: break-word;
                                          "
                                        >
                                          <table
                                            style="
                                              border-collapse: collapse;
                                              border-spacing: 0;
                                              padding: 0;
                                              text-align: left;
                                              vertical-align: top;
                                            "
                                          >
                                            <tr
                                              style="
                                                padding: 0;
                                                text-align: left;
                                                vertical-align: top;
                                              "
                                            >
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/LrvZF08/mdi-web.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Yp7SSQS/akar-icons-twitter-fill.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/TwPdsg7/ant-design-instagram-filled.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Y08N0jJ/cib-tiktok.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
        <!-- prevent Gmail on iOS font size manipulation -->
        <div
          style="
            display: none;
            white-space: nowrap;
            font: 15px courier;
            line-height: 0;
          "
        >
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      </body>
    </html>
    `,
  };
  transporter.sendMail(emailConfig, (error, info) => {
    res.status(200).json(emailConfig);
  });
};

exports.deleteNotification = async (req, res) => {
  const emails = req.body.data;

  const emailConfig = {
    from: "streamint3@gmail.com",
    to: emails,
    attachDataUrls: true,
    subject: "El evento al que estabas invitado fue suspendido",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      lang="en"
      xml:lang="en"
      style="background: #f3f3f3 !important"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>¡Hola! 😄 </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>
          @media only screen {
            html {
              min-height: 100%;
              background: #f3f3f3;
            }
          }
          @media only screen and (max-width: 784px) {
            table.body img {
              width: auto;
              height: auto;
            }
            table.body center {
              min-width: 0 !important;
            }
            table.body .container {
              width: 95% !important;
            }
            table.body .columns {
              height: auto !important;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            table.body .columns .columns {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            th.small-3 {
              display: inline-block !important;
              width: 25% !important;
            }
            th.small-4 {
              display: inline-block !important;
              width: 33.33333% !important;
            }
            th.small-6 {
              display: inline-block !important;
              width: 50% !important;
            }
            th.small-8 {
              display: inline-block !important;
              width: 66.66667% !important;
            }
            th.small-9 {
              display: inline-block !important;
              width: 75% !important;
            }
            th.small-12 {
              display: inline-block !important;
              width: 100% !important;
            }
            .columns th.small-12 {
              display: block !important;
              width: 100% !important;
            }
            table.menu {
              width: 100% !important;
            }
            table.menu td,
            table.menu th {
              width: auto !important;
              display: inline-block !important;
            }
            table.menu[align="center"] {
              width: auto !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download {
              margin: 0 -5px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper___link-download a {
              padding: 0 5px !important;
              width: 120px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .bg {
              display: none !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .wrapper__product-list .desc {
              margin-left: 0 !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__product-list-card .bg {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .wrapper__product-list-card .desc {
              margin-left: 15px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-2 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .wrapper__box-3 {
              padding: 1rem 2rem !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__5 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .images__3 {
              height: 250px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .d-sm-none {
              display: none;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 28px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__28-sm {
              font-size: 20px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__18-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 480px) {
            .text__18-xs {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__16-1024 {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__16-sm {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__20-1024 {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 768px) {
            .text__20-md {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__20-sm {
              font-size: 14px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__14-1024 {
              font-size: 12px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__14-sm {
              font-size: 10px !important;
            }
          }
          @media only screen and (max-width: 1024px) {
            .text__24-1024 {
              font-size: 18px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__24-sm {
              font-size: 16px !important;
            }
          }
          @media only screen and (max-width: 576px) {
            .text__36-sm {
              font-size: 30px !important;
            }
          }
          @media only screen and (max-width: 425px) {
            .text__36-xx {
              font-size: 26px !important;
            }
          }
          @media screen and (max-width: 768px) {
            h3 {
              font-size: 25px;
            }
          }
          @media screen and (max-width: 768px) {
            h4 {
              font-size: 20px;
            }
          }
          @media screen and (max-width: 768px) {
            h5 {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body
        style="
          -moz-box-sizing: border-box;
          -ms-text-size-adjust: 100%;
          -webkit-box-sizing: border-box;
          -webkit-text-size-adjust: 100%;
          margin: 0;
          background: #f3f3f3 !important;
          box-sizing: border-box;
          color: #072227;
          font-family: Poppins, sans-serif !important;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 1.7em;
          margin: 0;
          min-width: 100%;
          padding: 0;
          text-align: left;
          width: 100% !important;
        "
      >
        <span
          class="preheader"
          style="
            color: #f3f3f3;
            display: none !important;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            mso-hide: all !important;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
          "
        ></span>
        <table
          class="body"
          style="
            margin: 0;
            background: #f3f3f3 !important;
            border-collapse: collapse;
            border-spacing: 0;
            color: #0a0a0a;
            font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
            font-size: 16px;
            font-weight: 400;
            height: 100%;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            text-align: left;
            vertical-align: top;
            width: 100%;
          "
        >
          <tr style="padding: 0; text-align: left; vertical-align: top">
            <td
              class="center"
              align="center"
              valign="top"
              style="
                -moz-hyphens: auto;
                -webkit-hyphens: auto;
                margin: 0;
                border-collapse: collapse !important;
                color: #0a0a0a;
                font-family: Poppins, sans-serif, Helvetica, Arial, sans-serif;
                font-size: 16px;
                font-weight: 400;
                hyphens: auto;
                line-height: 1.3;
                margin: 0;
                padding: 0;
                text-align: left;
                vertical-align: top;
                word-wrap: break-word;
              "
            >
              <center data-parsed style="min-width: 768px; width: 100%">
                <table
                  align="center"
                  class="wrapper float-center"
                  style="
                    margin: 0 auto;
                    border-collapse: collapse;
                    border-spacing: 0;
                    float: none;
                    margin: 0 auto;
                    padding: 0;
                    text-align: center;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <tr style="padding: 0; text-align: left; vertical-align: top">
                    <td
                      class="wrapper-inner"
                      style="
                        -moz-hyphens: auto;
                        -webkit-hyphens: auto;
                        margin: 0;
                        border-collapse: collapse !important;
                        color: #0a0a0a;
                        font-family: Poppins, sans-serif, Helvetica, Arial,
                          sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        hyphens: auto;
                        line-height: 1.3;
                        margin: 0;
                        padding: 0;
                        text-align: left;
                        vertical-align: top;
                        word-wrap: break-word;
                      "
                    >
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="row bg__gray-1"
                                style="
                                  background-color: #f3f3f3 !important;
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-6 large-6 columns first"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 8px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__logo"
                                              style="
                                                align-items: center;
                                                display: flex;
                                              "
                                            >
                                              <img
                                                src="https://i.ibb.co/8rrpLdq/Group-1-1.png"
                                                alt
                                                style="
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: block;
                                                  max-width: 100%;
                                                  outline: 0;
                                                  text-decoration: none;
                                                  width: auto;
                                                "
                                              />
                                              <span
                                                class="bold font__size--36 text__36-sm text color__pink"
                                                style="
                                                  color: #ff008e !important;
                                                  font-size: 36px;
                                                  font-weight: 700 !important;
                                                  margin-left: 1rem;
                                                "
                                                >StreaMint</span
                                              >
                                            </div>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                    <th
                                      class="small-6 large-6 columns last"
                                      valign="middle"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 8px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 368px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <p
                                              class="text-right mb-0 font__size--18 text__18-sm text__18-xs"
                                              style="
                                                margin: 0;
                                                margin-bottom: 10px;
                                                color: #0a0a0a;
                                                font-family: Poppins, sans-serif,
                                                  Helvetica, Arial, sans-serif;
                                                font-size: 18px;
                                                font-weight: 400;
                                                line-height: 1.3;
                                                margin: 0;
                                                margin-bottom: 0 !important;
                                                padding: 0;
                                                text-align: right;
                                              "
                                            >
                                              ¡Los mejores eventos<br />en línea!
                                            </p>
                                          </th>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="15px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 15px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 15px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <img
                                src="https://i.ibb.co/dJVZ3jr/unsplash-ru-Jm3d-BXCqw.png"
                                class="images__4"
                                alt
                                style="
                                  -ms-interpolation-mode: bicubic;
                                  clear: both;
                                  display: block;
                                  height: 350px;
                                  max-width: 100%;
                                  object-fit: cover;
                                  outline: 0;
                                  text-decoration: none;
                                  width: 100% !important;
                                "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="row"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  display: table;
                                  padding: 0;
                                  position: relative;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <th
                                      class="small-12 large-12 columns first last"
                                      style="
                                        margin: 0 auto;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 1.3;
                                        margin: 0 auto;
                                        padding: 0;
                                        padding-bottom: 16px;
                                        padding-left: 16px;
                                        padding-right: 16px;
                                        text-align: left;
                                        width: 752px;
                                      "
                                    >
                                      <table
                                        style="
                                          border-collapse: collapse;
                                          border-spacing: 0;
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                          width: 100%;
                                        "
                                      >
                                        <tr
                                          style="
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                          "
                                        >
                                          <th
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0;
                                              text-align: left;
                                            "
                                          >
                                            <div
                                              class="wrapper__box"
                                              style="padding: 1rem 2rem"
                                            >
                                              <p
                                                class="normal font__size--18 text__18-sm lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                "
                                              >
                                              </p>
                                              <h4
                                                class="semi-bold font__size--28 text__28-sm mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: inherit;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 28px;
                                                  font-weight: 600 !important;
                                                  line-height: 1.3;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  padding: 0;
                                                  text-align: left;
                                                  word-wrap: normal;
                                                "
                                              >
                                                ¡Hola! 😄
                                              </h4>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                 
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-1"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                                  Lamentamos comunicarte que el evento al que estabas invitado fue suspendido.
                                                  ¡Esperamos verte en el próximo evento virtual!
                                            
                                              </p>
                                              <p
                                                class="normal font__size--18 text__18-sm opacity__5 lh-2 mb-2"
                                                style="
                                                  margin: 0;
                                                  margin-bottom: 10px;
                                                  color: #0a0a0a;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 18px;
                                                  font-weight: 400 !important;
                                                  line-height: 2 !important;
                                                  margin: 0;
                                                  margin-bottom: 1.5rem;
                                                  opacity: 0.5;
                                                  padding: 0;
                                                  text-align: left;
                                                  transition: 0.5s;
                                                "
                                              >
                                              Te esperamos. 
                                              
                                              ¡Chequeá la cuenta regresiva aquí!

                                              </p>
                                              <table
                                                class="button semi-bold font__size--18 text__18-sm color__white btn__link-more mb-0"
                                                style="
                                                  margin: 0 0 16px 0;
                                                  border-collapse: collapse;
                                                  border-spacing: 0;
                                                  color: #fff !important;
                                                  font-size: 18px;
                                                  font-weight: 600 !important;
                                                  margin: 0 0 16px 0;
                                                  margin-bottom: 0 !important;
                                                  padding: 0;
                                                  text-align: left;
                                                  vertical-align: top;
                                                  width: auto;
                                                "
                                              >
                                                <tr
                                                  style="
                                                    padding: 0;
                                                    text-align: left;
                                                    vertical-align: top;
                                                  "
                                                >
                                                  <td
                                                    style="
                                                      -moz-hyphens: auto;
                                                      -webkit-hyphens: auto;
                                                      margin: 0;
                                                      background-color: #d22779 !important;
                                                      border: 1px solid #d22779 !important;
                                                      border-collapse: collapse !important;
                                                      color: #0a0a0a;
                                                      font-family: Poppins,
                                                        sans-serif, Helvetica, Arial,
                                                        sans-serif;
                                                      font-size: 16px;
                                                      font-weight: 400;
                                                      hyphens: auto;
                                                      line-height: 1.3;
                                                      margin: 0;
                                                      padding: 0;
                                                      text-align: left;
                                                      vertical-align: top;
                                                      word-wrap: break-word;
                                                    "
                                                  >
                                                    <table
                                                      style="
                                                        border-collapse: collapse;
                                                        border-spacing: 0;
                                                        padding: 0;
                                                        text-align: left;
                                                        vertical-align: top;
                                                        width: 100%;
                                                      "
                                                    >
                                                      <tr
                                                        style="
                                                          padding: 0;
                                                          text-align: left;
                                                          vertical-align: top;
                                                        "
                                                      >
                                                        <td
                                                          style="
                                                            -moz-hyphens: auto;
                                                            -webkit-hyphens: auto;
                                                            margin: 0;
                                                            background: #2199e8;
                                                            background-color: #d22779 !important;
                                                            border: 1px solid
                                                              #d22779 !important;
                                                            border-collapse: collapse !important;
                                                            color: #fefefe;
                                                            font-family: Poppins,
                                                              sans-serif, Helvetica,
                                                              Arial, sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            hyphens: auto;
                                                            line-height: 1.3;
                                                            margin: 0;
                                                            padding: 0;
                                                            text-align: left;
                                                            vertical-align: top;
                                                            word-wrap: break-word;
                                                          "
                                                        >
                                                          <a
                                                            href="http://localhost:3000/register"
                                                            style="
                                                              margin: 0;
                                                              background-color: #d22779 !important;
                                                              border: 1px solid
                                                                #d22779 !important;
                                                              border-radius: 3px;
                                                              color: #fefefe;
                                                              display: inline-block;
                                                              font-family: Poppins,
                                                                sans-serif,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 16px;
                                                              font-weight: 700;
                                                              line-height: 1.3;
                                                              margin: 0;
                                                              padding: 20px 54px !important;
                                                              text-align: left;
                                                              text-decoration: none;
                                                            "
                                                            >Ingresá al sitio</a
                                                          >
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </th>
                                          <th
                                            class="expander"
                                            style="
                                              margin: 0;
                                              color: #0a0a0a;
                                              font-family: Poppins, sans-serif,
                                                Helvetica, Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              line-height: 1.3;
                                              margin: 0;
                                              padding: 0 !important;
                                              text-align: left;
                                              visibility: hidden;
                                              width: 0;
                                            "
                                          ></th>
                                          <td>
                                          </td>
                                        </tr>
                                      </table>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                class="spacer"
                                style="
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                  padding: 0;
                                  text-align: left;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr
                                    style="
                                      padding: 0;
                                      text-align: left;
                                      vertical-align: top;
                                    "
                                  >
                                    <td
                                      height="35px"
                                      style="
                                        -moz-hyphens: auto;
                                        -webkit-hyphens: auto;
                                        margin: 0;
                                        border-collapse: collapse !important;
                                        color: #0a0a0a;
                                        font-family: Poppins, sans-serif, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 35px;
                                        font-weight: 400;
                                        hyphens: auto;
                                        line-height: 35px;
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        padding: 0;
                                        text-align: left;
                                        vertical-align: top;
                                        word-wrap: break-word;
                                      "
                                    >
                                      &#xA0;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="40px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 40px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 40px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        class="container bg__gray-1"
                        style="
                          margin: 0 auto;
                          background: #fefefe;
                          background-color: #f3f3f3 !important;
                          border-collapse: collapse;
                          border-spacing: 0;
                          margin: 0 auto;
                          padding: 0;
                          text-align: inherit;
                          vertical-align: top;
                          width: 768px;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 1.3;
                                margin: 0;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              <div
                                class="text__center w-100"
                                style="text-align: center; width: 100% !important"
                              >
                                <div
                                  class="d-inline-block"
                                  style="display: inline-block"
                                >
                                  <h4
                                    class="normal font__size--18 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: inherit;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 18px;
                                      font-weight: 400 !important;
                                      line-height: 1.3;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      padding: 0;
                                      text-align: center;
                                      word-wrap: normal;
                                    "
                                  >
                                    With ❤️ from
                                    <span
                                      class="color__pink"
                                      style="color: #ff008e !important"
                                      >StreaMint</span
                                    >
                                  </h4>
                                  <p
                                    class="opacity__5 lh-2 font__size--14 text-center"
                                    style="
                                      margin: 0;
                                      margin-bottom: 10px;
                                      color: #0a0a0a;
                                      font-family: Poppins, sans-serif, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 2 !important;
                                      margin: 0;
                                      margin-bottom: 10px;
                                      opacity: 0.5;
                                      padding: 0;
                                      text-align: center;
                                      transition: 0.5s;
                                    "
                                  >
                                    Buenos Aires<br />Argentina
                                  </p>
                                  <center
                                    data-parsed
                                    style="min-width: 768px; width: 100%"
                                  >
                                    <table
                                      align="center"
                                      class="menu list__sosmed float-center"
                                      style="
                                        margin: 0 auto;
                                        border-collapse: collapse;
                                        border-spacing: 0;
                                        float: none;
                                        margin: 0 auto;
                                        padding: 0;
                                        text-align: center;
                                        vertical-align: top;
                                        width: auto !important;
                                      "
                                    >
                                      <tr
                                        style="
                                          padding: 0;
                                          text-align: left;
                                          vertical-align: top;
                                        "
                                      >
                                        <td
                                          style="
                                            -moz-hyphens: auto;
                                            -webkit-hyphens: auto;
                                            margin: 0;
                                            border-collapse: collapse !important;
                                            color: #0a0a0a;
                                            font-family: Poppins, sans-serif,
                                              Helvetica, Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: 400;
                                            hyphens: auto;
                                            line-height: 1.3;
                                            margin: 0;
                                            padding: 0;
                                            text-align: left;
                                            vertical-align: top;
                                            word-wrap: break-word;
                                          "
                                        >
                                          <table
                                            style="
                                              border-collapse: collapse;
                                              border-spacing: 0;
                                              padding: 0;
                                              text-align: left;
                                              vertical-align: top;
                                            "
                                          >
                                            <tr
                                              style="
                                                padding: 0;
                                                text-align: left;
                                                vertical-align: top;
                                              "
                                            >
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/LrvZF08/mdi-web.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Yp7SSQS/akar-icons-twitter-fill.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/TwPdsg7/ant-design-instagram-filled.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                              <th
                                                class="menu-item float-center"
                                                style="
                                                  margin: 0 auto;
                                                  color: #0a0a0a;
                                                  float: none;
                                                  font-family: Poppins, sans-serif,
                                                    Helvetica, Arial, sans-serif;
                                                  font-size: 16px;
                                                  font-weight: 400;
                                                  line-height: 1.3;
                                                  margin: 0 auto;
                                                  padding: 5px !important;
                                                  padding-right: 10px;
                                                  text-align: center;
                                                "
                                              >
                                                <a
                                                  href="#!"
                                                  style="
                                                    margin: 0;
                                                    align-items: center;
                                                    background-color: #0c1e7f;
                                                    border-radius: 50%;
                                                    color: #2199e8;
                                                    display: flex;
                                                    font-family: Poppins, sans-serif,
                                                      Helvetica, Arial, sans-serif;
                                                    font-weight: 400;
                                                    height: 35px;
                                                    justify-content: center;
                                                    line-height: 1.3;
                                                    margin: 0;
                                                    padding: 5px;
                                                    text-align: left;
                                                    text-decoration: none;
                                                    width: 35px;
                                                  "
                                                  ><img
                                                    src="https://i.ibb.co/Y08N0jJ/cib-tiktok.png"
                                                    alt
                                                    style="
                                                      -ms-interpolation-mode: bicubic;
                                                      border: none;
                                                      clear: both;
                                                      display: block;
                                                      max-width: 100%;
                                                      outline: 0;
                                                      text-decoration: none;
                                                      width: auto;
                                                    "
                                                /></a>
                                              </th>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="spacer"
                        style="
                          border-collapse: collapse;
                          border-spacing: 0;
                          padding: 0;
                          text-align: left;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <tbody>
                          <tr
                            style="
                              padding: 0;
                              text-align: left;
                              vertical-align: top;
                            "
                          >
                            <td
                              height="30px"
                              style="
                                -moz-hyphens: auto;
                                -webkit-hyphens: auto;
                                margin: 0;
                                border-collapse: collapse !important;
                                color: #0a0a0a;
                                font-family: Poppins, sans-serif, Helvetica, Arial,
                                  sans-serif;
                                font-size: 30px;
                                font-weight: 400;
                                hyphens: auto;
                                line-height: 30px;
                                margin: 0;
                                mso-line-height-rule: exactly;
                                padding: 0;
                                text-align: left;
                                vertical-align: top;
                                word-wrap: break-word;
                              "
                            >
                              &#xA0;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
        <!-- prevent Gmail on iOS font size manipulation -->
        <div
          style="
            display: none;
            white-space: nowrap;
            font: 15px courier;
            line-height: 0;
          "
        >
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      </body>
    </html>
    `,
  };
  transporter.sendMail(emailConfig, (error, info) => {
    res.status(200).json(emailConfig);
  });
};
