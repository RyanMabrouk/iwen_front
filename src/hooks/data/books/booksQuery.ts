import createNewPathname from '@/helpers/createNewPathname';
import CRUDData from '@/services/CRUDData';
import getEndpoint from '@/services/getEndpoint';
import {
  IBookPopulated,
  InfinityPaginationQueryType,
  InfinityPaginationResultType
} from '@/types';
import { Tables } from '@/types/database.types';

const booksQuery = (
  args: InfinityPaginationQueryType<`books.${keyof Tables<'books'>}`>
) => ({
  queryKey: ['books',args],
  queryFn: async () => {
    const url = getEndpoint({ resourse: 'books', action: 'getBooks' });
    const searchParams = Object.keys(args).map((key) => ({
      name: key,
      value: JSON.stringify(args[key as keyof typeof args])
    }));
    const newUrl= createNewPathname({currentPathname: url() , values : searchParams   })
    const { error, data } = await CRUDData<
      InfinityPaginationResultType<IBookPopulated>
    >({
      method: 'GET',
      url: newUrl
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  }
});
export { booksQuery };
