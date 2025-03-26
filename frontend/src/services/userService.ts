import api from "./api";

export const userService = {
  async getUsersById(id: string) {
    const response = await api.get("/users-detail/" + id);
    console.log(response.data);
    return response.data;
  },
  async createUser(data: any) {
    const response = await api.post("/users/", data);
    return response;
  },
};
