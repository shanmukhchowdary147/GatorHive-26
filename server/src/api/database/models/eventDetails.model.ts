import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const EventDetails = sequelizeExtend.extendedDefine(
    sequelize,
    collections.EventDetails,
    {
      addressId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: collections.Address,
          } as any,
          key: "id",
        },
      },
      hostedByUserId: {
        type: dataType.UUID,
        references: {
          model: {
            tableName: collections.User,
          } as any,
          key: "id",
        },
      },
      studentOrgId: {
        type: dataType.UUID,
        references: {
          model: {
            tableName: collections.StudentOrg,
          } as any,
          key: "id",
        },
      },
      eventName: {
        type: dataType.STRING,
        allowNull: false,
      },
      ifPrivateParty: {
        type: dataType.BOOLEAN,
      },
      eventDetails: {
        type: dataType.TEXT,
      },
      capacity: {
        type: dataType.INTEGER,
      },
      eventAtUtc: {
        type: dataType.DATE,
      },
    }
  );

  return EventDetails;
};
