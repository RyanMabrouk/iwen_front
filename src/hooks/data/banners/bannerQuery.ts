import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { Tables } from "@/types/database.types";

const bannerQuery = (bannerId : string) => ({
  queryKey: ["banners",bannerId],
  queryFn: async () => {
    const url =  getEndpoint({  resourse: "banners", action : "getBanner" });
    return await sendRequest<Tables<"banners">>({ method: "GET", url: url(bannerId) });
  },
  enabled : bannerId!==null
});
export { bannerQuery };
