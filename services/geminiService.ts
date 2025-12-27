
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Character, Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";
import { applyCharacterTone } from "./responseGenerator";

export const getGeminiResponse = async (
  character: Character,
  userInput: string,
  history: Message[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  
  contents.push({ role: 'user', parts: [{ text: userInput }] });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_PROMPT(character),
        temperature: 0.8,
        topP: 0.95,
      },
    });

    let text = response.text?.trim() || "静かな森の中で、言葉が少し迷子になってしまったようです。";
    
    // Ensure character tone is applied even to AI output
    return applyCharacterTone(character.id, text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
