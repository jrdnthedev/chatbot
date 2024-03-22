import React, { useState } from "react";
import LoadingSpinner from "../loading_spinner/loading_spinner";
import { useUIState, useActions } from "ai/rsc";
import type { AI } from "../../action";

export default function ChatBot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add user message to UI state
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        display: <div>{inputValue}</div>,
      },
    ]);

    // Submit and get response message
    const responseMessage = await submitUserMessage(inputValue);
    setMessages((currentMessages) => [...currentMessages, responseMessage]);

    setInputValue("");
  };
  return (
    <section className="flex-1 flex-col py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:space-y-0 sm:space-x-6">
      <div className="mb-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <p>Role:</p>
            <p>{message.display}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex mx-0">
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          onChange={handleInputChange}
          className="focus:outline-none focus:ring focus:ring-violet-300 rounded-xl mr-1.5 flex-1"
        />
        <button
          type="submit"
          className="p-1.5 bg-green-300 font-medium text-white font-sans"
        >
          Send
        </button>
      </form>
    </section>
  );
}
