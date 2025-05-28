'use client';

import Link from "next/link";

export default function Home() {
  const blogPosts = [
    {
      id: 1,
      title: "Làm thế nào để giảm cân lành mạnh?",
      summary: "Hướng dẫn ăn uống và luyện tập để giảm cân an toàn và hiệu quả.",
      image: "/giam-can-lanh-manh.jpg",
      slug: "/blogs/giam-can-lanh-manh"
    },
    {
      id: 2,
      title: "BMI và ý nghĩa của nó trong sức khỏe",
      summary: "Khám phá chỉ số BMI và mối liên hệ với nguy cơ bệnh tật.",
      image: "/bmi-y-nghia.jpg",
      slug: "/blogs/y-nghia-bmi"
    },
    {
      id: 3,
      title: "Tập thể dục thế nào để duy trì BMI lý tưởng?",
      summary: "Các bài tập giúp duy trì cân nặng và cải thiện sức khỏe tổng thể.",
      image: "/tap-the-duc-de-duy-tri-bmi-ly-tuong.jpg",
      slug: "/blogs/giu-bmi-ly-tuong"
    }
  ];

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
      </section>

      <section>
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center font-nunito">Các bài viết nổi bật</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {blogPosts.map(post => (
            <Link key={post.id} href={post.slug} className="group block rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-700 mb-2 font-nunito">{post.title}</h3>
                <p className="text-gray-600 leading-relaxed font-nunito">{post.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
