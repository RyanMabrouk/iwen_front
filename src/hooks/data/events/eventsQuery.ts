import createNewPathname from '@/helpers/createNewPathname';
import CRUDData from '@/services/CRUDData';
import getEndpoint from '@/services/getEndpoint';
import {
  IEvent,
  InfinityPaginationQueryType,
  InfinityPaginationResultType
} from '@/types';
import { Tables } from '@/types/database.types';

const eventsQuery = (
 
) => ({
  queryKey: ['events'],
  queryFn: async () => {
    const url = getEndpoint({ resourse: 'events', action: 'getEvents' });

    const { error, data } = await CRUDData<IEvent[]>
({
      method: 'GET',
      url: url()
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  }
});
export { eventsQuery };
