export const writersEndpoints = {
  getWriters: () => `/writers/all`,
  updateWriter: (id: string) => `/writers/${id}`,
  createWriter: () => `/writers`,
  deleteWriter: (id: string) => `/writers/${id}`,
};
