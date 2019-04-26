"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: DataTypes.TEXT,
      lastName: DataTypes.TEXT,
      emailAddress: DataTypes.TEXT,
      password: DataTypes.TEXT
    },
    {}
  );
  User.associate = function(models) {
    models.User.hasMany(models.Course);
  };
  return User;
};
