import { isError, useMutation, useQuery } from "react-query";

import { message } from "antd";
import { useAppSelector } from "./redux.hook";
import {
  createConversation,
  getConversation,
  getConversations,
} from "../api/services/coversation.service";
import { useNavigate } from "react-router-dom";

export const useConversation = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.userId);
  const addConversation = useMutation(
    (data: { name: string; usernames: string[]; isGroup: boolean }) => {
      return createConversation({ ...data, userId: user as string });
    },
    {
      onSuccess: (data) => {
        console.log(data);
        message.success("Conversation created successfully");
        navigate(`/conversation/${data.id}`);
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log(error);

        message.error(`Error creating conversation ${error.data.message}`);
      },
    }
  );

  const conversations = useQuery("conversations", getConversations, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return {
    createConversation: addConversation.mutate,
    refetch: addConversation.reset,
    isLoading: addConversation.isLoading,
    isError: isError(addConversation.error),
    conversations: conversations.data,
  };
};

export const useGetConversation = (id: string) => {
  const conversation = useQuery(
    ["conversation", id],
    () => getConversation(id),
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log("error");
        message.error(
          `Error fetching conversation ${error.response.data.message}`
        );
      },
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  return {
    conversation: conversation.data,
    isLoading: conversation.isLoading,
    isError: conversation.isError,
  };
};
