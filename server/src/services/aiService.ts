import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// אתחול ה-SDK של גוגל עם המפתח מה-env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAIResponse = async (category: string, subCategory: string, question: string): Promise<string> => {
  try {
    const prompt = `You are a professional learning assistant. The user is studying the topic: ${category} - ${subCategory}. 
                    Please answer the following question in Hebrew:
                    Question: ${question}`;

    // קריאה למודל העדכני והמהיר של גוגל
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "לא התקבל מענה מה-AI.";
  } catch (error) {
    console.error("Gemini AI Service Error:", error);
    throw new Error("Failed to get real response from Gemini AI");
  }
};