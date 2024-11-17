export const subCategoriesEndpoints = {
    getSubCategories: () => `/subcategories`,
    updateSubCategory: (id:string) => `/subcategories/${id}`,
    createSubCategory: () =>  `/subCategories`,
    deleteSubCategory: (id:string) => `/subcategories/${id}`,
}
