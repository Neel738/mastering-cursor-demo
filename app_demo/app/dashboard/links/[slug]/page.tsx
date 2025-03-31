"use client";

import { useState } from "react";
import Link from "next/link";
import { useQnaStore } from "@/lib/store";
import { useLink, useQuestions, useUpdateQuestionStatus, useToggleFavorite } from "@/lib/queries";
import Onboarding from "@/app/components/Onboarding";

export default function QuestionManagementPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { currentUser } = useQnaStore();
  const { data: link, isLoading: isLinkLoading } = useLink(slug);
  const { data: questions, isLoading: isQuestionsLoading } = useQuestions(link?.id);
  const updateStatusMutation = useUpdateQuestionStatus();
  const toggleFavoriteMutation = useToggleFavorite();
  
  // Filter state
  const [filterStatus, setFilterStatus] = useState<"all" | "answered" | "unanswered">("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // If there's no user, show the onboarding screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Onboarding />
      </div>
    );
  }
  
  // Filter questions based on the selected filters
  const filteredQuestions = questions?.filter((question) => {
    // Filter by answer status
    if (filterStatus === "answered" && !question.isAnswered) return false;
    if (filterStatus === "unanswered" && question.isAnswered) return false;
    
    // Filter by favorites
    if (showFavoritesOnly && !question.isFavorite) return false;
    
    // Filter by search query
    if (searchQuery && !question.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  // Handle marking a question as answered/unanswered
  const handleToggleAnswered = async (questionId: string, currentStatus: boolean) => {
    try {
      await updateStatusMutation.mutateAsync({
        questionId,
        isAnswered: !currentStatus,
      });
    } catch (error) {
      console.error("Error updating question status:", error);
    }
  };
  
  // Handle toggling a question as favorite
  const handleToggleFavorite = async (questionId: string) => {
    try {
      await toggleFavoriteMutation.mutateAsync(questionId);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };
  
  // Check if data is still loading
  if (isLinkLoading || isQuestionsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }
  
  // Check if link exists
  if (!link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Link Not Found</h2>
          <p className="text-gray-600 mb-6">
            This Q&A link does not exist or you don't have access to it.
          </p>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900 mt-1">{link.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/q/${link.slug}`}
              target="_blank"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              View Submission Page ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "answered" | "unanswered")}
              >
                <option value="all">All Questions</option>
                <option value="answered">Answered</option>
                <option value="unanswered">Unanswered</option>
              </select>
              <button
                className={`px-4 py-2 rounded-md ${
                  showFavoritesOnly
                    ? "bg-purple-100 text-purple-700 border border-purple-300"
                    : "border border-gray-300 text-gray-700"
                }`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                ★ Favorites Only
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions && filteredQuestions.length > 0 ? (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className={`bg-white rounded-xl shadow-sm border ${
                  question.isFavorite ? "border-purple-200" : "border-gray-100"
                } p-6 ${question.isFavorite ? "bg-purple-50/50" : ""}`}
              >
                <div className="flex justify-between mb-2">
                  <div className="text-gray-600">
                    From: <span className="font-medium">{question.submitterName}</span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(question.createdAt).toLocaleString()}
                  </div>
                </div>
                <p className="text-gray-900 text-lg mb-4">{question.content}</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleAnswered(question.id, question.isAnswered)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        question.isAnswered
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                    >
                      {question.isAnswered ? "✓ Answered" : "Mark as Answered"}
                    </button>
                    <button
                      onClick={() => handleToggleFavorite(question.id)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        question.isFavorite
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                          : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                    >
                      {question.isFavorite ? "★ Favorited" : "Add to Favorites"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Yet</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== "all" || showFavoritesOnly
                ? "No questions match your current filters."
                : "Share your Q&A link to start collecting questions from your audience."}
            </p>
            {searchQuery || filterStatus !== "all" || showFavoritesOnly ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                  setShowFavoritesOnly(false);
                }}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
              >
                Clear Filters
              </button>
            ) : (
              <Link
                href={`/q/${link.slug}`}
                target="_blank"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
              >
                View Submission Page ↗
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 