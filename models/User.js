"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First Name cannot be empty"
          },
          // length between 2 and 16
          len: [2, 16],
          // only allow alphabetic input
          isAlpha: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last Name cannot be empty"
          },
          len: [2, 16],
          isAlpha: true
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide a password"
          }
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
