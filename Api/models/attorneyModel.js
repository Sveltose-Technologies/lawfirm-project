const { DataTypes } = require("sequelize");
const sequelize = require("../configer/dbconfig.js");

const Attorney = sequelize.define(
  "attorney",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    activationToken: DataTypes.STRING,

    street: DataTypes.STRING(100),
    aptBlock: DataTypes.STRING(50),

    city: DataTypes.INTEGER,
    state: DataTypes.STRING(50),
    country: DataTypes.STRING(50),
    zipCode: DataTypes.STRING(10),

    locationId: DataTypes.INTEGER,

    phoneCell: DataTypes.STRING(15),
    phoneHome: DataTypes.STRING(15),
    phoneOffice: DataTypes.STRING(15),

    dob: DataTypes.DATEONLY,

    language: DataTypes.JSON,

    profileImage: DataTypes.STRING,

    servicesOffered: DataTypes.JSON,

    education: DataTypes.JSON,
    admission: DataTypes.JSON,
    experience: DataTypes.JSON,

    barCouncilIndiaNo: DataTypes.STRING,
    barCouncilIndiaId: DataTypes.STRING,

    barCouncilStateNo: DataTypes.STRING,
    barCouncilStateId: DataTypes.STRING,

    familyLawPractice: DataTypes.BOOLEAN,
    familyDetails: DataTypes.JSON,

    kycIdentity: DataTypes.JSON,
    kycAddress: DataTypes.JSON,

    resume: DataTypes.STRING,

    resetOtp: DataTypes.STRING,
    resetOtpExpire: DataTypes.BIGINT,
    resetOtpVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    termsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "attorney",
    timestamps: true,
  }
);

module.exports = Attorney;