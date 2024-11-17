export const usersEndpoints = {
  getUsers: () => `/users`,
  updateUser: (id: string) => `/users/${id}`,
  getUser: (id: string) => `/users/${id}`,
  getCurrentUser: () => `/users/me`,
  updateMe: () => `/users/me`,
};
