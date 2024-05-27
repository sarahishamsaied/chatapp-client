import { useState } from "react";
import { Typography, Image, Button, Modal, Table, Popover } from "antd";
import { useAppSelector } from "../hooks/redux.hook";
import { Message } from "../types/Message";
import { useCsvData } from "../hooks/useCsvData.hook";

const MessageItem = ({ senderId, sender, body, file, createdAt }: Message) => {
  const currentUser = useAppSelector((state) => state.auth.userId);
  const isSender = senderId === currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, columns, loading } = useCsvData(file && file[0]);

  const getFileType = (url: string) => url.split(".").pop();

  const isLink = (string: string) => {
    // Test if http, https, or www is in the string
    const regex = new RegExp(/^(http|https|www\.)/);
    return regex.test(string);
  };

  const formattedLink = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `http://${url}`;
    }
    return url;
  };

  return (
    <div className="w-full">
      <div
        className={`w-full flex ${
          isSender ? "justify-end" : "justify-end flex-row-reverse"
        }`}
      >
        <div
          className={`flex flex-col p-3 rounded-lg ${
            isSender
              ? "bg-blue-100 text-blue-800 items-end rounded-tr-none"
              : "bg-gray-200 items-start flex-row-reverse rounded-tl-none "
          } max-w-1/2 m-2`}
        >
          {!isSender && (
            <Typography.Title level={5}>@{sender?.username}</Typography.Title>
          )}
          {isLink(body) ? (
            <a
              href={formattedLink(body)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {body}
            </a>
          ) : (
            <Typography.Paragraph>{body}</Typography.Paragraph>
          )}
          {file &&
            file[0] &&
            (getFileType(file[0]) !== "csv" ? (
              <Image src={file[0]} />
            ) : (
              <Button
                type="text"
                onClick={() => setIsModalOpen(true)}
                className="text-blue-400"
              >
                Open CSV file &rarr;
              </Button>
            ))}
        </div>
        <Popover content={sender?.username}>
          <div className="bg-violet-500 transition-ease-in p-4 hover:border hover:border-indigo-500 cursor-pointer w-4 h-3 rounded-full flex justify-center items-center text-white">
            {sender?.username?.charAt(0).toUpperCase() || "U"}
          </div>
        </Popover>
      </div>
      <Typography.Paragraph
        type="secondary"
        className={`text-xs ${isSender ? "text-right" : "text-left"}`}
      >
        {createdAt}
      </Typography.Paragraph>
      <Modal
        centered
        width={window.innerWidth - 600}
        title="CSV Preview"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <Table dataSource={data} columns={columns} loading={loading} />
      </Modal>
    </div>
  );
};

export default MessageItem;
