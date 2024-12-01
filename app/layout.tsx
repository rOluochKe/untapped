"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react";
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

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ChakraUIProvider>
          <Flex direction="column" height="100vh">
            <Header onToggleSidebar={handleToggleSidebar} />

            <Flex flex="1" overflow="hidden">
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />

              <Flex
                direction="column"
                flex="1"
                ml={"0"}
                transition="margin-left 0.3s ease"
              >
                <Content>{children}</Content>
              </Flex>
            </Flex>

            <Footer />
          </Flex>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
