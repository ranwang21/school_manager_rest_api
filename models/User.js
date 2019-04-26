"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "First Name cannot be empty"
          }
        }
      },
      lastName: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Last Name cannot be empty"
          }
        }
      },
      emailAddress: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty"
          },
          isEmail: {
            msg: "Please input valid email"
          }
        }
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    models.User.hasMany(models.Course);
  };
  return User;
};
