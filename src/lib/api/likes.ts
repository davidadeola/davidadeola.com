/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "../supabase/supabaseClient";

export type LikeRow = {
  id: string;
  post_id: string;
  user_id?: string | null;
  created_at: string;
};

export async function fetchLikesCount(postId: string) {
  // use exact count
  const { count, error } = await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("post_id", postId);

  if (error) throw error;
  return count ?? 0;
}

export async function addLike(postId: string, userId?: string) {
  const payload: any = { post_id: postId };
  if (userId) payload.user_id = userId;

  const { data, error } = await supabase
    .from("likes")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeLike(likeId: string) {
  const { error } = await supabase.from("likes").delete().eq("id", likeId);
  if (error) throw error;
  return true;
}
