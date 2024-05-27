import { Row, Col, Form, Input, Button, Typography } from "antd";
import { useAuth } from "../hooks/useAuth.hook";
import { Link } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import { motion, AnimatePresence } from "framer-motion";

function SignIn() {
  const { login, isLoginLoading } = useAuth();
  const handleFinish = (values: { email: string; password: string }) => {
    console.log(values);
    login({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <AnimatePresence>
      <motion.div
        key={"signup"}
        initial={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100, display: "none" }}
        transition={{ duration: 0.5 }}
      >
        <HomeLayout>
          <Row justify="center" className="w-full ">
            <Col span={24}>
              <Typography.Title level={2}>Sign In</Typography.Title>
            </Col>
            <Col span={24}>
              <Form layout="vertical" onFinish={handleFinish}>
                <Form.Item
                  label="Email or username"
                  name={"email"}
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input placeholder="Enter your Email" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoginLoading}
                  >
                    Sign In
                  </Button>
                </Form.Item>
                <Link to="/signup">Don't have an account? Sign up</Link>
              </Form>
            </Col>
          </Row>
        </HomeLayout>
      </motion.div>
    </AnimatePresence>
  );
}

export default SignIn;
