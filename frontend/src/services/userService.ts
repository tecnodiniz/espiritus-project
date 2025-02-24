import api from "./api";

export const userService = {
  async getUsersById(id: string) {
    const response = await api.get("/users/" + id);
    console.log(response.data);
    return response.data;
  },
};
