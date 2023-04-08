import React, { useState } from "react";
import Axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8000/message", {
        message: input,
      });
      setOutput(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Chatbot</h1>
      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          className="chatbot-input"
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Type your message here"
        />
        <button className="chatbot-submit" type="submit">
          Send
        </button>
      </form>
      <div className="chatbot-output">
        <p>{output}</p>
      </div>
      <div>
        <p>
          Powered by <a href="https://openai.com/blog/openai-api/">OpenAI</a>
        </p>
      </div>
    </div>
  );
}

export default Chatbot;
