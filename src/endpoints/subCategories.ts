export const subCategoriesEndpoints = {
    getsubCategories: () => `/subcategories`,
    updateSubCategory: (id:string) => `/subcategories/${id}`,
    createSubCategory: () =>  `/subCategories`,
    deleteSubCategory: (id:string) => `/subcategories/${id}`,
}
