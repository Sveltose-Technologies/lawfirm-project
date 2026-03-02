const { DataTypes } = require("sequelize");
const sequelize = require("../configer/dbconfig");

const Promoter = sequelize.define(
  "promoters",
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

    personImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    specialization: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    
  },
  {
    tableName: "promoters",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Promoter;
