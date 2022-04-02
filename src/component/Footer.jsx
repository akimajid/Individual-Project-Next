import {
    Box,
    Center,
    Flex,
    Icon,
    Link,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { SiConfluence } from "react-icons/si";
  import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
  
  const Footer = () => {
    return (
      <>
        <Center paddingY="1.5" bgColor="gray.200" justifyContent="space-between">
          <Flex marginLeft="2">
            <Icon boxSize="6" as={SiConfluence} />
            <Text fontSize="large" fontWeight="bold" marginX="2">
              logoipsum
            </Text>
          </Flex>
          <Text color="gray.500">
            2022. Lorem ipsum dolor sit amet consectetur.
          </Text>
          <Box marginTop="4">
            <Stack direction="row" spacing="6">
              <Link href="https://www.instagram.com/">
              <Icon boxSize="8">
                <FaInstagram />
              </Icon>
              </Link>
              <Link href="https://twitter.com/">
              <Icon boxSize="8">
                <FaTwitter />
              </Icon>
              </Link>
              <Link href="https://www.youtube.com/">
              <Icon boxSize="8">
                <FaYoutube />
              </Icon>
              </Link>
            </Stack>
          </Box>
        </Center>
      </>
    );
  };
  
  export default Footer;
  