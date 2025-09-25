import { supabase } from "../supabase/supabaseClient";

export type CommentRow = {
  id: string;
  post_id: string;
  name: string;
  message: string;
  created_at: string;
};

export async function fetchComments(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createComment(
  postId: string,
  name: string,
  message: string
) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, name, message }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
