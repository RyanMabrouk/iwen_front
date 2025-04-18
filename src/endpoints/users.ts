export const usersEndpoints = {
  getUsers: () => `/users`,
  updateUser: (id: string) => `/users/${id}`,
  getUser: (id: string) => `/users/${id}`,
  getMe: () => `/users/me`,
  updateMe: () => `/users/me`,
};
