import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const bannerQuery = (bannerId : string) => ({
  queryKey: ["banners",bannerId],
  queryFn: async () => {
    const url = await getEndpoint({  resourse: "banners", action: "getBanner" });
    return await CRUDData<Tables<"banners">>({ method: "GET", url: url(bannerId) });
  },
  enabled : bannerId!==null
});
export { bannerQuery };
