import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

// וידוא טעינת משתני סביבה באופן מפורש מקובץ השרת הראשי
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("CRITICAL WARNING: GEMINI_API_KEY is missing in .env file!");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateAIResponse = async (category: string, subCategory: string, question: string): Promise<string> => {
  try {
    const prompt = `You are a professional learning assistant. The user is studying the topic: ${category} - ${subCategory}. 
                    Please answer the following question in Hebrew:
                    Question: ${question}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "לא התקבל מענה מה-AI.";
  } catch (error) {
    console.error("Gemini AI Service Error:", error);
    throw new Error("Failed to get response from AI");
  }
};