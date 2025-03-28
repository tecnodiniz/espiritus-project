import api from "./api";

export const terreiroService = {
  async getTerreiros() {
    const response = await api.get("/terreiros/");
    return response.data;
  },

  async getTerreirosById(id: string) {
    const response = await api.get("/terreiros/" + id);
    return response.data;
  },
  async getUserTerreiros(id: string) {
    const response = await api.get("/user/terreiros/" + id);
    return response;
  },

  async postTerreiro(data: any) {
    const response = await api.post("/terreiros/", data);
    return response;
  },

  async updateUserStatus(id: string, data: any) {
    const response = await api.patch("/agent_terreiro/" + id, data);
    return response;
  },

  async getRoles() {
    const respone = await api.get("terreiro_roles");
    return respone;
  },
  async postAgentTerreiro(data: any) {
    const response = await api.post("agent_terreiro", data);
    return response;
  },

  async removeAgentTerreiro(id: string) {
    const response = await api.delete("/agent_terreiro/" + id);
    return response;
  },
};
