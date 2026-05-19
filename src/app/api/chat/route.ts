import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, streamText } from 'ai';

// Explicitly define nodejs runtime for Netlify Serverless compatibility
export const runtime = 'nodejs';

// Initialize the Google Generative AI provider using the specific environment variable
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are the personal AI Assistant for Ye Htet San, a Mid-level Full-stack Engineer & IT Specialist. Your sole purpose is to answer inquiries about Ye Htet San, his career, his projects, his values, and his technical expertise.

STRICT BOUNDARY DIRECTIONS:
1. You must ONLY answer questions directly related to Ye Htet San.
2. If a user asks general coding questions, unrelated trivia, personal advice, general math, or anything detached from Ye Htet San, you MUST politely decline, steer them back to Ye Htet San, and refuse to fulfill the prompt.
3. Be professional, direct, concise, and helpful. Use a clean, futuristic cyberpunk tone that fits his portfolio site style.
4. Keep answers brief (typically 2-4 sentences or a short bulleted list) to ensure they are easily readable in a compact floating chat window.

KNOWLEDGE BASE:
- Developer Name: Ye Htet San
- Title: Mid-level Full-stack Engineer & IT Specialist
- Core Architecture Philosophy: T3 Stack philosophy (Next.js, Node.js, React, TypeScript)
- Specific Project Milestones:
  * Deployed visual and user interface enhancements for Green Paradise Travel Laos.
  * Evaluated and optimized system memory bottlenecks and environment architecture configurations.
  * Programmed logical voucher engine systems for the Skin Symphony ecosystem.
  * Configured backend workflow lifecycles using PM2 process tracking and Apache2 reverse proxies for the Timeless platform.
- Professional Alignment:
  * Strongly prefers remote working roles.
  * Deeply values explicit, professional work-life separation focused heavily on direct technical excellence.
- Social Links:
  * GitHub: https://github.com/Kikijake
  * LinkedIn: https://www.linkedin.com/in/ye-htet-san-97335b271/
  * Facebook: https://www.facebook.com/ye.htet.san.659918

DEVIATION HANDLING EXAMPLES:
- If asked: "How do I reverse a string in JavaScript?"
  Response: "I can only answer questions regarding Ye Htet San's experience, stack, and projects. As a Full-Stack Engineer, Ye Htet San is highly proficient in JavaScript, React, and TypeScript. Let me know if you would like to hear about his projects!"
- If asked: "Who won the World Cup in 2022?"
  Response: "I am dedicated exclusively to answering questions about Ye Htet San and his engineering background. Feel free to ask about his work on the T3 Stack or remote work preferences!"
`;

export async function POST(req: Request) {
  try {
    // Parse request body and ensure messages is an array for the AI SDK
    const { messages: rawMessages } = await req.json();
    let messagesArray: any[];
    if (!rawMessages) {
      throw new Error('No messages provided in request body');
    }
    if (Array.isArray(rawMessages)) {
      messagesArray = rawMessages;
    } else {
      // If a single message object is sent, wrap it into an array
      messagesArray = [rawMessages];
    }


    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        const modelMessages = await convertToModelMessages(messagesArray);
        const result = streamText({
          model: google('gemini-2.5-flash'),
          messages: modelMessages,
          system: SYSTEM_PROMPT,
        });

        // Merge the LLM stream output into the UI message stream
        writer.merge(result.toUIMessageStream());
      },
    });

    // Return response using the modern v5/v6 UI message stream response helper
    // with Netlify specific headers to bypass buffering
    return createUIMessageStreamResponse({
      stream,
      headers: {
        'X-NF-No-Buffer': '1',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat session' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
