import React, { useEffect } from "react";

import { Button, Layout, Menu, Space, Typography, theme } from "antd";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useConversation } from "../hooks/useConversation.hook";
import { Message } from "../types/Message";
const { Header, Content, Sider } = Layout;

interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  admin: string;
  isGroup: boolean;
}

const ChatScreenLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const content = React.createRef<HTMLDivElement>();
  const { conversations } = useConversation();
  const [collapsed, setCollapsed] = React.useState(false);
  useEffect(() => {
    content.current?.scrollTo(0, content.current?.scrollHeight);
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG, colorWhite },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout className="h-screen overflow-hidden">
      <Sider
        width={
          collapsed
            ? "0px"
            : window.innerWidth > 1024
            ? "256px"
            : window.innerWidth > 768
            ? "200px"
            : "150px"
        }
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Space align="center" className="flex justify-start items-center pl-4">
          <IoChatbubbleEllipsesSharp className="text-purple-500" size={25} />
          <Typography.Title
            level={4}
            style={{ color: colorWhite, marginTop: "6px" }}
          >
            ChatApp
          </Typography.Title>
        </Space>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={conversations?.map((conversation: Conversation) => ({
            key: conversation.id,
            label: conversation.name,
            to: `/conversation/${conversation.id}`,
          }))}
          onClick={(e) => {
            navigate(`/conversation/${e.key}`);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 24,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              navigate("/conversation/create");
            }}
          >
            + Conversation
          </Button>
        </Header>
        <Content ref={content} style={{ flex: 1, overflowY: "auto" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatScreenLayout;
