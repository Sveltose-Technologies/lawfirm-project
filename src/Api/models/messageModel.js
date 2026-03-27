// models/message.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configer/dbconfig");

const Message = sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    freezeTableName: true,
    timestamps: true, 
  }
);

module.exports = Message;