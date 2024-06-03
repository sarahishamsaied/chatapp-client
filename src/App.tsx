import { useState } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";

import { light } from "./theme/light";
import { dark } from "./theme/dark";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

function App() {
  // eslint-disable-next-line
  const [currentTheme] = useState("light");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: currentTheme === "light" ? light : dark,
          }}
        >
          <AnimatedRoutes />
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
