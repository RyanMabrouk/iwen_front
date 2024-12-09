export const reviewsEndpoints = {
  createReview: () => `/reviews`,
  getAllReviews: () => `/reviews`,
  deleteReview: (id: string) => `/reviews/${id}`,
  editReview: (id: string) => `/reviews/${id}`,
};
