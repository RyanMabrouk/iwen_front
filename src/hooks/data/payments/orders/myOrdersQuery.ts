import createNewPathname from "@/helpers/createNewPathname";
import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import {
  InfinityPaginationQueryType,
  InfinityPaginationResultType,
  IOrder,
} from "@/types";
import { Tables } from "@/types/database.types";

const myOrdersQuery = (
  args: InfinityPaginationQueryType<`orders.${keyof Tables<"orders">}`>,
) => ({
  queryKey: ["orders", args],
  queryFn: async () => {
    const url = getEndpoint({ resource: "orders", action: "getMyOrders" });
    const searchParams = Object.keys(args).map((key) => ({
      name: key,
      value: JSON.stringify(args[key as keyof typeof args]),
    }));
    const newUrl = createNewPathname({
      currentPathname: url(),
      values: searchParams,
    });
    const { error, data } = await sendRequest<
      InfinityPaginationResultType<IOrder>
    >({
      method: "GET",
      url: newUrl,
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});
export { myOrdersQuery };
