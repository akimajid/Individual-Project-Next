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
  Center,
  useToast,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import api from "../../lib/api";
import jsCookie from "js-cookie";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await api.get("/users", {
          params: {
            username: values.username,
          },
        });

        if (!res.data.length) {
          throw new Error("user not found");
        }

        if (res.data[0].password !== values.password) {
          throw new Error("Wrong password!");
        }

        const userData = res.data[0];
        const stringifieldUsedData = JSON.stringify(userData);

        jsCookie.set("user_data", stringifieldUsedData);

        router.push("/");
      } catch (err) {
        console.log(err);

        toast({
          position: "top",
          status: "error",
          title: "Login failed",
          description: err.message,
          duration: 2000,
        });

        setLoading(false);
      }
    },
  });

  return (
    <Center bgGradient="linear(to-r, gray.200, gray.400)" position="flex">
      <Box width="xl" margin="28">
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
              <FormControl isInvalid={formik.errors.username}>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("username", event.target.value)
                  }
                  placeholder="User Name"
                  bg="gray.100"
                  border={0}
                  color="black"
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <FormHelperText>{formik.errors.username}</FormHelperText>
              </FormControl>
              <FormControl isInvalid={formik.errors.password}>
                <InputGroup>
                  <Input
                    onChange={(event) =>
                      formik.setFieldValue("password", event.target.value)
                    }
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
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {" "}
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>{formik.errors.password}</FormHelperText>
              </FormControl>
              <Text as="span" textAlign="center">
                <Text as="span">Don't have an account ? </Text>
                <Link href="/auth/register" color="blue.300">
                  Sign Up here
                </Link>
              </Text>
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                disabled={loading}
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
  );
};

export default Login;
