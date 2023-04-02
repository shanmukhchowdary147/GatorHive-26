import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const StudentOrgAccounts = sequelizeExtend.extendedDefine(
    sequelize,
    collections.StudentOrgAccounts,
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
      studentOrgId: {
        type: dataType.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: collections.StudentOrg,
          } as any,
          key: "id",
        },
      },
      userRole: {
        type: dataType.INTEGER,
      },
    }
  );

  return StudentOrgAccounts;
};
