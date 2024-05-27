export interface Message {
  id: string;
  body: string;
  file: string;
  type: string;
  createdAt: string;
  deletedAt: Date | null;
  conversationId: string;
  senderId: string;
  senderUsername?: string;
  isSeen: false;
  image: string;
  fileExtension: string;
  tempFilePreview?: string;
  sender?: {
    id: string;
    username: string;
    email: string;
    image: string;
  };
}
