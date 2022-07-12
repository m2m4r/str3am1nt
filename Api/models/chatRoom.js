const { DataTypes, Model } = require("sequelize");
const db = require("../config/db");

class Chat extends Model {}

Chat.init(
  {
    eventId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "chats",
  }
);

module.exports = Chat;
