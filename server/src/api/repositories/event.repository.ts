import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class EventRepository {
  update = async ({ condition, data, transaction }: any): Promise<any> => {
    await mysqlProxy.update(
      mysqlProxy.collections.PartnerFinancier,
      condition,
      data,
      transaction
    );
  };

  getAllEvents = async (): Promise<any> => {
    const events = await mysqlProxy.find(collections.Event);
    return events;
  };
}

export const eventRepository = new EventRepository();
