"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQnaStore } from "@/lib/store";
import { userSchema, UserFormValues } from "@/lib/validations";

export default function Onboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup'); 
  const { setCurrentUser } = useQnaStore();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: UserFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          ...data,
          action: authMode === 'login' ? 'login' : 'create'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Authentication failed");
      }

      const user = await response.json();
      setCurrentUser(user);
    } catch (error) {
      console.error(`Error ${authMode === 'login' ? 'logging in' : 'creating user'}:`, error);
      // Display error to user
      alert(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to Q&A Tool</h2>
      <p className="text-gray-600 mb-6">
        {authMode === 'login' 
          ? "Enter your name to access your Q&A links." 
          : "Please enter your name to get started with creating and managing your Q&A links."}
      </p>

      <div className="flex mb-6 bg-gray-100 rounded-md p-1">
        <button
          type="button"
          className={`flex-1 py-2 text-center rounded-md transition ${
            authMode === 'signup' ? 'bg-white shadow-sm' : 'text-gray-600'
          }`}
          onClick={() => setAuthMode('signup')}
        >
          Sign Up
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-center rounded-md transition ${
            authMode === 'login' ? 'bg-white shadow-sm' : 'text-gray-600'
          }`}
          onClick={() => setAuthMode('login')}
        >
          Login
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading 
            ? (authMode === 'login' ? "Logging in..." : "Setting up...") 
            : (authMode === 'login' ? "Login" : "Get Started")}
        </button>
      </form>
    </div>
  );
} 