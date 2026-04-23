export type user = {
 user_id: string;
  first_name: string;
  last_name: string;
  password: string | null;
  role: string;
  class_id: number;
}

export type userLogin ={
  user_id: string;
  password: string;
}