import { OpenAI } from 'openai';
import { ChatCompletion, } from 'openai/resources/index.mjs';
import { ResumeData } from './aiScripts/types';

export async function getResume (
  jobDescription: string,
  template: string,
  resumeData: ResumeData,
): Promise<ChatCompletion | undefined | null> {
  if (resumeData.skills.length === 0) return null;

  try {
    const openai = new OpenAI({
      // @ts-ignore
      apiKey: import.meta.env.VITE_OPENAI_API as string,
      dangerouslyAllowBrowser: true
    });

    let attempts: number = 0;
    const maxAttempts: number = 2;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    while (attempts < maxAttempts) {
      try {
        const chatCompletion: ChatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: 'user', content: `Create a resume using ${jobDescription} ${template} ${resumeData}. Output in raw markdown` }],
        });
        return chatCompletion;
      }
      catch (error: any) {
        if (error instanceof OpenAI.APIError && error.status === 429) {
          // @ts-ignore
          const retryAfter: any = error.response?.headers?.get('Retry-After');
          const waitTime: number = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, attempts) * 1000;

          console.error(`Rate-limited. Retrying after ${waitTime / 1000} seconds...`);
          await delay(waitTime);
          attempts++;
        }
        else {
          throw error;
        };
      };
    };

    if (attempts === maxAttempts) console.error('Max retry attempts reached. Exiting...');
  }
  catch (error) { console.error('Unexpected error:', error); }
};
