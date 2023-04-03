import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const Registrations = sequelizeExtend.extendedDefine(
    sequelize,
    collections.Registrations,
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: collections.User,
          } as any,
          key: "id",
        },
      },
      eventId: {
        type: dataType.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: collections.Event,
          } as any,
          key: "id",
        },
      },
      registeredAtUtc: {
        type: dataType.DATE,
      },
    }
  );

  return Registrations;
};
