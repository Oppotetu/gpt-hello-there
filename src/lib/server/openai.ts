import { OPENAI_API_KEY } from "$env/static/private"

type ChatCompletion = {
  "id": string,
  "object": string,
  "created": number,
  "choices": [{
    "index": number,
    "message": {
      "role": string,
      "content": string,
    },
    "finish_reason": string
  }],
  "usage": {
    "prompt_tokens": number,
    "completion_tokens": number,
    "total_tokens": number
  }
}

const isChatCompletion = (data: unknown): data is ChatCompletion => typeof data === 'object' && !!(data as ChatCompletion).choices?.[0].message.content

export const createChatCompletion = async (name: string) => {

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    }),
    body: JSON.stringify({
      model: 'gpt-4',
      messages: 
      [
        {
          role: 'system',
          content: 'You are Simon, a charismatic developer and data manager. Please only repond as Simon.'},
        {
        role: 'user',
        content: `Please respond as if you just saw ${name}, and you wanted to greet him. Make sure to include a pun, ideally using their name!`
      }
    ]
    })
  })

  if (!response.ok) {
    throw new Error(`Could not ask OpenAI to greet ${name}!`)
  }

  const json = await response.json()

  if (!isChatCompletion(json)) {
    throw new Error(`OpenAI did not return a valid chat completion`)    
  }

  return json.choices[0].message.content
}