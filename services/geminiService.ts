
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuizQuestions = async (category: string, count: number = 5) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate ${count} multiple choice questions for the competitive exam category: ${category}. Focus on General Knowledge and Current Affairs relevant to Indian government exams.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.INTEGER, description: "Index (0-3) of the correct answer" },
              year: { type: Type.INTEGER },
              type: { type: Type.STRING, description: "either 'basic' or 'advanced'" }
            },
            required: ["question", "options", "correctAnswer"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating questions:", error);
    return null;
  }
};

export const getInterviewFeedback = async (transcript: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are an expert UPSC interview panelist. Critique this answer provided by a candidate: "${transcript}". Provide a score out of 10 and 3 constructive improvement points.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { score: 0, feedback: ["Unable to process feedback at this time."] };
  }
};
