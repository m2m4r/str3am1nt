const { DataTypes, Model } = require("sequelize");
const db = require("../config/db");

class Log extends Model {}

Log.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payload: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "logs",
  }
);

module.exports = Log;
