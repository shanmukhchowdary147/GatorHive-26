import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const StudentOrg = sequelizeExtend.extendedDefine(
    sequelize,
    collections.StudentOrg,
    {
      orgName: {
        type: dataType.STRING,
        allowNull: false,
      },
    }
  );

  return StudentOrg;
};
