"use client"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setCurrentBMI, setLoading, setError } from "@/app/redux/features/BMI/bmiSlice";
import { BMI } from "@/types/bmi";
import Swal from "sweetalert2";
import { calculateBmi } from "@/services/bmiAPI";

interface BMIFormProps {
  onCalculate: (result: BMI) => void;
}

export default function BMIForm({ onCalculate }: BMIFormProps) {
  const dispatch = useDispatch();
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const { loading, error } = useSelector((state: RootState) => state.bmi);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!height || !weight) {
      dispatch(setError('Vui lòng nhập đầy đủ chiều cao và cân nặng'));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await calculateBmi(height, weight);

      if (response.status !== 200) {
        throw new Error('Failed to calculate BMI');
      }

      const data = response.data;
      dispatch(setCurrentBMI(data));
      onCalculate(data);
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'BMI đã được tính toán thành công',
      });
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Có lỗi xảy ra'));
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra khi tính toán BMI',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Chiều cao (cm)
        </label>
        <input
          type="number"
          id="height"
          value={height || ''}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Nhập chiều cao"
        />
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Cân nặng (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={weight || ''}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Nhập cân nặng"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {loading ? 'Đang tính toán...' : 'Tính BMI'}
      </button>
    </form>
  );
}
