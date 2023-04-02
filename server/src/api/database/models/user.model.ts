import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const User = sequelizeExtend.extendedDefine(sequelize, collections.User, {
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: collections.Address,
        } as any,
        key: "id",
      },
    },

    firstname: {
      type: dataType.STRING(254),
      allowNull: false,
    },
    lastname: {
      type: dataType.STRING(254),
      allowNull: false,
    },
    lastLoggedInAtUtc: {
      type: dataType.DATE,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: dataType.STRING(254),
      allowNull: false,
    },
    phoneNumber: {
      type: dataType.STRING(15),
    },
  });

  return User;
};
