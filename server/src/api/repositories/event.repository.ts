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
}

export const eventRepository = new EventRepository();
