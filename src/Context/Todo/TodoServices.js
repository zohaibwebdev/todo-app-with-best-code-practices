import supabase from "../../config/supabase";

export const getTodos = async () => {
  const { data, error } = await supabase.from("todo").select("*");
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const addTodo = async (id, todo) => {
  const { error } = await supabase.from("todo").insert([{ id, todo }]);
  if (error) {
    throw new Error(error);
  }
};

export const deleteTodos = async (id) => {
  const { data, error } = await supabase.from("todo").delete().eq("id", id);
  if (error) {
    throw new Error(error);
  }
};
