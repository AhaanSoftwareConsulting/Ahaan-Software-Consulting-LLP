const ChatUser = require("../models/ChatUser");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

function chatSocket(io) {

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // USER JOIN
    socket.on("join_user", async ({ userId }) => {
      const user = await ChatUser.findById(userId);

      if (user) {
        user.socketId = socket.id;
        await user.save();

        socket.join(userId.toString());
      }
    });

    // ADMIN JOIN ROOM
    socket.on("admin_join", () => {
      socket.join("admins");
    });

    // USER MESSAGE -> ADMIN
    socket.on("send_message", async ({ conversationId, userId, message }) => {
      
      const msg = await Message.create({
        conversationId,
        sender: "user",
        message
      });

      io.to("admins").emit("new_message_admin", { msg, userId });
      io.to(userId.toString()).emit("message_user", msg);
    });

    // ADMIN MESSAGE -> USER
    socket.on("admin_send", async ({ conversationId, userId, message }) => {

      const msg = await Message.create({
        conversationId,
        sender: "admin",
        message
      });

      io.to(userId.toString()).emit("message_user", msg);
    });
  });
}

module.exports = chatSocket;
