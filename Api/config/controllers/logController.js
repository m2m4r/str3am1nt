const { Log } = require("../../models/index");

exports.logActions = async (req, res) => {
  const newAction = await Log.create(req.body);
  res.status(201).send(newAction);
};

exports.listActionsLog = async (req, res) => {
  const actionList = await Log.findAll();
  res.status(200).send(actionList);
};

exports.createOrModifyLog = async (req, res) => {
  const { eventId, id, email } = req.body;
  const [registry, created] = await Log.findOrCreate({
    where: { eventId: eventId },
    defaults: {
      eventId: eventId,
      action: "sentReminder",
      payload: [{ id: id, email: email }],
    },
  });
  if (!created) {
    let arr = [];
    arr = registry.payload.concat([{ id: id, email: email }]);
    await registry.update({ payload: arr });
  }
  res.status(200).send(registry);
};
