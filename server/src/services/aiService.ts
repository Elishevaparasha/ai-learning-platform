import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateAIResponse = async (prompt: string, retries = 3): Promise<string> => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY in .env file');
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (!response?.text) throw new Error('Empty response received from Gemini API');
      return response.text;
    } catch (error: any) {
      const isUnavailable = error?.status === 503 || error?.message?.includes('503');
      if (isUnavailable && attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        continue;
      }
      throw error;
    }
  }

  throw new Error('Failed after multiple retries');
};
