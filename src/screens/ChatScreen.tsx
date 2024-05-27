import ChatScreenLayout from "../layout/ChatScreenLayout";
import SendMessageForm from "../components/SendMessageForm";
import MessageList from "../components/MessageList";
import { useParams } from "react-router-dom";
import { Skeleton, Typography } from "antd";
import { useGetConversation } from "../hooks/useConversation.hook";
import { useAppSelector } from "../hooks/redux.hook";
import useSocket from "../hooks/useSocket";
import { Fragment } from "react/jsx-runtime";

export default function ChatScreen() {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.auth.userId);
  //   const user = useAppSelector((state) => state.auth);
  const { messages } = useSocket(userId as string);
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
