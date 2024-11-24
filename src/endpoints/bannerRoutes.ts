export const bannersEndpoints = {
    getBanners: () => `/banners`,
    getBanner: (id:string) => `/banners/${id}`,
    updateBanner: (id:string) => `/banners/${id}`,
    createBanner: () =>  `/banners`,
    deleteBanner: (id:string) => `/banners/${id}`,
}
