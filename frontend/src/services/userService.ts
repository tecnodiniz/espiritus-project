import api from "./api";

export const userService = {
  async getUsersById(id: string) {
    const response = await api.get("/users-detail/" + id);
    return response.data;
  },
  async createUser(data: any) {
    const response = await api.post("/users/", data);
    return response;
  },
  async updateProfile(id: string, data: any) {
    console.log(id);
    console.log(data);
    const response = await api.patch(`/users/${id}/`, data);
    return response;
  },
};
