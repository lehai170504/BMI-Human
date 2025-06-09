'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HomeContent() {
  const bmiData = {
    labels: ['Gầy', 'Bình thường', 'Thừa cân', 'Béo phì I', 'Béo phì II', 'Béo phì III'],
    datasets: [
      {
        label: 'BMI Ranges',
        data: [18.5, 24.9, 29.9, 34.9, 39.9, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Biểu đồ phân loại chỉ số BMI theo WHO',
        font: {
          family: 'Nunito',
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'BMI (kg/m²)',
          font: {
            family: 'Nunito'
          }
        }
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-white text-gray-800">
          <section className="mb-14">
            <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-700 font-nunito">BMI là gì?</h1>
            <p className="text-lg font-nunito leading-relaxed text-justify max-w-4xl mx-auto mb-5">
              <strong>Chỉ số khối cơ thể (BMI - Body Mass Index)</strong> là một chỉ số đo lường dựa trên cân nặng và chiều cao để đánh giá tình trạng cơ thể của một người.
              BMI được sử dụng rộng rãi trong lĩnh vực y tế nhằm xác định xem một người có đang ở mức cân nặng bình thường, thừa cân hay thiếu cân.
            </p>
            <p className="text-lg font-nunito leading-relaxed text-justify max-w-4xl mx-auto mb-5">
              Công thức tính BMI rất đơn giản:
            </p>
            <div className="bg-blue-50 border border-blue-300 p-6 rounded-xl text-center font-nunito font-semibold text-blue-700 text-xl max-w-md mx-auto mb-8 select-text">
              BMI = Cân nặng (kg) / (Chiều cao (m))²
            </div>
            <p className="text-lg font-nunito leading-relaxed text-justify max-w-4xl mx-auto mb-6">
              Ví dụ, một người cao 1.7 mét và nặng 70 kg sẽ có BMI = 70 / (1.7 * 1.7) ≈ 24.22. Dựa trên giá trị này, bạn có thể biết được tình trạng sức khỏe của mình thuộc nhóm nào.
            </p>
            <p className="text-lg font-nunito leading-relaxed text-justify max-w-4xl mx-auto mb-6">
              Mặc dù BMI rất tiện lợi và dễ tính, nhưng nó có hạn chế vì không phân biệt được tỷ lệ mỡ và cơ bắp trong cơ thể. Vì vậy, các vận động viên hoặc người có cơ bắp phát triển có thể có BMI cao nhưng không thừa cân hay béo phì.
            </p>
            <p className="text-lg font-nunito leading-relaxed text-justify max-w-4xl mx-auto mb-6">
              BMI cũng không áp dụng chính xác cho phụ nữ mang thai hoặc người già vì sự thay đổi về cấu trúc cơ thể theo từng giai đoạn.
            </p>

            <h2 className="text-3xl font-semibold text-blue-600 mb-5 text-center font-nunito">Phân loại chỉ số BMI theo WHO</h2>
            <p className="text-lg font-nunito leading-relaxed text-justify max-w-4xl mx-auto mb-6">
              Chỉ số BMI được phân loại theo các mức độ sau:
            </p>
            <table className="w-full max-w-3xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-blue-100 text-blue-700 font-nunito font-semibold">
                <tr>
                  <th className="border border-gray-300 px-6 py-3 font-nunito">Phân loại</th>
                  <th className="border border-gray-300 px-6 py-3 font-nunito">Chỉ số BMI (kg/m²)</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 bg-white">
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-3 font-nunito">Gầy</td>
                  <td className="border border-gray-300 px-6 py-3 font-nunito">&lt; 18.5</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-3 font-nunito">Bình thường</td>
                  <td className="border border-gray-300 px-6 py-3 font-nunito">18.5 – 24.9</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-3 font-nunito">Thừa cân</td>
                  <td className="border border-gray-300 px-6 py-3 font-nunito">25 – 29.9</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-3 font-nunito">Béo phì cấp độ I</td>
                  <td className="border border-gray-300 px-6 py-3 font-nunito">30 – 34.9</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-3 font-nunito">Béo phì cấp độ II</td>
                  <td className="border border-gray-300 px-6 py-3 font-nunito">35 – 39.9</td>
                </tr>
                <tr className="hover:bg-blue-50 transition">
                  <td className="border border-gray-300 px-6 py-3 font-nunito">Béo phì cấp độ III</td>
                  <td className="border border-gray-300 px-6 py-3 font-nunito">&ge; 40</td>
                </tr>
              </tbody>
            </table>
            <div className="w-full max-w-4xl mx-auto mt-8 mb-12">
              <Bar data={bmiData} options={options} />
            </div>
          </section>

          <section className="mb-14">
            <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 via-white to-pink-50 rounded-2xl shadow-lg py-10 px-6 md:px-16">
              <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-4 text-center font-nunito drop-shadow-sm">
                Muốn biết chỉ số BMI của bạn? <br className="hidden md:block" />
                Hãy trải nghiệm ngay cùng chúng tôi!
              </h1>
              <p className="text-lg text-gray-600 mb-6 text-center font-nunito max-w-2xl">
                Công cụ tính BMI của chúng tôi giúp bạn theo dõi sức khỏe dễ dàng, nhanh chóng và chính xác. Hãy bắt đầu hành trình chăm sóc bản thân ngay hôm nay!
              </p>
              <Link
                href="/bmi-calculator"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-colors duration-200 text-white px-8 py-3 rounded-full font-nunito font-bold text-lg shadow-md"
              >
                Tính BMI ngay
              </Link>
            </div>
          </section>

          <section className="mb-14">  
            <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-50 via-white to-red-50 rounded-2xl shadow-lg py-10 px-6 md:px-16">
              <h1 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-4 text-center font-nunito drop-shadow-sm">
                Nhận tư vấn từ chuyên gia <br className="hidden md:block" />
                Hãy để chúng tôi giúp bạn!
              </h1>
              <p className="text-lg text-gray-600 mb-6 text-center font-nunito max-w-2xl">
                Chúng tôi có đội ngũ chuyên gia giàu kinh nghiệm, sẵn sàng hỗ trợ bạn trong việc theo dõi sức khỏe và đạt được mục tiêu của mình.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 transition-colors duration-200 text-white px-8 py-3 rounded-full font-nunito font-bold text-lg shadow-md"
              >
                Liên hệ ngay
              </Link>
            </div>
          </section>
    </div>
  );
}
