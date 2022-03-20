import {
    Box,
    Stack,
    Heading,
    Input,
    Text,
    Button,
    Link,
    InputGroup,
    InputRightElement,
    Center
  } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"



const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Center bgGradient="linear(to-r, gray.200, gray.400)" position="flex" >
            <Box width="xl" margin="28" >
            <Stack bg="gray.50" rounded="xl" p={{ base: 4, sm: 6, md: 8 }}>
          <Stack spacing="4" marginBottom={8}>
            <Heading
              color="gray.800"
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              <Text as="span">Sign in to your account </Text>
              <Text
                as="span"
                bgGradient="linear(to-r, green.400, blue.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color="gray.500" fontSize={{ base: "sm", sm: "md" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, sequi in? Autem, adipisci eos perferendis
              accusantium odit cumque. Autem culpa molestias reiciendis id odit
              quia.
            </Text>
          </Stack>
          <Box as="form" mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="User Name"
                bg="gray.100"
                border={0}
                color="black"
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <InputGroup> 
              <Input
                placeholder="Password"
                bg="gray.100"
                type={showPassword ? "text" : "password"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <InputRightElement h="full">
                <Button
                variant="ghost"
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                > {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
              </InputGroup>
              <Text as="span" textAlign="center">
                <Text as="span">Don't have an account ? {" "}</Text>
                <Link
                href="/"
                 color="blue.300"
                >
                  Sign Up here
                </Link>
              </Text>
              <Button
                fontFamily="heading"
                bg="gray.200"
                color="white"
                bgGradient="linear(to-r, green.400, blue.400)"
                _hover={{
                  bgGradient: "linear(to-r, green.400, blue.400)",
                  boxShadow: "md",
                  color: "black",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>
        </Stack>
            </Box>
        </Center>
    )
}

export default Login