import { DefaultEventsMap } from "@socket.io/component-emitter";
import io, { Socket } from "socket.io-client";
import { Message } from "../../types/Message";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
const VITE_LOCAL_BASE_URL = import.meta.env.VITE_LOCAL_BASE_URL;
const VITE_PROD_BASE_URL = import.meta.env.VITE_PROD_BASE_URL;
const VITE_CURRENT_ENV = import.meta.env.VITE_CURRENT_ENV;
export const initSocket = () => {
  console.log("hello");
  socket = io(
    VITE_CURRENT_ENV === "local" ? VITE_LOCAL_BASE_URL : VITE_PROD_BASE_URL
  );
  console.log(socket);
  console.log("Connecting socket...");
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const onNewMessage = (cb: (message: Message) => void) => {
  socket.on("newMessage", cb);
};

export const joinConversation = (conversationId: string) => {
  socket.emit("joinConversation", { conversationId });
};

export const leaveConversation = (conversationId: string) => {
  socket.emit("leaveConversation", { conversationId });
};

export const onUploadingMessage = (
  cb: (data: {
    status: "error" | "uploading" | "uploaded";
    messageId: string;
  }) => void
) => {
  console.log("onUploadingMessage", cb);
  socket.on("loadingStatus", cb);
};

export const sendMessage = ({
  conversationId,
  senderId,
  messageBody,
  messageType,
  username,
  file,
  fileExtension,
  tempFilePreview,
}: {
  conversationId: string;
  senderId: string;
  messageBody: string;
  messageType: string;
  username: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
  fileExtension: string;
  tempFilePreview: string | null;
}) => {
  socket.emit("sendMessage", {
    conversationId,
    senderId,
    messageBody,
    messageType,
    file,
    username,
    fileExtension,
    tempFilePreview,
  });
};
