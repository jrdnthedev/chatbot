import React, { useState } from "react";

export default function ChatBot() {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  const sendMessage = async () => {
    try {
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
            prompt: inputMessage,
            max_tokens: 150,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from ChatGPT API");
      }

      const responseData = await response.json();
      setOutputMessage(responseData.choices[0].text);
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
    <section className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <div>
        <p>Response:</p>
        <p>{outputMessage}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          onChange={handleInputChange}
          className="focus:outline-none focus:ring focus:ring-violet-300 rounded-xl"
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
