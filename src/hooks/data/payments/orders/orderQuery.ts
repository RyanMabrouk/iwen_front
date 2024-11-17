import sendRequest from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { IOrder } from "@/types";

const orderQuery = (orderId: string) => ({
  queryKey: ["orders", orderId],
  queryFn: async () => {
    const url = getEndpoint({ resource: "orders", action: "getOrderId" });
    return await sendRequest<IOrder>({ method: "GET", url: url(orderId) });
  },
  enabled: orderId !== null,
});
export { orderQuery };
