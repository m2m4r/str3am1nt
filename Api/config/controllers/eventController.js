const { updateLocale } = require("moment-timezone");
const { Event, User } = require("../../models");

exports.addEvent = async (req, res) => {
  const newEvent = await Event.create(req.body);
  res.status(201).send(newEvent);
};

exports.modifyEvent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updatedEvent = await Event.update(req.body, {
      where: {
        id: id,
      },
      individualHooks: true,
    });

    res.status(201).send(updatedEvent[1][0]);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {

    const {id} = req.params;
    try {
      const event = await Event.destroy({
        where: {id:id},
        include:[{model: User}],
        })
    
    res.status(201).send('Evento eliminado con éxito.')
    } catch (err) {
      res.send(err);
    }
}


exports.findEvents = async (req, res) => {
  const events = await Event.findAll();
  res.send(events);
};

exports.findEvent = async (req, res) => {
  const { title } = req.params;
  const event = await Event.findAll({ where: { title } });
  res.send(event);
};

exports.findEventWithUsers = async (req, res) => {
  const { title } = req.params;
  const event = await Event.findOne({ where: { title }, include: User });
  res.send(event);
};

exports.findEventId = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findAll({ where: { id } });
  res.send(event);
};

exports.findToken = async (req, res) => {
  const token = req.params.token;
  const search = await Event.findOne({ where: { token: token } });
  if (token === null) {
    res.send(search);
  } else {
    res.send(search);
  }
};
