import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIResponse = async (category: string, subCategory: string, question: string) => {
  try {
    const prompt = `You are a learning assistant. The user is studying ${category} - ${subCategory}. 
                    Question: ${question}. 
                    Provide a clear and helpful explanation.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // או gpt-4o אם יש גישה
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to get response from AI");
  }
};