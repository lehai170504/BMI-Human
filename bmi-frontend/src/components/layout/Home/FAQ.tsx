export default function FAQ() {
    return (
        <div className="space-y-8">
            {/* FAQ Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6 font-nunito">Câu hỏi thường gặp</h2>
                    <div className="space-y-4">
                        <details className="group bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100" open>
                            <summary className="cursor-pointer p-4 text-lg font-semibold text-blue-700 font-nunito outline-none focus:ring-2 focus:ring-blue-400">
                                BMI có chính xác cho tất cả mọi người không?
                            </summary>
                            <div className="px-4 pb-4">
                                <p className="text-gray-600 font-nunito text-sm leading-relaxed">
                                    BMI là một chỉ số hữu ích nhưng không hoàn hảo. Nó không tính đến các yếu tố như khối lượng cơ bắp, cấu trúc xương, tuổi tác, giới tính và sắc tộc. Vận động viên hoặc người có nhiều cơ bắp có thể có BMI cao mà không thừa cân.
                                </p>
                            </div>
                        </details>

                        <details className="group bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
                            <summary className="cursor-pointer p-4 text-lg font-semibold text-blue-700 font-nunito outline-none focus:ring-2 focus:ring-blue-400">
                                Tôi nên đo BMI bao lâu một lần?
                            </summary>
                            <div className="px-4 pb-4">
                                <p className="text-gray-600 font-nunito text-sm leading-relaxed">
                                    Bạn nên kiểm tra BMI định kỳ mỗi 3-6 tháng để theo dõi sự thay đổi. Tuy nhiên, nếu bạn đang trong quá trình giảm cân hoặc tăng cân, có thể kiểm tra thường xuyên hơn.
                                </p>
                            </div>
                        </details>

                        <details className="group bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100">
                            <summary className="cursor-pointer p-4 text-lg font-semibold text-blue-700 font-nunito outline-none focus:ring-2 focus:ring-blue-400">
                                BMI có áp dụng cho trẻ em không?
                            </summary>
                            <div className="px-4 pb-4">
                                <p className="text-gray-600 font-nunito text-sm leading-relaxed">
                                    BMI cho trẻ em được tính toán khác với người lớn. Cần sử dụng biểu đồ tăng trưởng đặc biệt dựa trên độ tuổi và giới tính của trẻ.
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
            </section>

            {/* Health Advice Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6 font-nunito">Lời khuyên sức khỏe</h2>
                    <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 transition-all duration-200 hover:shadow-md">
                            <h3 className="text-lg font-semibold mb-2 text-green-700 font-nunito">BMI Bình thường (18.5 - 24.9)</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm font-nunito">
                                <li>Duy trì chế độ ăn cân bằng</li>
                                <li>Tập thể dục đều đặn 30 phút mỗi ngày</li>
                                <li>Ngủ đủ 7-8 giờ mỗi đêm</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 transition-all duration-200 hover:shadow-md">
                            <h3 className="text-lg font-semibold mb-2 text-yellow-700 font-nunito">BMI Thừa cân (25 - 29.9)</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm font-nunito">
                                <li>Giảm lượng calo nạp vào</li>
                                <li>Tăng cường hoạt động thể chất</li>
                                <li>Ăn nhiều rau xanh và protein nạc</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 transition-all duration-200 hover:shadow-md">
                            <h3 className="text-lg font-semibold mb-2 text-red-700 font-nunito">BMI Béo phì (&ge; 30)</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm font-nunito">
                                <li>Tham khảo ý kiến bác sĩ</li>
                                <li>Thực hiện chế độ ăn kiêng khoa học</li>
                                <li>Tập thể dục dưới sự hướng dẫn</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 transition-all duration-200 hover:shadow-md">
                            <h3 className="text-lg font-semibold mb-2 text-blue-700 font-nunito">BMI Thấp (&lt; 18.5)</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm font-nunito">
                                <li>Tăng lượng calo lành mạnh</li>
                                <li>Ăn nhiều bữa nhỏ trong ngày</li>
                                <li>Tập luyện để tăng cơ bắp</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}