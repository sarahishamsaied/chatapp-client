import { Card, Col, Row } from "antd";

import illustration from "../assets/illustration.png";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <Card className="shadow-lg p-3 flex justify-center items-center pt-4">
        <Row wrap={false} align={"middle"}>
          <Col span={10}>
            <img
              src={illustration}
              alt="Illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col span={14}>
            <div className="w-full px-8">{children}</div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default HomeLayout;
