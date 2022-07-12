const Role = require("./role");
const User = require("./user");
const Event = require("./event");
const Log = require("./log");
const Chat = require("./chatRoom");


User.belongsTo(Role)
User.belongsTo(Event,{onDelete: 'cascade', foreignKey:  'eventId'})
Event.hasMany(User,{onDelete: 'cascade', foreignKey:  'eventId'})


module.exports = { User, Role, Event, Log, Chat };
