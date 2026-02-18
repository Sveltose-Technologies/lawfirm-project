const { DataTypes } = require("sequelize");
const sequelize = require("../configer/dbconfig");

const Award = sequelize.define(
  "awards",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bannerImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    personName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    awardTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    details: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    tableName: "awards",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Award;
