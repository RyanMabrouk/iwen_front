export const offers_endpoints = {
  getOffers: () => `/offers`,
  getOffer: (id: string) => `/offers/${id}`,
  updateOffer: (id: string) => `/offers/${id}`,
  createOffer: () => `/offers`,
  deleteOffer: (id: string) => `/offers/${id}`,
};
