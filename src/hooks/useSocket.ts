// hooks/useSocket.js

import { useEffect, useState } from "react";
import * as socketService from "../api/services/socket.service";
import { Message } from "../types/Message";

const useSocket = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<
    "uploading" | "uploaded" | "error" | "idle"
  >("idle");

  useEffect(() => {
    console.log("conversationId", conversationId);
    socketService.initSocket();

    socketService.joinConversation(conversationId);
    setMessages([]);

    socketService.onNewMessage((newMessage: Message) => {
      console.log("new message is", newMessage);
      if (newMessage.conversationId === conversationId) {
        console.log("new message is", newMessage);
        setMessages((prev) => [...prev, newMessage]);
        console.log("messages", messages);
      }
    });

    socketService.onUploadingMessage((data) => {
      console.log(data);
      console.log("status", data.status);
      setStatus(data.status);
      console.log(status);
    });

    return () => {
      socketService.leaveConversation(conversationId);
    };
  }, [conversationId]);

  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);
  console.log("messages(1)", messages);
  return {
    sendMessage: socketService.sendMessage,
    messages,
    status,
  };
};

export default useSocket;
