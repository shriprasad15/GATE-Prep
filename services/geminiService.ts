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

    // Upgraded to Gemini 3 Pro for deeper reasoning and better planning
    const model = "gemini-3-pro-preview";
    
    // Transform history for the chat session
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    let text = result.text || "No response generated.";

    // Extract and append grounding metadata (citations) if available
    const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      const uniqueSources = new Map<string, string>();
      
      // Collect unique web sources
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          uniqueSources.set(chunk.web.uri, chunk.web.title);
        }
      });

      // Append sources to the response text in Markdown format
      if (uniqueSources.size > 0) {
        text += "\n\n---\n**Sources:**\n";
        uniqueSources.forEach((title, uri) => {
          text += `- [${title}](${uri})\n`;
        });
      }
    }

    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error connecting to the strategy mainframe. Please check your connection or API key.";
  }
};