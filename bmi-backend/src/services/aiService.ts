import { OpenAI } from 'openai';

export class AIService {
  private openai: OpenAI;


    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }   
    
    async getExplanation(bmi: number, category: string) {   
        const response = await this.openai.chat.completions.create({    
            model: "gpt-3.5-turbo", 
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that explains BMI categories."
                },
                {
                    role: "user",
                    content: `I have a BMI of ${bmi} and I am ${category}. Can you explain what this means?`
                }
            ]
        });
        return response.choices[0].message.content;
    }   
}      
