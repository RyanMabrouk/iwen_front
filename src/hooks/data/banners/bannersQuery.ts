import createNewPathname from '@/helpers/createNewPathname';
import getEndpoint from '@/services/getEndpoint';
import sendRequest from '@/services/sendRequest';

import { Tables } from '@/types/database.types';

const bannersQuery = () => ({
  queryKey: ['banners'],
  queryFn: async () => {
    const url = getEndpoint({ resourse:'banners', action:'getBanners' });
    const { error, data } = await sendRequest<Tables<'banners'>[]>({
      method: 'GET',
      url: url()
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  }
});
export { bannersQuery };
