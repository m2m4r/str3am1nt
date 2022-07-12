const geoIp = require("geoip-lite");
require("dotenv").config();

exports.geoIp = (req, res) => {
  const geo = geoIp.lookup("102.128.163.255");
  res.send(geo);
};
