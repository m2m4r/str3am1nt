const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../config/db");

const tokenMax = 8;
let abecedario = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    initialDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dayBefore: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "events",
  }
);

Event.addHook("beforeCreate", (event) => {
  let token = "";
  for (let i = 0; i < tokenMax; i++) {
    token +=
      abecedario[
        (Math.random() * (abecedario.length - 1)).toFixed(0).toUpperCase()
      ];
  }
  event.token = token;
});

Event.addHook("beforeCreate", (event) => {
  const eventDayToString = event.initialDate.toString();
  const sliceToDayBefore = eventDayToString.slice(8, 11) - 1;
  const dayEvent = new Date(event.initialDate);
  event.dayBefore = new Date(dayEvent.setDate(sliceToDayBefore));
});

Event.addHook("beforeUpdate", (event) => {
  const eventDayToString = event.initialDate.toString();
  const sliceToDayBefore = eventDayToString.slice(8, 11) - 1;
  const dayEvent = new Date(event.initialDate);
  event.dayBefore = new Date(dayEvent.setDate(sliceToDayBefore));
});

module.exports = Event;
