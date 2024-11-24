export const categoriesEndpoints = {
    getCategories: () => `/Categories`,
    updateCategory: (id:string) => `/Categories/${id}`,
    createCategory: () =>  `/Categories`,
    deleteCategory: (id:string) => `/Categories/${id}`,
}
