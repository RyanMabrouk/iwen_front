import createNewPathname from "@/helpers/createNewPathname";
import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import {
  IBookPopulated,
  InfinityPaginationQueryType,
  InfinityPaginationResultType,
} from "@/types";
import { Tables } from "@/types/database.types";

const wishlistQuery = (
  args: InfinityPaginationQueryType<`wishlist.${keyof Tables<"books">}`>,
) => ({
  queryKey: ["wishlist", args],
  queryFn: async () => {
    const url = getEndpoint({ resource: "wishlist", action: "getWishlist" });
    const searchParams = Object.keys(args).map((key) => ({
      name: key,
      value: JSON.stringify(args[key as keyof typeof args]),
    }));
    const newUrl = createNewPathname({
      currentPathname: url(),
      values: searchParams,
    });
    const { error, data } = await sendRequest<
      InfinityPaginationResultType<IBookPopulated>
    >({
      method: "GET",
      url: newUrl,
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});
export { wishlistQuery };
