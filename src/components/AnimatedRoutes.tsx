import { motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";

import ChatScreen from "../screens/ChatScreen";
import CreateConversation from "../screens/CreateConversation";
import AuthGuard from "./AuthGuard";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

export function AnimatedRoutes() {
  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SignIn />
          </motion.div>
        }
      />
      <Route
        path="/signup"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SignUp />
          </motion.div>
        }
      />
      <Route
        path="/conversation/:id"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthGuard>
              <ChatScreen />
            </AuthGuard>
          </motion.div>
        }
      />
      <Route
        path="/conversation/create"
        element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthGuard>
              <CreateConversation />
            </AuthGuard>
          </motion.div>
        }
      />
    </Routes>
  );
}
