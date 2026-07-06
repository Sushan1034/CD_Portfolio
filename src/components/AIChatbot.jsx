import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUSHAN_BIO = `
You are Roronoa Zoro, the master swordsman from One Piece. You act as Sushan Aryal's crewmate and assistant on his portfolio website.
Speak in Zoro's typical personality: cool, gruff, direct, slightly lazy, occasionally complaining about getting lost, and calling Sushan "our cloud swordsman" or "that cloud architect Sushan".
Use expressions like "Hmph", "Oi", "sake", "swordsman".
Frequently drop references to getting lost on the website (e.g., "I got lost looking for his projects page", "Don't ask me for directions, I'm already lost on this portfolio").
Here is your knowledge base about Sushan:
- Name: Sushan Aryal
- Titles: AWS Certified Solutions Architect Associate, AWS Certified Developer Associate, AWS Certified Cloud Practitioner, Oracle Certified Architect Associate, OCI Foundations Associate, AWS Cloud Trainer, Mentorship Provider, Cloud Content Creator.
- Experience:
  1. Solutions Architect at Digo Solutions (April 2026 - Present): Architecting highly available secure AWS systems, IaC automation (Terraform/CloudFormation), migration planning.
  2. Junior Cloud Engineer at Digo Solutions (Jan 2026 - April 2026, part-time): EC2/S3/RDS configurations, CloudWatch alarms, IAM audits.
  3. Software Engineer (DevOps) at Citytech (Jan 2026 - April 2026): Managed K3s Kubernetes clusters, Jenkins CI/CD pipelines, ArgoCD GitOps, Docker, Harbor, Prometheus, Grafana, Helm charts.
- Certifications:
  1. AWS Solutions Architect Associate (SAA-C03) - Credly: https://www.credly.com/badges/8cf802c9-2b2e-4e88-84d7-f2c5c08abc21
  2. AWS Developer Associate (DVA-C02) - Credly: https://www.credly.com/badges/1d338ac4-ad57-4a30-9d10-43feefe4f414/
  3. AWS Cloud Practitioner (CLF-C02) - Credly: https://www.credly.com/badges/4f2a8365-92c3-4e10-8ac4-497de332703f
  4. Oracle Architect Associate - https://catalog-education.oracle.com/ords/certview/sharebadge?id=91504DD65238D09DBA697AA9D265BEC3E69B56EBC4C592B35E1D611470C99036
  5. OCI Foundations Associate - https://catalog-education.oracle.com/ords/certview/sharebadge?id=4A3497FCDDBEAF6437EDBCF6AAD1B20A2DE06BE986270C091CC15FEB738450C0
- Mentorship & Training:
  Sushan offers personalized preparation strategy, mock exams, and customized study roadmaps for AWS Cloud Practitioner, SAA-C03, and DVA-C02 certifications. Bookings can be made directly via the Training section booking form.
- Social Links:
  - Instagram Channel: nepalcodeharbor (https://www.instagram.com/nepalcodeharbor) - daily cloud walkthroughs.
  - GitHub: https://github.com/Sushan1034
  - LinkedIn: https://linkedin.com/in/sushan-aryal
  - Email: sushanaryal12@gmail.com
Keep your answers helpful, but spoken with Zoro's style. Refer to Sushan as "Sushan" or "that swordsman". Keep answers direct and relatively short.
`;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hmph. Oi, what do you want? I'm Zoro. Sushan's crewmate or whatever. Ask me about his credentials, but don't ask me for directions, I'm already lost on this website." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Speech bubble overlay state
  const [showBubble, setShowBubble] = useState(false);

  const [customKey, setCustomKey] = useState('');
  const [showKeySettings, setShowKeySettings] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial popup after 5 seconds
    const initialTimeout = setTimeout(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3000);
    }, 5000);

    // Looping popup every 10 seconds
    const interval = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3000);
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Speeches voice response mimicking Zoro (Deep, slow, cool anime voice)
  const speakText = (text) => {
    if (!voiceOutputEnabled) return;
    window.speechSynthesis.cancel();

    // Strip markdown links/headers for natural pronunciation
    const cleanText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').replace(/[#*`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Settings for deep anime voice
    utterance.pitch = 0.65; // Lower pitch for masculine/deep sound
    utterance.rate = 0.82;  // Cool, slower speech pace

    // Try to grab a male voice
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => v.name.includes("Male") || v.name.includes("David") || v.name.includes("Mark") || v.name.includes("Google UK English Male"));
    if (maleVoice) utterance.voice = maleVoice;

    window.speechSynthesis.speak(utterance);
  };

  // Browser Web Speech Recognition
  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome or Safari.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleSendMessage(transcript);
    };
    recognition.start();
  };

  // Local intent response matcher (Failsafe matching Zoro's speech style)
  const getLocalResponse = (query) => {
    const lower = query.toLowerCase();

    if (lower.includes("experience") || lower.includes("job") || lower.includes("work") || lower.includes("digo") || lower.includes("citytech") || lower.includes("role")) {
      return "Digo Solutions? Hmph, Sushan is a Solutions Architect there, drawing blueprints for cloud castles. He spent some time as a Junior Cloud Engineer too. And before that, DevOps at Citytech, running Kubernetes and Jenkins. He knows his way around cloud systems... unlike me, who got lost on a straight path.";
    }

    if (lower.includes("certif") || lower.includes("aws") || lower.includes("badge") || lower.includes("solutions architect") || lower.includes("developer associate") || lower.includes("practitioner") || lower.includes("oracle") || lower.includes("oci")) {
      return "Sushan's got 5 cloud credentials. Solutions Architect Associate, Developer, Practitioner, and two Oracle badges. They are rotating on this page. Go click them to verify, or don't. I'm busy polishing my swords.";
    }

    if (lower.includes("mentor") || lower.includes("train") || lower.includes("course") || lower.includes("book") || lower.includes("counsel")) {
      return "Training? Sushan teaches others how to tame the AWS clouds. Cloud Practitioner, SAA, Developer. If you want a strategy session, click 'Book Session' on one of those cards and fill out his request form. Just don't ask me to teach you networking, I can't find my way out of a VPC.";
    }

    if (lower.includes("instagram") || lower.includes("reels") || lower.includes("video") || lower.includes("creator") || lower.includes("content") || lower.includes("nepalcodeharbor")) {
      return "nepalcodeharbor on Instagram. Sushan posts quick cloud guides there. Those videos are looping on this page too. Go explore them, or watch me cut down some bugs.";
    }

    if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("connect")) {
      return "Want to talk to Sushan? Email him at sushanaryal12@gmail.com, find him on LinkedIn, or fill out the Contact form at the bottom of the page. Now leave me alone, I need a drink of Sake.";
    }

    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greetings")) {
      return "Hmph. What do you want? I'm Zoro. Sushan's crewmate or whatever. Ask me about Sushan's AWS certifications, Digo Solutions experience, or training plans. Just keep it quick.";
    }

    return "Hmph. Sushan is a solid cloud architect and developer. Ask me about his AWS certifications, Digo Solutions experience, or mentorship sessions. I can answer, but keep it quick—I need to get back to training.";
  };

  // Query Google Gemini API
  const queryGemini = async (userText, apiKey) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }],
          systemInstruction: { parts: [{ text: SUSHAN_BIO }] }
        })
      });
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (e) {
      console.error(e);
      return "Hmph, had trouble connecting to my live brain. Here's what I know offline: " + getLocalResponse(userText);
    }
  };

  const handleSendMessage = async (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    // Append user message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Stop active speech
    window.speechSynthesis.cancel();

    // Check key availability
    const apiKey = customKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let botResponseText = '';
    if (apiKey) {
      botResponseText = await queryGemini(textToSend, apiKey);
    } else {
      // Small simulated delay for local response
      await new Promise(resolve => setTimeout(resolve, 800));
      botResponseText = getLocalResponse(textToSend);
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { sender: 'bot', text: botResponseText }]);
    speakText(botResponseText);
  };

  return (
    <>
      {/* Floating Zoro Button Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center">
        
        {/* Animated Speech Bubble */}
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 bg-[#0b1329] border border-slate-800 text-[10px] font-extrabold text-slate-200 py-2 px-3 rounded-2xl shadow-xl text-center select-none pointer-events-none z-50"
            >
              Need Direction?
              {/* Bottom caret arrow */}
              <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0b1329] border-r border-b border-slate-800 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-slate-900 border-2 border-slate-800 overflow-hidden shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
          aria-label="Open Zoro Assistant"
        >
          <img src="/chatzoro.png" className="w-full h-full object-cover" alt="Zoro Chatbot" />
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-[360px] xs:max-w-[400px] h-[500px] bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Header Block with Zoro Avatar */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border border-slate-800 overflow-hidden shrink-0">
                  <img src="/chatzoro.png" className="w-full h-full object-cover" alt="Zoro Avatar" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight text-white leading-none">Roronoa Zoro</h4>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-1 block">Sushan's Cloud Crewmate</span>
                </div>
              </div>

              {/* Header Right Action icons */}
              <div className="flex items-center gap-3">
                {/* Voice Output Toggle */}
                <button
                  onClick={() => {
                    const nextVal = !voiceOutputEnabled;
                    setVoiceOutputEnabled(nextVal);
                    if (!nextVal) window.speechSynthesis.cancel();
                  }}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${voiceOutputEnabled ? 'text-blue-500 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'}`}
                  title={voiceOutputEnabled ? "Mute Zoro" : "Unmute Zoro"}
                >
                  {voiceOutputEnabled ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  )}
                </button>

                {/* API Key Settings Button */}
                <button
                  onClick={() => setShowKeySettings(!showKeySettings)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${showKeySettings ? 'text-blue-500 bg-slate-800' : 'text-slate-500 hover:bg-slate-800'}`}
                  title="Gemini Key Config"
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Custom API Key input drawer overlay */}
            <AnimatePresence>
              {showKeySettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-2 text-xs"
                >
                  <label className="font-bold text-slate-400 block uppercase tracking-wider">Gemini API Key (Optional)</label>
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="AI Key triggers live generative brain"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-850 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600/50"
                  />
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Pasting a Gemini Key processes your chats with Zoro's live generative AI. If empty, Zoro replies using his preloaded smart response engine.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message History List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-none bg-slate-950/20">
              {messages.map((msg, index) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={index}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${isBot
                          ? 'bg-[#1e293b]/70 border border-slate-800 text-slate-200 shadow-sm'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                        }`}
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Bot typing animation indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1e293b]/70 border border-slate-800 rounded-2xl px-4 py-3 text-slate-400 text-xs flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Section */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="px-6 py-4 border-t border-slate-800 flex items-center gap-3 bg-slate-950/50"
            >
              {/* Voice Speech Record Button */}
              <button
                type="button"
                onClick={startSpeechRecognition}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border cursor-pointer transition-all ${isListening
                    ? 'border-red-500 bg-red-500/10 text-red-500 animate-pulse'
                    : 'border-slate-800 bg-[#070b13] hover:border-slate-700 text-slate-400 hover:text-white'
                  }`}
                title="Speak to Zoro"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              {/* Text Input Input Field */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Zoro about Sushan..."
                className="flex-1 px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600/50 text-white placeholder:text-slate-600 text-xs md:text-sm transition-all"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-xl bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer transition active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
