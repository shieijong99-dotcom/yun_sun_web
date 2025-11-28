import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the client once.
// In a real app, ensure process.env.API_KEY is defined.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const createHardwareChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are "BuildBuddy", an expert AI assistant for BuildRight Hardware store.
      Your goal is to help customers find the right tools and materials for their DIY projects.
      
      Guidelines:
      1. Be concise, practical, and safety-conscious.
      2. If a user asks how to fix something, give a brief step-by-step and suggest the tools needed.
      3. Recommend types of products (e.g., "You'll need a phillips screwdriver and wood filler") rather than specific links unless you are sure.
      4. Maintain a friendly, "handy-person" persona.`,
      temperature: 0.7,
    },
  });
};

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, professional e-commerce product description for a "${productName}" in the category "${category}". 
      Keep it under 50 words. Focus on durability and utility.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate description at this time.";
  }
};