export interface ICaloRequest {
    gender: 'male' | 'female';
    age: number;
    weight: number;
    height: number;
    activity: number;
    goal: 'maintain' | 'lose' | 'gain';
}

export interface ICaloData {
    bmr: number;
    tdee: number;
    caloSuggest: number;
}

export interface ICaloResponse {
    success: boolean;
    message: string;
    data: ICaloData;
}

export interface ICaloHistoryResponse {
    success: boolean;
    message: string;
    data: ICaloData[];
}