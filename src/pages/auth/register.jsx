import {
    Box,
    Container,
    SimpleGrid,
  } from "@chakra-ui/react";
  import {} from "react-icons";
  import LeftSectionRegister from "../../component/LeftSectionRegister"
  import RightSectionRegister from "../../component/RightSectionRegister"
  
  const Register = () => {
    return (
      <Box bgGradient="linear(to-r, gray.200, gray.400)" position="flex">
        <Container
          height="full"
          as={SimpleGrid}
          maxW="7xl"
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, md: 20 }}
        >
          <LeftSectionRegister />
          <RightSectionRegister />
        </Container>
      </Box>
    );
  };
  
  export default Register;
  