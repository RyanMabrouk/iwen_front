export const publishHousesEndpoints = {
  getPublishHouses: () => `/share_houses`,
  updatePublishHouse: (id: string) => `/share_houses/${id}`,
  createPublishHouse: () => `/share_houses`,
  deletePublishHouse: (id: string) => `/share_houses/${id}`,
};
