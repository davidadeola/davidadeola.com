/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchComments, createComment, CommentRow } from "@/lib/api/comments";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function useComments(postId: string) {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchComments(postId);
      setComments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (!postId) return;
    load();

    const channel = supabase
      .channel(`comments:postId=${postId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments((prev) => [payload.new as CommentRow, ...prev]);
        }
      )
      .subscribe();

    return () => {
      // cleanup subscription
      channel.unsubscribe();
    };
  }, [postId, load]);

  const add = useCallback(
    async (name: string, message: string) => {
      try {
        const saved = await createComment(postId, name, message);
        // optimistic update (database will also stream it back via realtime)
        setComments((prev) => [saved, ...prev]);
        return saved;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [postId]
  );

  return { comments, loading, error, add, reload: load };
}
