import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { InfinityPaginationResultType } from "@/types";

const bannersQuery = (): {
  queryKey: string[];
  queryFn: () => Promise<{
    data: InfinityPaginationResultType<any> | null;
    error: any | null;
  }>;
} => ({
  queryKey: ["banners"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "banners", action: "getBanners" });
    const { error, data } = await sendRequest<
      InfinityPaginationResultType<any>
    >({
      method: "GET",
      url: url(),
    });
    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});

export { bannersQuery };
