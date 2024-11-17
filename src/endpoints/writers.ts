export const writersEndpoints = {
  getWriters: () => `/writers`,
  updateWriter: (id: string) => `/writers/${id}`,
  createWriter: () => `/writers`,
  deleteWriter: (id: string) => `/writers/${id}`,
};
