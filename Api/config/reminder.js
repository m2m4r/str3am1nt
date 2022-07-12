const Event = require("../models/event.js");
const User = require("../models/user.js");
const axios = require("axios");
const { Op } = require("sequelize");
const Log = require("../models/log.js");
const id = require("volleyball/lib/id");

const sendReminder = async () => {
  //obtengo la fecha actual y la paso a formato ISO
  const actualDateToISOString = new Date().toISOString();
  const actualDate = actualDateToISOString.slice(0, 10);

  //busco los eventos recientes a partir de la fecha actual sin incluir la hora
  const closestEvents = await Event.findAll({
    where: {
      dayBefore: { [Op.iLike]: "%" + actualDate + "%" },
    },
  });

  //creo un arreglo con los id de eventos recientes
  let listOfEvents = [];
  for (let i = 0; i < closestEvents.length; i++) {
    listOfEvents.push(closestEvents[i].dataValues.id);
  }

  //busco los users que tienen un id que esté contenido en el arreglo de eventos recientes
  const selectedUsers = await User.findAll({
    where: { eventId: { [Op.in]: listOfEvents } },
  });

  //capturo los eventos que tienen un reminder enviado
  const eventsReminderSent = await Log.findAll({
    where: { action: "sentReminder" },
  });

  //caso en el que eventReminderSent es 0 y se envian los correos sin discriminar, sólo será en el primer caso histórico/base de datos limpia recién levantada
  if (eventsReminderSent.length === 0) {
    for (let i = 0; i < selectedUsers.length; i++) {
      const { id, name, lastName, email, eventId } = selectedUsers[
        i
      ].dataValues;
      await axios.post("http://localhost:3001/api/nodemailer/sendReminder", {
        id: id,
        name: name,
        lastName: lastName,
        email: email,
        eventId: eventId,
      });
      await axios.post("http://localhost:3001/api/logs/reminderLogs", {
        eventId: eventId,
        email: email,
        id: id,
      });
    }
  } else {
    //capturo los payloads (id+email) de los eventos que tienen reminder enviado
    const payloadEventReminderSent = [];
    for (let i = 0; i < eventsReminderSent.length; i++) {
      payloadEventReminderSent.push(eventsReminderSent[i].dataValues.payload);
    }

    //capturo los emails de los payloads
    const emails = [];
    for (let i = 0; i < payloadEventReminderSent[0].length; i++) {
      emails.push(payloadEventReminderSent[0][i].email);
    }

    //filtro los usuarios que no recibieron todavía el correo, por no estar su email en el arreglo de emails
    const filteredUsers = [];
    for (let i = 0; i < selectedUsers.length; i++) {
      if (!emails.includes(selectedUsers[i].dataValues.email)) {
        filteredUsers.push(selectedUsers[i]);
      }
    }

    if (filteredUsers.length > 0) {
      for (let i = 0; i < filteredUsers.length; i++) {
        const { id, name, lastName, email, eventId } = filteredUsers[i];
        await axios.post("http://localhost:3001/api/nodemailer/sendReminder", {
          id: id,
          name: name,
          lastName: lastName,
          email: email,
          eventId: eventId,
        });
        await axios.post("http://localhost:3001/api/logs/reminderLogs", {
          eventId: eventId,
          email: email,
          id: id,
        });
      }
    }
  }
};

module.exports = sendReminder;
