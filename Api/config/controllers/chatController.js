const { Chat } = require("../../models");

exports.addMessage = async (req, res) => {
  const newMessage = await Chat.create(req.body);
  res.status(201).send(newMessage);
};

exports.chatList = async (req, res) => {
  const { eventId } = req.params;
  const messageList = await Chat.findAll({ where: { eventId } });
  res.status(200).send(messageList);
};
