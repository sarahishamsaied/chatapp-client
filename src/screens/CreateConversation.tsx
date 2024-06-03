import { Button, Form, Input, Mentions, Typography } from "antd";
import { useState, useEffect } from "react";
import ChatScreenLayout from "../layout/ChatScreenLayout";
import { useConversation } from "../hooks/useConversation.hook";
import { useUsers } from "../hooks/useUsers.hook";

function CreateConversation() {
  const [usernames, setUsernames] = useState<string>("");
  const { createConversation, refetch } = useConversation();
  const { users } = useUsers();

  const [availableUsernames, setAvailableUsernames] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (users) {
      const initialUsernames = users.map((user: { username: string }) => ({
        value: user.username,
        label: user.username,
      }));
      setAvailableUsernames(initialUsernames);
    }
  }, [users]);

  useEffect(() => {
    const mentionedUsernames = usernames
      .split(" ")
      .filter((name) => name.startsWith("@"))
      .map((name) => name.slice(1));

    const newAvailableUsernames = availableUsernames.filter(
      ({ value }) => !mentionedUsernames.includes(value)
    );

    setAvailableUsernames(newAvailableUsernames);
  }, [usernames]);

  const handleFinish = (values: { name: string; usernames: string }) => {
    const mentions = usernames
      .split(" ")
      .filter((mention) => mention.startsWith("@"))
      .map((mention) => mention.slice(1));

    createConversation({
      name: values.name,
      usernames: mentions,
      isGroup: mentions.length > 1,
    });
    refetch();
  };

  return (
    <div>
      <ChatScreenLayout>
        <Form layout="vertical" onFinish={handleFinish}>
          <Typography.Title level={3}>
            Create a new conversation
          </Typography.Title>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your conversation name!",
              },
            ]}
            label="Conversation name"
          >
            <Input placeholder="Enter conversation name" />
          </Form.Item>
          <Form.Item
            name="usernames"
            label="Add members, Type '@' to mention someone"
            rules={[
              {
                required: true,
                message: "Please add members to the conversation!",
              },
            ]}
          >
            <Mentions
              onChange={setUsernames}
              rows={1}
              options={availableUsernames}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create Conversation
          </Button>
        </Form>
      </ChatScreenLayout>
    </div>
  );
}

export default CreateConversation;
