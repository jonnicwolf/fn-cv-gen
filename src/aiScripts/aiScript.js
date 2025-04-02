import { OpenAI } from 'openai';
import { get_encoding } from 'tiktoken';
;
;
;
export async function getResume(jobDescription, template, resumeData) {
    const vite_apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const openai = new OpenAI({
        apiKey: vite_apiKey,
        dangerouslyAllowBrowser: true,
    });
    try {
        let attempts = 0;
        const maxAttempts = 5;
        const baseDelay = 1000;
        const prompt = `Task: Create a tailored resume based on the following information -> ${resumeData} ${template}. Output in raw markdown`;
        const encoder = get_encoding("cl100k_base");
        const tokenCount = encoder.encode(prompt).length;
        console.log(`Token Count: `, tokenCount);
        while (attempts < maxAttempts) {
            try {
                const chatCompletion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: 'developer', content: `Filter technical and relevant skills and keep in context: ${jobDescription}` },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 100,
                    temperature: 0.6
                });
                return chatCompletion.choices[0]?.message?.content || undefined;
            }
            catch (error) {
                console.error(`error status: `, error.status);
                if (error.status === 429) {
                    const retryAfterHeader = error.response?.headers?.['retry-after'];
                    if (retryAfterHeader)
                        console.log(`seconds: `, retryAfterHeader);
                    const waitTime = retryAfterHeader
                        ? parseInt(retryAfterHeader, 10) * 1000
                        : baseDelay * Math.pow(2, attempts) + Math.random() * 1000;
                    console.error(`Rate-limited. Retrying in ${waitTime / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    attempts++;
                }
                else if (error.status === 400) {
                    console.error(`400: context length exceeded`);
                }
                else {
                    throw error;
                }
                ;
            }
            ;
        }
        ;
        console.error('Max retry attempts reached. Exiting...');
    }
    catch (error) {
        console.error('Unexpected error:', error);
    }
    ;
}
;
