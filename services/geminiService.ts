import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the API client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model', text: string }[]
): Promise<string> => {
  try {
    if (!apiKey) {
      return "Error: API_KEY not found in environment variables.";
    }

    const model = "gemini-3-flash-preview";
    
    // Transform history for the chat session
    // Note: The new SDK manages history via the chat object, but we can also just pass the context
    // For simplicity in this stateless service, we'll use generateContent with a constructed prompt or chat
    // But to be proper with the SDK guidelines, let's use the chat feature.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    return result.text || "No response generated.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error connecting to the strategy mainframe. Please check your connection or API key.";
  }
};