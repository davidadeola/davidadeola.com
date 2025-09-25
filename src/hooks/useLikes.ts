import { supabase } from "@/lib/supabase/supabaseClient";
import { useState, useEffect } from "react";

function getUserId() {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("user_id", id);
  }
  return id;
}

export function useLikes(postId: string) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);

  const userId = getUserId();

  useEffect(() => {
    fetchLikes();
  }, [postId]);

  async function fetchLikes() {
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    setLikes(count || 0);

    const { data: existing } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();

    setIsLiked(!!existing);
  }

  async function toggleLike() {
    if (isLiked) {
      // unlike
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      // like
      await supabase
        .from("likes")
        .insert([{ post_id: postId, user_id: userId }]);
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  }

  return { likes, isLiked, toggleLike };
}
