"use client";
import Chatbot from "./components/chatbot/chatbot";

export default function Home() {
  return (
    <section>
      <div className="flex-1 flex-col py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:space-y-0 sm:space-x-6">
        <h1 className="text-center mb-9 text-4xl font-serif italic">Home</h1>
        <Chatbot />
      </div>
    </section>
  );
}
