import { Spinner, Center } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center height="100vh">
      <Spinner size="xl" />
    </Center>
  );
};

export default Loader;
