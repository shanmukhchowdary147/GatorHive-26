import { Sequelize, DataTypes } from "sequelize";

import { collections } from "../../enums/enums";
import { sequelizeExtend } from "../proxy/sequelize-extend";

export default (sequelize: Sequelize, dataType: typeof DataTypes) => {
  const Address = sequelizeExtend.extendedDefine(
    sequelize,
    collections.Address,
    {
      roomNumber: {
        type: dataType.TEXT,
      },
      street: {
        type: dataType.TEXT,
      },
      City: {
        type: dataType.STRING,
      },
      State: {
        type: dataType.STRING,
      },
      Country: {
        type: dataType.STRING,
      },
      Pin: {
        type: dataType.INTEGER,
      },
    }
  );

  return Address;
};
