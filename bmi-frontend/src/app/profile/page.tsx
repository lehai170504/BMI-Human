'use client'

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/Auth/authSlice";

export default function ProfilePage() {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-10 text-red-500 font-nunito">
          Bạn chưa đăng nhập!
        </div>  
      </DashboardLayout>
    );
  }

  const showValue = (val: any) =>
    val !== undefined && val !== null && val !== "" ? val : "Chưa cập nhật";

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-md mb-6 object-cover"
        />
        <h1 className="text-3xl font-bold font-nunito mb-1 text-gray-800">{showValue(user.name)}</h1>
        <p className="text-gray-500 mb-4 font-nunito">{showValue(user.email)}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full font-nunito mt-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Tuổi</h2>
            <p className="text-lg font-semibold text-gray-800">{showValue(user.age)}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Giới tính</h2>
            <p className="text-lg font-semibold text-gray-800">
              {user.gender === "male"
                ? "Nam"
                : user.gender === "female"
                ? "Nữ"
                : user.gender
                ? "Khác"
                : "Chưa cập nhật"}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Chiều cao (cm)</h2>
            <p className="text-lg font-semibold text-gray-800">{showValue(user.height)}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Cân nặng (kg)</h2>
            <p className="text-lg font-semibold text-gray-800">{showValue(user.weight)}</p>
          </div>
        </div>

        <button className="mt-8 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition" onClick={() => dispatch(logout())}>
          Chỉnh sửa thông tin
        </button>
      </div>
    </DashboardLayout>
  );
}