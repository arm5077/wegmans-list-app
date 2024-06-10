export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}
export interface Opts {
  messages?: Message[];
  model?: string;
  response_format?: {
    type: 'json_object' | 'text'
  };

}