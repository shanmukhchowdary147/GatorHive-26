import { extend } from "lodash";
import { DataTypes, ModelAttributes, ModelOptions, Sequelize } from "sequelize";

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
    sequelize: Sequelize,
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

    return model;
  }
}
export const sequelizeExtend = new SequelizeExtend();
