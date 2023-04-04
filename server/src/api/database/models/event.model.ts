import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const Event = sequelizeExtend.extendedDefine(sequelize, collections.Event, {
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
    eventDetails: {
      type: dataType.TEXT,
    },
    capacity: {
      type: dataType.INTEGER,
    },
    eventAtUtc: {
      type: dataType.DATE,
    },
    category: {
      type: dataType.INTEGER,
    },
    food: {
      type: dataType.INTEGER,
    },
    entryFee: {
      type: dataType.INTEGER,
    },
    ifOfficial: {
      type: dataType.BOOLEAN,
    },
    ifGuide: {
      type: dataType.BOOLEAN,
    },
    ifDifferentlyAbledAccebility: {
      type: dataType.BOOLEAN,
    },
    ifParking: {
      type: dataType.BOOLEAN,
    },
    eventType: {
      type: dataType.INTEGER,
    },
    ifRideTogether: {
      type: dataType.BOOLEAN,
    },
    eventOpensAtUtc: {
      type: dataType.DATE,
    },
    ifFreeGoodies: {
      type: dataType.BOOLEAN,
    },
    ifRegisterAsGroup: {
      type: dataType.BOOLEAN,
    },
    ifAlcohol: {
      type: dataType.BOOLEAN,
    },
    ifPetsAllowed: {
      type: dataType.BOOLEAN,
    },
    ifPlusOneAllowed: {
      type: dataType.BOOLEAN,
    },
    posterLink: {
      type: dataType.STRING,
    },
  });

  return Event;
};
