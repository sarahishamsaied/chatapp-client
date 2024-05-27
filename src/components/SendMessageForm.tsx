import { useState, useEffect } from "react";
import { Input, Button, Row, Col, Typography, Upload, Image } from "antd";
import useSocket from "../hooks/useSocket";
import { IoAttachSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { useAppSelector } from "../hooks/redux.hook";

type Props = {
  userId: string;
  conversationId: string;
  onSend?: (message: string) => void;
};

const SendMessageForm = ({ userId, conversationId }: Props) => {
  const [message, setMessage] = useState("");
  const user = useAppSelector((state) => state.auth);
  const [file, setFile] = useState<File | null>(null);
  const [tempFilePreview, setTempFilePreview] = useState<string | null>(null);
  const { sendMessage, status } = useSocket(conversationId);

  useEffect(() => {
    return () => {
      if (tempFilePreview) {
        URL.revokeObjectURL(tempFilePreview);
        setTempFilePreview(null);
      }
    };
  }, [tempFilePreview, file]);

  const handleSend = () => {
    console.log("tempFilePreview", tempFilePreview);
    console.log(file);
    if (message.trim() || file) {
      sendMessage({
        conversationId,
        username: user.username as string,
        senderId: userId,
        messageBody: message,
        messageType: "multimedia",
        file,
        fileExtension: file?.type || "text/plain",
        tempFilePreview,
      });
      setMessage("");
      setFile(null);
      if (tempFilePreview) {
        URL.revokeObjectURL(tempFilePreview);
        setTempFilePreview(null);
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileInputChange = (fileInfo: any) => {
    console.log(fileInfo);
    const { fileList } = fileInfo;
    if (fileList[0].status === "removed") {
      // Handle file removal
      setFile(null);
      setTempFilePreview(null);
      console.log("tempFilePreview", tempFilePreview);
    } else {
      const { originFileObj } = fileList[0];
      setFile(originFileObj);
      const fileUrl = URL.createObjectURL(originFileObj);
      console.log("fileUrl", fileUrl);
      setTempFilePreview(fileUrl);
      console.log("tempFilePreview", tempFilePreview);
    }
    console.log("tempFilePreview", tempFilePreview);
    return false;
  };

  const renderPreview = () => {
    if (!tempFilePreview) return null;
    if (file?.type.startsWith("image/")) {
      return (
        <Image
          src={tempFilePreview}
          alt="file preview"
          style={{ maxWidth: "100%" }}
        />
      );
    } else if (file?.type.endsWith("csv")) {
      return <Typography.Text>CSV File Ready to be Sent</Typography.Text>;
    } else {
      return <Typography.Text>File Ready to be Sent</Typography.Text>;
    }
  };

  return (
    <Row gutter={10}>
      <Col span={24}>
        <Typography.Title level={4}>Send a message</Typography.Title>
      </Col>
      <Col span={21}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {renderPreview()}
      </Col>
      <Col span={3}>
        <Row gutter={8}>
          <Col>
            <Upload
              beforeUpload={() => false}
              showUploadList={false}
              maxCount={1}
              multiple={false}
              onChange={handleFileInputChange}
            >
              <Button icon={<IoAttachSharp size={24} />} />
            </Upload>
          </Col>
          <Col>
            <Button
              loading={status === "uploading"}
              type="primary"
              onClick={handleSend}
              disabled={!message.trim() && !file}
              icon={<IoIosSend size={24} />}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SendMessageForm;
