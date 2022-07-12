const { DataTypes, Model } = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class User extends Model {
  setHash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    publicAddress: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
      validate: { isLowercase: true },
    },
    poapLink: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

User.addHook("beforeCreate", (user) => {
  return (user.roleId = 1); // 'user' por default
});

User.addHook("beforeCreate", (user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.setHash(user.password, user.salt);
    })
    .then((hashedPassword) => (user.password = hashedPassword));
});

module.exports = User;
