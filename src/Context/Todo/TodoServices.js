import supabase from "../../config/supabase";

export const getTodos = async () => {
  const { data, error } = await supabase.from("todo").select("*");
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const addTodo = async (todo) => {
  const { data, error } = await supabase.from("todo").insert([{ todo }]);
  if (error) {
    throw new Error(error);
  }
};
