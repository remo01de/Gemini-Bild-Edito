import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const editImageWithGemini = async (prompt: string, imageBase64: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
    }
    
    throw new Error("Keine Bilddaten in der API-Antwort gefunden.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("Ungültiger API-Schlüssel. Bitte überprüfen Sie Ihre Konfiguration.");
    }
    throw new Error("Fehler beim Generieren des Bildes mit der Gemini API.");
  }
};