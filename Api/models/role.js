const { DataTypes, Model } = require("sequelize");
const db = require("../config/db");

class Role extends Model {}

Role.init(
  {
    rolName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "roles",
  }
);

module.exports = Role;
