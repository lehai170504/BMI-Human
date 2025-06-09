"use client";
import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

export default function ConnectExpert() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([
        { from: "expert", text: "Chào bạn! Tôi là chuyên gia dinh dưỡng. Bạn cần tư vấn gì?" },
    ]);
    const [historySent, setHistorySent] = useState(false);
    const [appointment, setAppointment] = useState("");
    const [appointmentMsg, setAppointmentMsg] = useState("");

    // Gửi tin nhắn chat
    const handleSend = (e: any) => {
        e.preventDefault();
        if (!message.trim()) return;
        setChat([...chat, { from: "user", text: message }]);
        setTimeout(() => {
            setChat(c => [...c, { from: "expert", text: "Cảm ơn bạn, tôi sẽ phản hồi sớm nhất!" }]);
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

    return (
        <DashboardLayout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8 px-2">
                <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-8 border border-blue-200">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center font-nunito">🧑‍⚕️ Kết nối chuyên gia</h1>
                    <p className="text-gray-500 text-center mb-4 font-nunito">
                        Gửi kết quả BMI, lịch sử sức khỏe cho chuyên gia để nhận tư vấn cá nhân hóa và xây dựng lộ trình khoa học.
                    </p>
                    {/* Gửi lịch sử BMI */}
                    <div className="w-full flex flex-col md:flex-row items-center gap-4 justify-between bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div>
                            <span className="font-nunito font-semibold text-blue-700">Gửi lịch sử BMI cho chuyên gia:</span>
                        </div>
                        <button
                            onClick={handleSendHistory}
                            disabled={historySent}
                            className={`px-4 py-2 rounded font-nunito font-semibold shadow transition ${historySent ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            {historySent ? "Đã gửi" : "Gửi ngay"}
                        </button>
                    </div>
                    {/* Đặt lịch tư vấn */}
                    <form onSubmit={handleBook} className="w-full flex flex-col md:flex-row items-center gap-4 justify-between bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="font-nunito font-semibold text-green-700">Đặt lịch tư vấn với chuyên gia:</div>
                        <input
                            type="datetime-local"
                            value={appointment}
                            onChange={e => setAppointment(e.target.value)}
                            className="border rounded px-2 py-1"
                            required
                        />
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded font-nunito font-semibold hover:bg-green-600 transition">Đặt lịch</button>
                    </form>
                    {appointmentMsg && (
                        <div className="w-full bg-green-100 border border-green-300 rounded-xl p-3 text-center font-nunito text-green-700">
                            {appointmentMsg}
                        </div>
                    )}
                    {/* Khu vực chat */}
                    <div className="w-full bg-white border border-blue-100 rounded-xl p-4 shadow flex flex-col gap-2 h-80 overflow-y-auto">
                        {chat.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 rounded-2xl font-nunito max-w-xs ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className="flex gap-2 w-full">
                        <input
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="border rounded px-3 py-2 flex-1 font-nunito"
                            placeholder="Nhập tin nhắn cho chuyên gia..."
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-nunito font-semibold hover:bg-blue-600 transition">Gửi</button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
} 