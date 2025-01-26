export const ordersEndpoints = {
  getMyOrders: () => `/orders/me`,
  getOrderId: (id: string) => `/orders/${id}`,
  getOrders: () => `/orders`,
  updateOrder: (id: string) => `/orders/${id}`,
  createOrderFromCart: () => `/orders`,
  createOrderFromOffer: () => `/orders/offer`,
  deleteOrder: (id: string) => `/orders/${id}`,
};
