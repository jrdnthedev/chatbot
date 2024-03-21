import React, { useState } from "react";
import LoadingSpinner from "../loading_spinner/loading_spinner";

export default function ChatBot() {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const [isSearching, setIsSearching] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const sendMessage = async () => {
    try {
      setIsSearching(false);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputMessage }],
            max_tokens: 150,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from ChatGPT API");
      }
      const responseData = await response.json();
      console.log(responseData);
      setOutputMessage(responseData.choices[0].message.content);
      setIsSearching(true);
    } catch (error) {
      console.error("Error sending message to ChatGPT API:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <section className="flex-1 flex-col py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <div className="mb-4">
        {isSearching ? (
          <>
            <div className="mb-2">
              <p>Question:</p>
              <p>{inputMessage}</p>
            </div>
            <div>
              <p>Response:</p>
              <p>{outputMessage}</p>
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
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
