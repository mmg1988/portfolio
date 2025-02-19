import OpenAI from 'openai';

export async function POST(request: Request) {
  const { message } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const completition = await openai.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
      messages: [
        {
          role: 'developer',
          content: 'Generate JSON data based on user context with at least 20 records and basic fields, as cheap/fast as you can, no matter if information is not precise enough'
        },
        {
          role: 'user',
          content: message
        },
      ],
      response_format: {
        type: 'json_object'
      },
      store: true
    });

    return Response.json(JSON.parse(completition.choices[0].message.content!));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (exception: any) {
    console.error(exception);
    return Response.json({ message: exception?.error?.message ?? 'Unknown error' }, { status: 500 });
  }
}