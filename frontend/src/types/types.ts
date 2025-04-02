export type User = {
  id: string;
  name: string;
  plan: string;
  auth: UserDetails;
  agents: TerreiroAgent[];
};
export type UserDetails = {
  email: string;
  created_at: string;
};
export type Auth = {
  email: string;
  password: string;
};
export type Role = {
  id: string;
  position: string;
  description: string;
};

export enum AgentStatus {
  active = "active",
  pending = "pending",
  inactive = "inactive",
}
export type TerreiroAgent = {
  id: string;
  role: Role;
  user: User;
  terreiro: Terreiro;
  status: AgentStatus;
};
export type Terreiro = {
  id: string;
  name: string;
  user: User;
  history: string;
  infrastructure: string;
  segment: string;
  contact: string;
  opening_hours: string;
  address: string;
  agents: TerreiroAgent[];
};
