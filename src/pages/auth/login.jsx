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
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const authSelector = useSelector((state) => state.auth);

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
    onSubmit: (values) => {
      setTimeout(() => {
        dispatch(userLogin(values, formik.setSubmitting));
      }, 2000);
    },
  });

  useEffect(() => {
    if (authSelector.id) {
      router.push("/posts");
    }
  }, [authSelector.id]);

  return (
    <Center bgGradient="linear(to-r, gray.200, gray.400)" position="flex">
      <Box width="md" margin="28">
        <Stack
          spacing="4"
          bg="gray.50"
          rounded="xl"
          p={{ base: 4, sm: 6, md: 8 }}
        >
          <Stack spacing="4" marginBottom={8}>
            <Heading
              color="gray.800"
              lineHeight={1.1}
              fontSize="3xl"
              textAlign="center"
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
            <Text
              textAlign="center"
              color="gray.500"
              fontSize={{ base: "sm", sm: "md" }}
            >
              Sign in to enjoy our full featured content
            </Text>
          </Stack>

          <Box as="form">
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

              <Text textAlign="center">
                <Text as="span">Don't have an account ? </Text>
                <Link  as="span" color="blue.300" onClick={() => router.push("/auth/register")}>
                  Sign Up here
                </Link  > 
              </Text>

              <Link textAlign="center" color="blue.300">
                Forget password?
              </Link>

              <Button
                onClick={formik.handleSubmit}
                type="submit"
                disabled={formik.isSubmitting}
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
