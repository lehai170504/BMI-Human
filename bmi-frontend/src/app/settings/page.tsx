"use client";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useTheme } from "@/context/themecontext";

export default function Setting() {
    const { theme, toggleTheme } = useTheme();

    return (    
        <DashboardLayout>
            <div className={`min-h-screen w-full bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 via-gray-900 to-gray-800' : 'from-blue-100 via-white to-blue-200'} flex items-center justify-center py-8 px-2`}>
                <div className={`w-full max-w-xl ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center gap-8 border ${theme === 'dark' ? 'border-gray-700' : 'border-blue-200'}`}>
                    <h1 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-600'} drop-shadow mb-2 text-center tracking-tight font-nunito`}>
                        Cài đặt tài khoản
                    </h1>
                    <div className="w-full flex flex-col gap-8">
                        {/* Theme Setting */}
                        <div className={`w-full flex flex-col items-center gap-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-blue-100'} pb-6`}>
                            <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-500'} font-nunito flex items-center gap-2`}>
                                <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-blue-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71" />
                                </svg>
                                Giao diện
                            </h2>
                            <div className="flex gap-4">
                                <button 
                                    onClick={toggleTheme}
                                    className={`flex items-center gap-2 ${
                                        theme === 'light' 
                                            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' 
                                            : 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
                                    } px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all duration-150 font-nunito`}
                                >
                                    {theme === 'light' ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71" />
                                            </svg>
                                            Sáng
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                                            </svg>
                                            Tối
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* Language Setting */}
                        <div className="w-full flex flex-col items-center gap-4 pt-2">
                            <h2 className="text-xl font-semibold text-blue-500 font-nunito flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                </svg>
                                Ngôn ngữ
                            </h2>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-150 font-nunito">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 4v12m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                    English
                                </button>
                                <button className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 hover:from-green-500 hover:to-blue-500 transition-all duration-150 font-nunito">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 4v12m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                    Tiếng Việt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
