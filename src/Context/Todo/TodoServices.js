import supabase from "../../config/supabase";

export const getTodos = async () => {
  const { data, error } = await supabase.from("todo").select("*");
  if (error) {
    throw new Error(error);
  }
  return data;
};
