import OpenAI from 'openai'

export interface Opts {
  messages?: OpenAI.Chat.ChatCompletionMessageParam[];
  model?: string;
  response_format?: {
    type: 'json_object' | 'text'
  };

}