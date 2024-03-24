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
    <section className="m-0">
      <div className="mb-4 h-96 overflow-auto flex flex-col-reverse">
        {[...messages].reverse().map((message) => (
          <div key={message.id} className="mb-4">
            <p>Role:</p>
            {message.display}
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
          className="p-1.5 bg-violet-300 font-medium text-white font-sans"
        >
          Send
        </button>
      </form>
    </section>
  );
}
