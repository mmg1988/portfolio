import OpenAI from 'openai';

export async function POST(request: Request) {
  const { message } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  const completition = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'developer',
        content: 'Generate JSON data based on user context with at least 100 records and several properties'
      },
      {
        role: 'user',
        content: message
      },
    ],
    response_format: {
      type: 'json_object'
    }
  });
  console.log(completition);

  return Response.json(completition.choices[0].message.content);
}