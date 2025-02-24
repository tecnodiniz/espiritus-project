export type User = {
  id: string;
  name: string;
  plan: string;
};

export type Role = {
  id: string;
  position: string;
  description: string;
};
export type TerreiroAgent = {
  id: string;
  role: Role;
  user: User;
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
