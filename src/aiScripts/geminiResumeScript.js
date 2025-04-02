import { GoogleGenAI } from "@google/genai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'default';
const ai = new GoogleGenAI({ apiKey });
export async function getResumeGemini(jobDescription, template, resumeData) {
    const context = `Filter technical and relevant skills and keep in context: ${jobDescription}`;
    const prompt = `Task: Create a tailored resume based on the following information -> ${resumeData} and using ${template} as an example. Output in raw markdown but be sure to remove all backticks and wrapper content. Also make sure to leave off the 'markdown' at the start and no not ignore any line breaks. Then output a cover letter as well`;
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            systemInstruction: context
        }
    });
    return response.text?.trim();
}
;
