export const wishlistEndpoints = {
    getWishlist: () => `/wishlist/me`,
    createWishlist: () => `/wishlist`,
    deleteWishlist: (book_id: string) => `/wishlist/${book_id}`,
  };
  