const { DataTypes } = require("sequelize");
const sequelize = require("../configer/dbconfig");

const Chat = sequelize.define("chat", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  senderType: {
    type: DataTypes.ENUM("admin", "client", "attorney"),
    allowNull: false,
  },

  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  receiverType: {
    type: DataTypes.ENUM("admin", "client", "attorney"),
    allowNull: false,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  tableName: "chat",
  timestamps: true,
});

module.exports = Chat;