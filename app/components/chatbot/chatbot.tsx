import React, { useState } from "react";
import LoadingSpinner from "../loading_spinner/loading_spinner";

export default function ChatBot() {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const [isSearching, setIsSearching] = useState(true);

  const sendMessage = async () => {
    try {
      setIsSearching(false);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer API-KEY",
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
        <p>Response:</p>
        {isSearching ? <p>{outputMessage}</p> : <LoadingSpinner />}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          onChange={handleInputChange}
          className="focus:outline-none focus:ring focus:ring-violet-300 rounded-xl mr-1.5"
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
