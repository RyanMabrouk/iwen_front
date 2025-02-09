export const booksEndpoints = {
  getBookId: (id: string) => `/books/${id}`,
  getBookSlug: (slug: string) => `/books/slug/${slug}`,
  getSlugs: () => `/books/slugs`,
  getBooks: () => `/books`,
  updateBook: (id: string) => `/books/${id}`,
  createBook: () => `/books`,
  deleteBook: (id: string) => `/books/${id}`,
  addCategory: (id: string, category_id: string) =>
    `/books/${id}/categories/${category_id}`,
  addSubCategory: (id: string, subcategory_id: string) =>
    `/books/${id}/subcategories/${subcategory_id}`,
  removeCategory: (id: string, category_id: string) =>
    `/books/${id}/categories/${category_id}`,
  removeSubCategory: (id: string, subcategory_id: string) =>
    `/books/${id}/subcategories/${subcategory_id}`,

};
