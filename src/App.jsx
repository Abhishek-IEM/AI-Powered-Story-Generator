import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ai-powered-story-generator.onrender.com/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      console.error("Error generating story:", error);
      setStory("Failed to generate story. Please try again.");
    }
    setLoading(false);
  };
  

  return (
    <div className="story-generator">
      <h1>AI Story Generator</h1>
      <div className="input-section">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your story prompt or keywords..."
          rows={4}
        />
        <button onClick={generateStory} disabled={loading}>
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </div>
      <div className="story-section">
        <h2>Your Story:</h2>
        <div className="story-content">
          {story || "Your generated story will appear here..."}
        </div>
      </div>
    </div>
  );
}

export default App;
