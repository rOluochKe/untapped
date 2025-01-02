"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Content from "./components/content";
import { ChakraUIProvider } from "./components/ChakraUIProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [queryClient] = useState(() => new QueryClient());

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <ChakraUIProvider>
            <Flex direction="column" height="100vh">
              <Header onToggleSidebar={handleToggleSidebar} />

              <Flex flex="1" overflow="hidden">
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  display="block"
                />

                <Flex
                  direction="column"
                  flex="1"
                  transition="all 0.3s ease"
                  width={isSidebarOpen ? { base: "100%", sm: "70%", md: "70%", lg: "85%", xl: "85%" } : "100%"}
                >
                  <Content>{children}</Content>
                </Flex>
              </Flex>

              <Footer />
            </Flex>
          </ChakraUIProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
