import { extend } from "lodash";
import Sequelize, { DataTypes, ModelAttributes, ModelOptions } from "sequelize";
// import { v4 as uuidv4 } from "uuid";

class SequelizeExtend {
  defaultAttributes: ModelAttributes<any>;

  defaultOptions: ModelOptions<any>;

  constructor() {
    this.defaultAttributes = {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    };
    this.defaultOptions = { timestamps: true, freezeTableName: true };
  }

  extendedDefine(
    sequelize: Sequelize.Sequelize,
    modelName: string,
    attributes: ModelAttributes<any>,
    options: ModelOptions<any> = {}
  ) {
    extend(attributes, this.defaultAttributes);
    extend(options, this.defaultOptions);
    if (!options.indexes) {
      options.indexes = [];
    }
    const model = sequelize.define(modelName, attributes, options);
    // model.addHook("beforeCreate", (instance: any) => {
    //   instance.id = uuidv4();
    // });

    return model;
  }
}
export const sequelizeExtend = new SequelizeExtend();
