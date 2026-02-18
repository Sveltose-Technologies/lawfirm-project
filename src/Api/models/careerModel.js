const { DataTypes } = require("sequelize");
const sequelize = require("../configer/dbconfig");

const Career = sequelize.define(
  "careers",
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
    },

    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    jobCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    address: {
      type: DataTypes.STRING,
    },

    location: {
      type: DataTypes.ENUM("Onsite", "Hybrid", "Remote", "All"),
      allowNull: false,
    },

    jobType: {
      type: DataTypes.ENUM("FullTime", "PartTime"),
      allowNull: false,
    },

   textEditor: {
  type: DataTypes.TEXT("long"),
  allowNull: false,
},
  },
  {
    tableName: "careers",
    timestamps: true,
  }
);

module.exports = Career;
