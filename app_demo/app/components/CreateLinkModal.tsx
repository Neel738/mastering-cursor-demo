"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQnaStore } from "@/lib/store";
import { linkSchema, LinkFormValues } from "@/lib/validations";
import { useCreateLink } from "@/lib/queries";

export default function CreateLinkModal() {
  const { currentUser, isCreatingLink, setIsCreatingLink } = useQnaStore();
  const createLinkMutation = useCreateLink();

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      description: "",
      expiresAt: "",
    },
  });

  async function onSubmit(data: LinkFormValues) {
    if (!currentUser) return;

    try {
      await createLinkMutation.mutateAsync({
        ...data,
        userId: currentUser.id,
      });
      
      // Reset form and close modal on success
      form.reset();
      setIsCreatingLink(false);
    } catch (error) {
      console.error("Error creating link:", error);
    }
  }

  if (!isCreatingLink) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => setIsCreatingLink(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Q&A Link</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Ask Me Anything - June 2024"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add additional context for your audience"
              rows={3}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date (Optional)
            </label>
            <input
              id="expiresAt"
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              {...form.register("expiresAt")}
            />
            {form.formState.errors.expiresAt && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.expiresAt.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreatingLink(false)}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              disabled={createLinkMutation.isPending}
            >
              {createLinkMutation.isPending ? "Creating..." : "Create Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 