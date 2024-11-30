export const bannersEndpoints = {
  getBanners: () => `/banners`,
  updateBanner: (id: string) => `/banners/${id}`,
  createBanner: () => `/banners`,
  deleteBanner: (id: string) => `/banners/${id}`,
};
