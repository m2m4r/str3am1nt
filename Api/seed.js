const db = require("./config/db");
const { Role, User } = require("./models");

const setupSeed = async () => {
  const roles = [
    { rolName: "user" },
    { rolName: "admin" },
    { rolName: "superAdmin" },
  ];
  const superAdmin1 = {
    name: "admin",
    lastName: "admin",
    email: "streamint3@gmail.com",
    password: "35957098",
  };
  const superAdmin2 = {
    name: "admin",
    lastName: "admin",
    email: "streamint-3@gmail.com",
    password: "38042589",
  };
  const rolesSeedeados = await Role.bulkCreate(roles);
  const adminSeedeado1 = await User.create(superAdmin1);
  const adminSeedeado2 = await User.create(superAdmin2);
  const adminUpdate1 = await User.update(
    { roleId: 3 },
    { where: { id: adminSeedeado1.id } }
  );
  const adminUpdate2 = await User.update(
    { roleId: 3 },
    { where: { id: adminSeedeado2.id } }
  );
};

db.sync().then(setupSeed);
