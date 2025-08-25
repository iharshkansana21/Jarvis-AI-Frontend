import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { askAI, checkAuth } from "../api";

export default function Assistant() {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;
  const [isListening, setIsListening] = useState(false);
  const [waveform, setWaveform] = useState(Array(50).fill(0));

  useEffect(() => {
    checkAuth().then((data) => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.go(1); // block going back
      };
      if (!data) navigate("/login");
    });
  }, [navigate]);

  // Animated waveform
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

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  };

  const handleCommand = async (query) => {
    console.log("User said:", query);

    if (query.includes("open youtube")) {
      speak("Opening YouTube");
      window.open("https://www.youtube.com", "_blank");
    } else if (query.includes("open wikipedia")) {
      speak("Opening Wikipedia");
      window.open("https://www.wikipedia.com", "_blank");
    } else if (query.includes("open google and search")) {
      const searchQuery = query.split("open google and search")[1]?.trim();
      if (searchQuery) {
        speak(`Searching Google for ${searchQuery}`);
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          searchQuery
        )}`;
      } else {
        speak("What should I search for?");
      }
    } else if (query.includes("the time")) {
      const time = new Date().toLocaleTimeString();
      speak(`The time is ${time}`);
    } else if (query.includes("jarvis")) {
      const res = await askAI(query);
      speak(res.response);
    } else if (query.includes("stop")) {
      speak("Goodbye");
      stopListening();
    } else {
      speak("Sorry, I did not understand that.");
    }
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
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
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
        credentials: "include", // important for Django session
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
              <h1 className="text-xl font-semibold text-white">JARVIS Assistant</h1>
              <p className="text-sm text-gray-400">AI-Powered Virtual Assistant</p>
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
      

      {/* Voice Waveform Visualization */}
      {isListening && (
        <div className="relative z-10 p-4 backdrop-blur-md bg-black/10">
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

      {/* Controls */}
      <div className="relative z-10 p-6 backdrop-blur-md bg-black/20 border-t border-cyan-500/20 flex justify-center">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`p-4 rounded-full transition-all duration-300 ${isListening
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
  );
}
