import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Q&A Tool
          </h1>
          <div className="space-x-4">
            <Link 
              href="/dashboard" 
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-gray-900">
            Connect with your <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">audience</span> through questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create distraction-free question collection links for your followers, manage questions efficiently, and respond to what matters most.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link 
              href="/dashboard" 
              className={cn(
                "px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600",
                "text-white font-medium hover:opacity-90 transition text-lg"
              )}
            >
              Create a Q&A Link
            </Link>
            <Link 
              href="/about" 
              className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">How it works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Create a Q&A Link</h4>
              <p className="text-gray-600">Generate a unique link for your audience to submit their questions.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Collect Questions</h4>
              <p className="text-gray-600">Share your link with your audience and watch the questions roll in.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Manage & Answer</h4>
              <p className="text-gray-600">Mark questions as answered, favorite the best ones, and filter efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 Q&A Tool. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
