import createNewPathname from "@/helpers/createNewPathname";
import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import {
  InfinityPaginationQueryType,
  InfinityPaginationResultType,
} from "@/types";
import { Tables } from "@/types/database.types";

const usersQuery = (
  args: InfinityPaginationQueryType<`users.${keyof Tables<"users">}`>,
) => ({
  queryKey: ["users", args],
  queryFn: async () => {
    const url = getEndpoint({ resource: "users", action: "getUsers" });
    const searchParams = Object.keys(args).map((key) => ({
      name: key,
      value: JSON.stringify(args[key as keyof typeof args]),
    }));
    const newUrl = createNewPathname({
      currentPathname: url(),
      values: searchParams,
    });
    const { error, data } = await sendRequest<
      InfinityPaginationResultType<Tables<"users">>
    >({
      method: "GET",
      url: newUrl,
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});
export { usersQuery };
