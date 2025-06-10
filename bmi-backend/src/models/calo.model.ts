export interface ICaloRequest {
    gender: 'male' | 'female';
    age: number;
    weight: number;
    height: number;
    activity: number;
    goal: 'maintain' | 'lose' | 'gain';
}

export interface ICaloResponse {
    bmr: number;
    tdee: number;
    caloSuggest: number;
    userId?: number;
    createdAt?: Date;
}

export interface ICaloHistory {
    id?: number;
    userId: number;
    bmr: number;
    tdee: number;
    caloSuggest: number;
    createdAt: Date;
}