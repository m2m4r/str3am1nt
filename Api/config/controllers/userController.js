const { User, Role } = require("../../models");
const admin = require("firebase-admin");

exports.register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
};

exports.login = async (req, res) => {
  const uid = req.body.email;

  const additionalClaims = {
    premiumAccount: true,
  };

  const customToken = await admin
    .auth()
    .createCustomToken(uid, additionalClaims);

  await User.update({ isLoggedIn: true }, { where: { email: req.body.email } });

  req.user.dataValues.customToken = customToken;

  res.send(req.user);
};

exports.update = async (req, res) => {
  try {
    const actualizedUser = await User.update(req.body, {
      where: { id: req.user.id },
    });
    res.status(201).send(actualizedUser);
  } catch (err) {
    res.send(err);
  }
};

exports.logOut = async (req, res) => {
  await User.update(
    { isLoggedIn: false },
    { where: { email: req.body.email } }
  );
  req.logOut();
  res.sendStatus(200);
};

exports.me = (req, res) => {
  res.send(req.user);
};

exports.meToken = async (req, res) => {
  try {
    const token = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: [
          "name",
          "lastName",
          "email",
          "password",
          "token",
          "id",
          "createdAt",
          "updatedAt",
          "roleId",
        ],
      },
    });
    if (token.dataValues === "") {
      res.status(200).send(false);
    } else {
      res.status(200).send(token);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addRole = async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    res.send(newRole);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.list = async (req, res) => {
  try {
    const userList = await User.count({ where: { eventId: req.body.eventId } });
    res.status(200).json(userList);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.listEmail = async (req, res) => {
  try {
    const userList = await User.findAll({
      where: { eventId: req.params.eventId },
    });
    let usersArray = [];
    for (let i = 0; i < userList.length; i++) {
      usersArray.push(userList[i].dataValues.email);
    }
    res.status(200).send(usersArray);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.listUsers = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).send(userList);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id },
      new: true,
    });
    res.status(200).send(`Success DELETING user`);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.findByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ where: { email } });
    res.send(user);
  } catch (err) {
    res.sendStatus(200);
  }
};

exports.saveAddress = async (req, res) => {
  const address = req.body.accounts[0];
  const { email } = req.body;
  const user = await User.update(
    { publicAddress: address },
    {
      where: {
        email: email,
      },
    }
  );
  res.sendStatus(200);
};

exports.checkAddress = async (req, res) => {
  const address = req.body.accounts[0];
  const existingAddress = await User.findOne({
    where: { publicAddress: address },
  });
  if (existingAddress) {
    const uid = existingAddress.dataValues.email;
    const customToken = await admin.auth().createCustomToken(uid);
    existingAddress.dataValues.customToken = customToken;
    res.send(existingAddress);
  } else {
    res.send(false);
  }
};

exports.handleError = async (req, res) => {
  res.send(false);
};

exports.getPOAP = async (req, res) => {
  const emailAccount = req.params.email;
  const findPOAP = await User.findOne({ where: { email: emailAccount } });
  const link = findPOAP.dataValues.poapLink;
  res.send(link);
};
