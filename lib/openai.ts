type OpenAIChatMessage = {
  role: "system" | "user";
  content: string;
};

type CreateChatCompletionInput = {
  messages: OpenAIChatMessage[];
  temperature?: number;
};

export async function createChatCompletion({
  messages,
  temperature = 0.2,
}: CreateChatCompletionInput) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      temperature,
      messages,
      response_format: {
        type: "json_object",
      },
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI request failed");
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI response is empty");
  }

  return content;
}