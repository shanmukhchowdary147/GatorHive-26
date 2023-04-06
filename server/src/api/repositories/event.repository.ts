import logger from "../common/logger/logger";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class EventRepository {
  update = async (
    condition: any,
    data?: any,
    transaction?: any
  ): Promise<any> => {
    await mysqlProxy.update(collections.Event, condition, data, transaction);
  };

  getAllEvents = async (condition: any = {}): Promise<any> => {
    const events = await mysqlProxy.find(collections.Event, condition, {
      raw: true,
    });
    return events;
  };
  create = async (data: any, transaction?: any) => {
    const event = await mysqlProxy.create(collections.Event, data, transaction);
    return event;
  };
  findOne = async (condition: any, options: any = {}) => {
    logger.debug(
      "find one member record from db",
      { condition },
      __filename,
      "findOne"
    );
    const event = await mysqlProxy.findOne(
      collections.Event,
      condition,
      options
    );
    logger.debug(
      "got member record from db",
      { event, condition },
      __filename,
      "findOne"
    );
    return event;
  };
  async find(condition: any, options?: any) {
    return mysqlProxy.find(collections.Event, condition, options);
  }
}

export const eventRepository = new EventRepository();
