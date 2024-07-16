import React, { useState, useEffect } from 'react';
import  bgImage from '../assets/space.jpeg'
import './Home.css';
import robot from '../assets/atlas.png'
function Home() {
  const [content, setContent] = useState("Click below to speak");

  // Speak function
  const speak = (text) => {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
  };

  // WishMe function
  const wishMe = () => {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
      speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
      speak("Good Afternoon Master...");
    } else {
      speak("Good Evening Sir...");
    }
  };

  // Initialize JARVIS on load
  useEffect(() => {
    speak("Initializing JARVIS...");
    wishMe();
  }, []);

  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    setContent(transcript);
    takeCommand(transcript.toLowerCase());
  };

  const handleButtonClick = () => {
    setContent("Listening...");
    recognition.start();
  };

  // Command handling
  const takeCommand = (message) => {
    if (message.includes('hey') || message.includes('hello')) {
      speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google...");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      const finalText = "This is what I found on the internet regarding " + message;
      speak(finalText);
    } else if (message.includes('wikipedia')) {
      window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
      const finalText = "This is what I found on Wikipedia regarding " + message;
      speak(finalText);
    } else if (message.includes('time')) {
      const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
      const finalText = "The current time is " + time;
      speak(finalText);
    } else if (message.includes('date')) {
      const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
      const finalText = "Today's date is " + date;
      speak(finalText);
    } else if (message.includes('calculator')) {
      window.open('Calculator:///');
      const finalText = "Opening Calculator";
      speak(finalText);
    }
    else {
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      const finalText = "I found some information for " + message + " on Google";
      speak(finalText);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-opacity-50">
      <h1 className=' flex items-center justify-center text-white text-4xl animate-slide-in'>A  T  L  A  S</h1>
        <img src={robot} alt='robot'/>
        <p className="text-3xl mb-4 text-center">
          I AM YOUR VIRTUAL ASSISTANT ATLAS
        </p>

        <div className="input flex flex-col items-center">
          <h1 className="content mb-4 text-center">{content}</h1>
          <button
            className="talk px-4 py-2 bg-moon-color text-black rounded"
            onClick={handleButtonClick}
          >
            TALK
          </button>
        </div>
        </div>
    </div>
  );
}

export default Home;
