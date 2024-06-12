export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string | {
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }[];
}
export interface Opts {
  messages?: Message[];
  model?: string;
  response_format?: {
    type: 'json_object' | 'text'
  };

}