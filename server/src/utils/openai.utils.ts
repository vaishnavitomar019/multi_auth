import fetch from 'node-fetch';

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
}

export async function getPdfSummary(pdfText: string): Promise<string> {
  const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(openaiEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', 
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes PDF documents.',
        },
        {
          role: 'user',
          content: `Summarize this PDF content:\n\n${pdfText}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.5,
    }),
  });

const data = (await response.json()) as OpenAIResponse;

  if (!response.ok || !data.choices || !data.choices.length) {
    throw new Error(data.error?.message || 'OpenAI API error');
  }

  return data.choices[0].message.content;
}
