import { List } from "antd";
import MessageItem from "./MessageItem";
import { Message } from "../types/Message";

interface Props {
  messages: Array<Message>;
}

const MessageList = ({ messages }: Props) => {
  return (
    <List
      className="w-full"
      dataSource={messages}
      renderItem={(item) => (
        <List.Item>
          <MessageItem key={item.id} {...item} />
        </List.Item>
      )}
    />
  );
};

export default MessageList;
