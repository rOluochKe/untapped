import { ChakraProvider, extendTheme, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

// Create a custom hook to handle the color mode state globally
const useAppColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return { colorMode, toggleColorMode };
};

const theme = extendTheme({
  config: {
    initialColorMode: "light", // or "dark"
    useSystemColorMode: false,
  },
});

interface ChakraUIProviderProps {
  children: ReactNode;
}

const ChakraUIProvider = ({ children }: ChakraUIProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export { ChakraUIProvider, useAppColorMode };
