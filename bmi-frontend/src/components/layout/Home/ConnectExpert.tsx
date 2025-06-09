"use client";
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

export default function ConnectExpert() {
  const [chat, setChat] = useState([
    { from: "expert", text: "Chào bạn! Bạn cần tư vấn gì về BMI hoặc sức khỏe?" },
  ]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Thêm các state cho các tính năng mới
  const [historySent, setHistorySent] = useState(false);
  const [appointment, setAppointment] = useState("");
  const [appointmentMsg, setAppointmentMsg] = useState("");
  const [sendAnim, setSendAnim] = useState(false);

  // Hiệu ứng mở/đóng popup
  useEffect(() => {
    if (open) {
      setPopupVisible(true);
    } else {
      // Đợi animation trước khi ẩn
      const timeout = setTimeout(() => setPopupVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSendAnim(true);
    setChat([...chat, { from: "user", text: message }]);
    setTimeout(() => {
      setChat(c => [...c, { from: "expert", text: "Cảm ơn bạn, chuyên gia sẽ phản hồi sớm nhất!" }]);
      setSendAnim(false);
    }, 1000);
    setMessage("");
  };

  // Gửi lịch sử BMI
  const handleSendHistory = () => {
    setHistorySent(true);
    setTimeout(() => {
      setChat(c => [...c, { from: "expert", text: "Tôi đã nhận được lịch sử BMI của bạn. Sẽ phân tích và phản hồi chi tiết!" }]);
    }, 1500);
  };

  // Đặt lịch tư vấn
  const handleBook = (e: any) => {
    e.preventDefault();
    setAppointmentMsg(`Bạn đã đặt lịch tư vấn vào ${appointment}. Chuyên gia sẽ liên hệ với bạn!`);
    setAppointment("");
  };

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, open]);

  return (
    <>
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
        {popupVisible && (
          <div className={`w-[95vw] max-w-md bg-white border border-blue-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-2 ring-blue-200/40
            ${open ? 'animate-fade-in-up' : 'animate-fade-out-down'}`}
            style={{ pointerEvents: open ? 'auto' : 'none' }}
          >
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
            {/* Section: Gửi lịch sử BMI */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex flex-col gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span className="font-nunito font-semibold text-blue-700">Gửi lịch sử BMI cho chuyên gia:</span>
                </div>
                <button
                  onClick={handleSendHistory}
                  disabled={historySent}
                  className={`px-4 py-2 rounded-lg font-nunito font-semibold shadow transition text-sm ${historySent ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  {historySent ? "Đã gửi" : "Gửi ngay"}
                </button>
              </div>
            </div>
            {/* Section: Đặt lịch tư vấn */}
            <div className="px-5 pb-2">
              <form onSubmit={handleBook} className="flex flex-col gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                <div className="font-nunito font-semibold text-green-700">Đặt lịch tư vấn với chuyên gia:</div>
                <div className="flex gap-2 items-center">
                  <input
                    type="datetime-local"
                    value={appointment}
                    onChange={e => setAppointment(e.target.value)}
                    className="border rounded px-2 py-1 flex-1"
                    required
                  />
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg font-nunito font-semibold hover:bg-green-600 transition text-sm">Đặt lịch</button>
                </div>
              </form>
              {appointmentMsg && (
                <div className="w-full bg-green-100 border border-green-300 rounded-xl p-3 text-center font-nunito text-green-700 mt-2 text-sm">
                  {appointmentMsg}
                </div>
              )}
            </div>
            {/* Chat body */}
            <div className="flex flex-col gap-2 h-60 overflow-y-auto px-5 py-4 bg-gradient-to-b from-blue-50 via-white to-blue-100/60 mt-1 rounded-xl">
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-end ${msg.from === 'user' ? 'justify-end' : 'justify-start'} ${sendAnim && idx === chat.length - 1 && msg.from === 'user' ? 'animate-bounce-send' : ''}`}
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
                className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-nunito font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-60 ${sendAnim ? 'animate-send-btn' : ''}`}
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
        .animate-fade-out-down {
          animation: fadeOutDown 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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
        @keyframes fadeOutDown {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(40px);
          }
        }
        /* Custom scrollbar for chat */
        .flex.flex-col.gap-2.h-60.overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .flex.flex-col.gap-2.h-60.overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c7d2fe;
          border-radius: 8px;
        }
        .flex.flex-col.gap-2.h-60.overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        /* Animation gửi tin nhắn */
        .animate-bounce-send {
          animation: bounceSend 0.4s;
        }
        @keyframes bounceSend {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(1.08) translateY(-8px); }
          60% { transform: scale(0.96) translateY(2px); }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-send-btn {
          animation: sendBtn 0.3s;
        }
        @keyframes sendBtn {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
