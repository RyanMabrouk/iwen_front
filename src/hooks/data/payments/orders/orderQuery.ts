import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { IOrder } from "@/types";
import { Tables } from "@/types/database.types";

const orderQuery = (orderId : string) => ({
  queryKey: ["orders",orderId],
  queryFn: async () => {
    const url = await getEndpoint({  resourse: "orders", action: "getOrderId" });
    return await CRUDData<IOrder>({ method: "GET", url: url(orderId) }); 
  },
  enabled : orderId!==null
});
export { orderQuery };
