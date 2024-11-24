import createNewPathname from '@/helpers/createNewPathname';
import CRUDData from '@/services/CRUDData';
import getEndpoint from '@/services/getEndpoint';

import { Tables } from '@/types/database.types';

const bannersQuery = () => ({
  queryKey: ['banners'],
  queryFn: async () => {
    const url = getEndpoint({ resourse: 'banners', action: 'getBanners' });
    const { error, data } = await CRUDData<Tables<'banners'>[]>({
      method: 'GET',
      url: url()
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  }
});
export { bannersQuery };
