import api from "./api";

export const terreiroService = {
  async getTerreiros() {
    const response = await api.get("/terreiros/");
    console.log(response.data);
    return response.data;
  },

  async getTerreirosById(id: string) {
    const response = await api.get("/terreiros/" + id);
    return response.data;
  },
};
