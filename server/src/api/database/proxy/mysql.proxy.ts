import { readdir } from "fs-extra";
import path from "path";
import {
  Model,
  ModelStatic,
  Sequelize,
  Transaction,
  DataTypes,
} from "sequelize";
import { modelsDir } from "../models";
import { dbconfig } from "../../../config/vars";
import { collections } from "../../enums/enums";
import logger from "../../common/logger/logger";

class MysqlProxy {
  collections: Record<string, string>;

  models: Record<string, any>;

  sequelize: Sequelize;

  constructor() {
    console.log(dbconfig.dbConnectionURL);
    this.sequelize = new Sequelize(dbconfig.dbConnectionURL, {
      dialect: "mysql",
      pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        idle: dbconfig.pool.idle,
        acquire: dbconfig.pool.acquire,
      },
    });

    this.collections = { ...collections };
    this.models = {};
  }

  async sync(syncDb = false, forceSync = false) {
    if (syncDb) {
      await this.sequelize.query("CREATE SCHEMA IF NOT EXISTS `gator_hive`");
    }
    const files = (await readdir(modelsDir)).filter(
      (file: string) => file.endsWith(".model.js") || file.endsWith(".model.ts")
    );

    await Promise.all(
      files.map(async (file: string) => {
        const modelDefinition = await require(path.join(modelsDir, file))
          .default;
        const model = modelDefinition(this.sequelize, DataTypes);
        this.models[model.name] = model;
      })
    );
    // this.sequelize
    //   .query("SET FOREIGN_KEY_CHECKS = 0")
    //   .then(() => this.sequelize.sync({ force: true }))
    //   .then(() => this.sequelize.query("SET FOREIGN_KEY_CHECKS = 1"));

    if (syncDb) {
      await this.sequelize.sync({ force: forceSync, alter: !forceSync });
    }

    this.models.sequelize = this.sequelize;
    this.models.Sequelize = Sequelize;
    return this.models;
  }

  getCollection(collection: string) {
    return this.models[collection] as ModelStatic<any>;
  }

  async findOne(
    collection: string,
    condition?: Record<string, any>,
    options?: Record<string, any>
  ) {
    return this.getCollection(collection).findOne({
      where: condition,
      ...options,
    });
  }

  async find(
    collection: string,
    condition: Record<string, any> = {},
    options: Record<string, any> = {}
  ) {
    return this.getCollection(collection).findAll({
      where: condition,
      ...options,
    });
  }

  async bulkCreate(
    collection: string,
    data: Record<string, any>[],
    options: Record<string, any>
  ) {
    return this.getCollection(collection).bulkCreate(data, { ...options });
  }

  async create(
    collection: string,
    data: Record<string, any>,
    transaction?: Transaction
  ) {
    return this.getCollection(collection).create(data, {
      isNewRecord: true,
      validate: true,
      transaction,
    });
  }

  async delete(
    collection: string,
    condition: Record<string, any>,
    transaction?: Transaction
  ) {
    return this.getCollection(collection).destroy({
      where: condition,
      transaction,
    });
  }

  async update(
    collection: string,
    condition: Record<string, any>,
    data: Record<string, any>,
    transaction?: Transaction
  ) {
    return this.getCollection(collection).update(data, {
      where: condition,
      validate: true,
      fields: Object.keys(data),
      transaction,
    });
  }

  async save(data: any, transaction?: Transaction) {
    return data.save({ transaction });
  }

  async createTransaction() {
    return this.sequelize.transaction();
  }

  async query(sql: string, options: Record<string, any>) {
    return this.sequelize.query(sql, {
      ...options,
    });
  }

  async upsert(
    collection: string,
    data: Record<string, any>,
    transaction?: Transaction
  ) {
    return this.getCollection(collection).upsert(data, {
      validate: true,
      fields: Object.keys(data),
      transaction,
    });
  }
}

export const mysqlProxy = new MysqlProxy();
