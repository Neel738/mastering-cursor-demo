"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLink } from "@/lib/queries";
import { questionSchema, QuestionFormValues } from "@/lib/validations";
import { useCreateQuestion } from "@/lib/queries";

export default function QuestionSubmissionPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { data: link, isLoading: isLinkLoading, error } = useLink(slug);
  const createQuestionMutation = useCreateQuestion();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      content: "",
      submitterName: "",
    },
  });

  async function onSubmit(data: QuestionFormValues) {
    if (!link) return;

    try {
      await createQuestionMutation.mutateAsync({
        ...data,
        questionLinkId: link.id,
      });
      
      // Reset form and show success message
      form.reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  }

  // Check if link is still loading
  if (isLinkLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // Check if link exists
  if (error || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Link Not Found</h2>
          <p className="text-gray-600">
            This Q&A link is either expired or does not exist.
          </p>
        </div>
      </div>
    );
  }

  // Check if link is expired
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Link Expired</h2>
          <p className="text-gray-600">
            This Q&A session has ended and is no longer accepting questions.
          </p>
        </div>
      </div>
    );
  }

  // Show success message if question was submitted
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Question Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your question. It has been submitted successfully.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
          >
            Ask Another Question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{link.title}</h2>
        {link.description && <p className="text-gray-600 mb-6">{link.description}</p>}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Your Question
            </label>
            <textarea
              id="content"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="What would you like to ask?"
              rows={4}
              {...form.register("content")}
            />
            {form.formState.errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="submitterName"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your name"
              {...form.register("submitterName")}
            />
            {form.formState.errors.submitterName && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.submitterName.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
            disabled={createQuestionMutation.isPending}
          >
            {createQuestionMutation.isPending ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>
    </div>
  );
} 