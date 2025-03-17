import { OpenAI } from 'openai';
import { ResumeData } from './types';

export async function getResume (
  jobDescription: string,
  template: string,
  resumeData: ResumeData | null,
): Promise<ReturnType<OpenAI['chat']['completions']['create']> | undefined> {
  console.log(jobDescription, template, resumeData);

  try {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
      dangerouslyAllowBrowser: true
    });

    let attempts = 0;
    const maxAttempts = 5;
    const baseDelay = 1000;

    while (attempts < maxAttempts) {
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Create a resume using ${jobDescription} ${template} ${resumeData}. Output in raw markdown` }
          ],
        });

        console.log(chatCompletion);
        return chatCompletion;
      } 
      catch (error: any) {
        if (error.status === 429) {
          const retryAfterHeader = error.response?.headers?.['retry-after'];
          const waitTime = retryAfterHeader 
            ? parseInt(retryAfterHeader, 10) * 1000
            : baseDelay * Math.pow(2, attempts) + Math.random() * 1000; // Exponential backoff with jitter

          console.error(`Rate-limited. Retrying in ${waitTime / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          attempts++;
        } 
        else {
          throw error;
        }
      }
    }

    console.error('Max retry attempts reached. Exiting...');
  } 
  catch (error) { 
    console.error('Unexpected error:', error);
  }
}
