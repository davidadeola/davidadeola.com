/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import useComments from "@/hooks/useComments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { formatDistance } from "date-fns";

const FormSchema = z.object({
  name: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
  comment: z.string().min(20, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function CommentSection({ postId }: { postId: string }) {
  const { comments, loading, add } = useComments(postId);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      comment: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.name.trim() || !data.comment.trim()) return;

    setSubmitting(true);
    try {
      await add(data.name.trim(), data.comment.trim());

      toast("Comment added successfully 🎉");

      form.reset();
    } catch (err: any) {
      console.error(err);

      toast("Error", {
        description: JSON.stringify(err.details),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="border-dashed border-2 w-full md:max-w-[70%] mx-auto px-4 md:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-b w-full flex gap-4 flex-col py-10 mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mx-auto w-full md:max-w-3/5">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="mx-auto w-full md:max-w-3/5">
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={submitting}
            className="cursor-pointer w-3/5 mx-auto"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>

      <div className="w-full md:w-3/5 py-10 mx-auto">
        {loading ? (
          <div className="flex items-center justify-center">
            <p className="text-xl font-semibold">Loading comments…</p>
          </div>
        ) : null}

        {!!comments.length && !loading ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-medium">Comments</h3>

              <div className="border text-white h-8 flex items-center justify-center w-8 bg-[#974BFA] rounded-full text-sm">
                {comments.length}
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {comments.map((c) => (
                <li
                  key={c.id}
                  className="border-b last:border-b-0 flex flex-col gap-2 py-4"
                >
                  <div className="flex gap-4 items-center justify-between text-">
                    <p>{c.name}</p>
                    <span className="text-[12px] text-[#2A2A2A] dark:text-white/50">
                      {formatDistance(new Date(c.created_at), new Date())} ago
                    </span>
                  </div>
                  <p className="text-sm font-light ml-2">{c.message}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-xl font-semibold">
              Be the first to leave a comment...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
