export interface IBMI {
  id?: number;
  userId: number;
  weight: number;
  height: number;
  bmiValue: number;
  category: string;
  date?: Date;
} 