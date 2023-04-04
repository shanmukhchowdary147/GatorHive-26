import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const User = sequelizeExtend.extendedDefine(sequelize, collections.User, {
    addressId: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: collections.Address,
        } as any,
        key: "id",
      },
    },

    firstName: {
      type: dataType.STRING(254),
      allowNull: false,
    },
    lastName: {
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
