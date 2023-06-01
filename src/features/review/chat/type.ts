export type MessageFrom = 'me' | 'other';
export type MessageOrder = 'single' | 'first' | 'middle' | 'end';

export interface MessageType {
  from: MessageFrom;
  content: string;
}
