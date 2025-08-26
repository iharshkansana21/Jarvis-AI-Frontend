import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { askAI, checkAuth } from "../api";

export default function Assistant() {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;
  const [isListening, setIsListening] = useState(false);
  const [waveform, setWaveform] = useState(Array(50).fill(0));
  const [conversation, setConversation] = useState([]); // left side display
  const [time, setTime] = useState(new Date().toLocaleTimeString()); // right side clock

  // auth check
  useEffect(() => {
    checkAuth().then((data) => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
      if (!data) navigate("/login");
    });
  }, [navigate]);

  // waveform animation
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setWaveform((prev) => prev.map(() => Math.random() * 100));
      }, 100);
    } else {
      setWaveform(Array(50).fill(0));
    }
    return () => clearInterval(interval);
  }, [isListening]);

  // clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  };

  const handleCommand = async (query) => {
    console.log("User said:", query);
    setConversation((prev) => [...prev, { sender: "User", text: query }]);

    let reply = "";
    if (query.includes("open youtube")) {
      reply = "Opening YouTube";
      window.open("https://www.youtube.com", "_blank");
    } else if (query.includes("open wikipedia")) {
      reply = "Opening Wikipedia";
      window.open("https://www.wikipedia.com", "_blank");
    } else if (query.includes("open google and search")) {
      const searchQuery = query.split("open google and search")[1]?.trim();
      if (searchQuery) {
        reply = `Searching Google for ${searchQuery}`;
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          searchQuery
        )}`;
      } else {
        reply = "What should I search for?";
      }
    } else if (query.includes("the time")) {
      reply = `The time is ${new Date().toLocaleTimeString()}`;
    } else if (query.includes("jarvis")) {
      const res = await askAI(query);
      reply = res.response;
    } else if (query.includes("stop")) {
      reply = "Goodbye";
      stopListening();
    } else {
      reply = "Sorry, I did not understand that.";
    }

    speak(reply);
    setConversation((prev) => [...prev, { sender: "Jarvis", text: reply }]);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      handleCommand(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/accounts/react-logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        navigate("/login");
      } else {
        alert("Logout failed, please try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong while logging out.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-magenta-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 backdrop-blur-md bg-black/20 border-b border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-magenta-500 flex items-center justify-center animate-pulse">
              <span className="text-black font-bold">J</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                JARVIS Assistant
              </h1>
              <p className="text-sm text-gray-400">
                AI-Powered Virtual Assistant
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-md hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Section with Left + Center + Right */}
      <div className="relative z-10 flex flex-1">
        {/* Left: Conversation */}
        <div className="w-1/4 p-4 overflow-y-auto border-r border-cyan-500/20 backdrop-blur-md bg-black/10">
          <h2 className="text-cyan-400 text-lg font-semibold mb-2">
            Conversation
          </h2>
          <div className="space-y-2 text-sm text-gray-300">
            {conversation.map((msg, i) => (
              <p key={i}>
                <span
                  className={`font-bold ${
                    msg.sender === "User" ? "text-cyan-400" : "text-magenta-400"
                  }`}
                >
                  {msg.sender}:
                </span>{" "}
                {msg.text}
              </p>
            ))}
          </div>
        </div>

        {/* Center: Voice + Mic */}
        <div className="flex-1 flex flex-col justify-center items-center">
          {isListening && (
            <div className="p-4 backdrop-blur-md bg-black/10">
              <div className="flex items-center justify-center space-x-1 h-16">
                {waveform.map((height, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-cyan-400 to-magenta-500 rounded-full transition-all duration-100"
                    style={{
                      width: "3px",
                      height: `${Math.max(4, height * 0.4)}px`,
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-center text-cyan-400 text-sm mt-2 animate-pulse">
                Listening... Speak now
              </p>
            </div>
          )}

          {/* Mic Button */}
          <div className="mt-6">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-4 rounded-full transition-all duration-300 ${
                isListening
                  ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-400/30 animate-pulse"
                  : "bg-gradient-to-r from-cyan-500 to-magenta-500 hover:shadow-lg hover:shadow-cyan-400/30"
              }`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3z"></path>
                <path d="M19 10v1a7 7 0 01-14 0v-1"></path>
                <path d="M12 19v3"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Live Time */}
        <div className="w-1/4 p-4 border-l border-cyan-500/20 backdrop-blur-md bg-black/10 flex flex-col items-center justify-start">
          <h2 className="text-magenta-400 text-lg font-semibold mb-2">
            Live Time
          </h2>
          <p className="text-2xl text-white font-mono">{time}</p>
        </div>
      </div>
    </div>
  );
}
