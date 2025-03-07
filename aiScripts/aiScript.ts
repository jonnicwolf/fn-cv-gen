import { OpenAI } from 'openai';
import { ChatCompletion, } from 'openai/resources/index.mjs';

export async function getRresume (
  jobDescription: string,
  cards: string[]
): Promise<ChatCompletion | undefined> {
  if (cards.length > 0 && question) {
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
            messages: [{ role: 'user', content: `Make a three card tarot reading using these cards: ${cards} and this question -> ${question}. Always send a reply in the same format as this string: '1. Page of Swords: This card suggests that there may be some skepticism or criticism towards the project from others. It could indicate that not everyone will immediately warm up to the idea or see its potential. However, it also encourages you to stay true to your vision and be open to constructive feedback.

  2. Queen of Pentacles: The Queen of Pentacles represents practicality, abundance, and nurturing energy. This card suggests that the project has the potential to be well-received by others, especially if you approach it with a grounded and nurturing mindset. People may appreciate the stability and tangible benefits that the project can bring.

  3. Nine of Pentacles: This card signifies success, independence, and self-sufficiency. It suggests that the project has the potential to attract attention and admiration from others. People may be impressed by your hard work, dedication, and the high-quality results that the project can deliver. Overall, this card indicates a positive outcome in terms of how people will perceive the project.' Never deviate from this format` }],
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
  }
  else throw new Error('Missing card or question data. get_tarot_reading did not run.');
};