"use client";

import { useEffect } from "react";
import { useQnaStore } from "@/lib/store";
import { useLinks } from "@/lib/queries";
import Onboarding from "../components/Onboarding";
import CreateLinkModal from "../components/CreateLinkModal";
import Link from "next/link";

export default function Dashboard() {
  const { currentUser, setIsCreatingLink } = useQnaStore();
  const { data: links, isLoading } = useLinks(currentUser?.id);

  // If there's no user, show the onboarding screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {currentUser.name}</span>
            <button
              onClick={() => setIsCreatingLink(true)}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
            >
              Create New Link
            </button>
            <button
              onClick={() => useQnaStore.getState().logout()}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Q&A Links</h2>
          <p className="text-gray-600">
            Create and manage your question collection links.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-500">Loading your links...</div>
          </div>
        ) : links && links.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{link.title}</h3>
                  {link.description && (
                    <p className="text-gray-600 mb-4">{link.description}</p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      Created: {new Date(link.createdAt).toLocaleDateString()}
                    </span>
                    {link.expiresAt && (
                      <span className="text-sm text-gray-500">
                        Expires: {new Date(link.expiresAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Link
                      href={`/dashboard/links/${link.slug}`}
                      className="text-purple-600 font-medium hover:underline"
                    >
                      Manage Questions
                    </Link>
                    <Link
                      href={`/q/${link.slug}`}
                      target="_blank"
                      className="text-gray-600 hover:underline"
                    >
                      Submit Link ↗
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Q&A Links Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first Q&A link to start collecting questions from your audience.
            </p>
            <button
              onClick={() => setIsCreatingLink(true)}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
            >
              Create Your First Link
            </button>
          </div>
        )}
      </main>

      {/* Create Link Modal */}
      <CreateLinkModal />
    </div>
  );
} 