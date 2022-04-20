import {
  Box,
  Stack,
  Heading,
  Input,
  Text,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../src/lib/api";
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/auth";

const RightSectionRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      full_name: "",
      repeat_password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      password: Yup.string()
        .required("This field is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      email: Yup.string()
        .required("This field is required")
        .email("invalid email"),
      full_name: Yup.string().required("This field is required"),
      repeat_password: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      if (values.password === values.repeat_password) {
        delete values.repeat_password;

        api.post("/auth/register", values);
        router.push("/auth/login");
      }
    },
  }, 2000);

  return (
    <Stack bg="gray.50" rounded="xl" p={{ base: 4, sm: 6, md: 8 }}>
      <Stack spacing="4" marginBottom={8}>
        <Heading
          textAlign="center"
          color="gray.800"
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          <Text as="span">Sign Up For Free </Text>
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
          Fill all data to enjoy our social media
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

          <FormControl isInvalid={formik.errors.email}>
            <Input
              onChange={(event) =>
                formik.setFieldValue("email", event.target.value)
              }
              placeholder="Email Address"
              bg="gray.100"
              border={0}
              color="black"
              _placeholder={{
                color: "gray.500",
              }}
            />
            <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>

          <FormControl isInvalid={formik.errors.full_name}>
            <Input
              onChange={(event) =>
                formik.setFieldValue("full_name", event.target.value)
              }
              placeholder="Full name"
              bg="gray.100"
              border={0}
              color="black"
              _placeholder={{
                color: "gray.500",
              }}
            />
            <FormHelperText>{formik.errors.full_name}</FormHelperText>
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

          <FormControl isInvalid={formik.errors.repeat_password}>
            <InputGroup>
              <Input
                onChange={(event) =>
                  formik.setFieldValue("repeat_password", event.target.value)
                }
                placeholder="Repeat password"
                bg="gray.100"
                type={showRepeatPassword ? "text" : "password"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <InputRightElement h="full">
                <Button
                  variant="ghost"
                  onClick={() =>
                    setShowRepeatPassword(
                      (showRepeatPassword) => !showRepeatPassword
                    )
                  }
                >
                  {" "}
                  {showRepeatPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>{formik.errors.repeat_password}</FormHelperText>
          </FormControl>

          <Text as="span" textAlign="center">
            <Text as="span">Already have account ? </Text>
            <Link href="/auth/login" color="blue.300">
              login here
            </Link>
          </Text>

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
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default RightSectionRegister;
