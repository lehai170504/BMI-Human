"use client"
import HomeContent from "@/components/layout/Home/Content";
import FAQ from "@/components/layout/Home/FAQ";
import { useState, useRef, useEffect } from "react";

// SVG icons
const ChatIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2563eb"/>
    <path d="M7 10.5C7 9.11929 8.11929 8 9.5 8H14.5C15.8807 8 17 9.11929 17 10.5V13.5C17 14.8807 15.8807 16 14.5 16H10.5L7 18V10.5Z" fill="white"/>
    <circle cx="10" cy="12" r="1" fill="#2563eb"/>
    <circle cx="12" cy="12" r="1" fill="#2563eb"/>
    <circle cx="14" cy="12" r="1" fill="#2563eb"/>
  </svg>
);

const ExpertAvatar = () => (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-2">
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" fill="#2563eb"/>
      <path d="M4 20c0-2.7614 3.5817-5 8-5s8 2.2386 8 5v1H4v-1z" fill="#2563eb" fillOpacity="0.2"/>
    </svg>
  </span>
);

const UserAvatar = () => (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white ml-2 font-bold">
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" fill="white" fillOpacity="0.8"/>
      <path d="M4 20c0-2.7614 3.5817-5 8-5s8 2.2386 8 5v1H4v-1z" fill="white" fillOpacity="0.3"/>
    </svg>
  </span>
);

export default function Home() {
  // State cho chat với chuyên gia
  const [chat, setChat] = useState([
    { from: "expert", text: "Chào bạn! Bạn cần tư vấn gì về BMI hoặc sức khỏe?" },
  ]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChat([...chat, { from: "user", text: message }]);
    setTimeout(() => {
      setChat(c => [...c, { from: "expert", text: "Cảm ơn bạn, chuyên gia sẽ phản hồi sớm nhất!" }]);
    }, 1000);
    setMessage("");
  };

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, open]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Empty column for left spacing */}
          <div className="hidden lg:block lg:col-span-1" />
          
          {/* Main Content - Center */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <HomeContent />
            </div>
          </div>

          {/* FAQ - Right Side */}
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-8">
              <FAQ />
            </div>
          </div>
        </div>
      </div>
      {/* Floating Chat Popup */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Nút mở chat */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200 focus:outline-none border-4 border-white"
            aria-label="Mở chat với chuyên gia"
            style={{ boxShadow: "0 8px 32px 0 rgba(37,99,235,0.25)" }}
          >
            <span className="sr-only">Mở chat với chuyên gia</span>
            <ChatIcon />
          </button>
        )}
        {/* Popup chat */}
        {open && (
          <div className="w-96 max-w-[95vw] bg-white border border-blue-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up ring-2 ring-blue-200/40">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧑‍⚕️</span>
                <span className="text-white font-bold font-nunito text-lg drop-shadow">Chuyên gia BMI</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white text-2xl font-bold hover:bg-blue-700/30 rounded-full w-10 h-10 flex items-center justify-center transition"
                aria-label="Đóng chat"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            {/* Chat body */}
            <div className="flex flex-col gap-2 h-80 overflow-y-auto px-5 py-4 bg-gradient-to-b from-blue-50 via-white to-blue-100/60">
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-end ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.from === 'expert' && <ExpertAvatar />}
                  <div
                    className={`px-4 py-2 rounded-2xl font-nunito max-w-[70%] text-base shadow-sm
                      ${msg.from === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none ml-2'
                        : 'bg-white text-gray-800 border border-blue-100 rounded-bl-none mr-2'
                      }
                    `}
                    style={{
                      wordBreak: "break-word",
                      boxShadow: msg.from === 'user'
                        ? "0 2px 8px 0 rgba(37,99,235,0.10)"
                        : "0 2px 8px 0 rgba(37,99,235,0.06)"
                    }}
                  >
                    {msg.text}
                  </div>
                  {msg.from === 'user' && <UserAvatar />}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex gap-2 w-full px-5 py-4 bg-white border-t border-blue-100"
              style={{ boxShadow: "0 -2px 8px 0 rgba(37,99,235,0.04)" }}
            >
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="border border-blue-200 rounded-full px-4 py-2 flex-1 font-nunito focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="Nhập tin nhắn cho chuyên gia..."
                autoFocus
                maxLength={300}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-nunito font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-60"
                disabled={!message.trim()}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="white"/>
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
      <style jsx global>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Custom scrollbar for chat */
        .flex.flex-col.gap-2.h-80.overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .flex.flex-col.gap-2.h-80.overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c7d2fe;
          border-radius: 8px;
        }
        .flex.flex-col.gap-2.h-80.overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}