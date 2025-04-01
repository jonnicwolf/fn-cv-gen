import { GoogleGenAI } from "@google/genai";

import { ResumeData } from '../functions/aiScripts/aiScript';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string || 'default'
const ai = new GoogleGenAI({ apiKey });

export async function getResumeGemini (
  jobDescription: string,
  template: string,
  resumeData: ResumeData | null
) {
  const context = `Filter technical and relevant skills and keep in context: ${jobDescription}`
  const prompt = `Task: Create a tailored resume based on the following information -> ${resumeData} and using ${template} as an example. Output in raw markdown`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction: context
    }
  });
  console.log(response.text);
};
