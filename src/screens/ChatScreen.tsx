import ChatScreenLayout from "../layout/ChatScreenLayout";
import SendMessageForm from "../components/SendMessageForm";
import MessageList from "../components/MessageList";
import { useParams } from "react-router-dom";
import { Skeleton, Typography } from "antd";
import { useGetConversation } from "../hooks/useConversation.hook";
import { useAppSelector } from "../hooks/redux.hook";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Message } from "../types/Message";
import * as socketService from "../api/services/socket.service";

export default function ChatScreen() {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.auth.userId);
  const [messages, setMessages] = useState<Message[]>([]);

  console.log(userId);
  //   const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    socketService.initSocket();

    socketService.joinConversation(id as string);
    // setMessages([]);

    socketService.onNewMessage((newMessage: Message) => {
      console.log("new message is", newMessage);
      if (newMessage.conversationId === id) {
        console.log("new message is", newMessage);
        setMessages((prev) => [...prev, newMessage]);
        console.log("messages", messages);
      }
    });

    return () => {
      socketService.leaveConversation(id as string);
    };
  }, [id]);

  console.log("messssssssages", messages);
  useEffect(() => {
    console.log("CHAT SCREEN Updated messages array:", messages);
  }, [messages]);

  const { conversation, isLoading, isError } = useGetConversation(id as string);
  if (isError)
    return (
      <Typography.Text type="danger">
        Error fetching conversation
      </Typography.Text>
    );
  return (
    <ChatScreenLayout>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Fragment>
          <Typography.Title level={3}>{conversation?.name}</Typography.Title>
          <MessageList
            messages={
              conversation ? [...conversation.messages, ...messages] : []
            }
          />

          <SendMessageForm
            conversationId={id as string}
            userId={userId as string}
            onSend={(message) => console.log("Sending message:", message)}
          />
        </Fragment>
      )}
    </ChatScreenLayout>
  );
}
