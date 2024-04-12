export type Conversation = {
  _id: string;
  members: string[];
  createdAt: Date;
  uptadedAt: Date;
};
export type Chat = {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
};
export type SimpleResponse<T> = {
  response?: T;
  error?: any;
};
