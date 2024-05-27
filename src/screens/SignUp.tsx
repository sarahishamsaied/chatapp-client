import { motion, AnimatePresence } from "framer-motion";
import { Row, Col, Form, Input, Button, Typography } from "antd";
import { useAuth } from "../hooks/useAuth.hook";
import HomeLayout from "../layout/HomeLayout";
import { Link } from "react-router-dom";

function SignUp() {
  const { register, isRegisterLoading } = useAuth();

  const handleFinish = (values: {
    email: string;
    password: string;
    dateOfBirth: string;
  }) => {
    console.log(values);
    register({
      email: values.email,
      password: values.password,
      username: values.email.split("@")[0],
      dateOfBirth: values.dateOfBirth,
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
              <Typography.Title level={2}>Sign Up</Typography.Title>
            </Col>
            <Col span={24}>
              <Form layout="vertical" onFinish={handleFinish}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input placeholder="Enter your Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Date of Birth!",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isRegisterLoading}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                <Link to="/signin">Already have an account? Sign in</Link>
              </Form>
            </Col>
          </Row>
        </HomeLayout>
      </motion.div>
    </AnimatePresence>
  );
}

export default SignUp;
