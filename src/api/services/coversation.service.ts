import { api } from "../api.config";

export const createConversation = async ({
  userId,
  usernames,
  name,
}: {
  usernames: string[];
  userId: string;
  name: string;
}) => {
  try {
    const response = await api.post("/v1/conversation/usernames", {
      usernames,
      admin: userId,
      name,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getConversations = async () => {
  try {
    const response = await api.get("/v1/conversation");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getConversation = async (conversationId: string) => {
  const response = await api.get(`/v1/conversation/${conversationId}`);
  return response.data;
};
