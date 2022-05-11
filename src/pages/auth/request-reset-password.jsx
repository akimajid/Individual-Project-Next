import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import api from "../../lib/api";
import * as Yup from "yup";
import { useRouter } from "next/router";

const requestResetPassword = () => {
  const toast = useToast();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("This field is required")
        .email("invalid email"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      setTimeout(async () => {
        try {
          await api.post(`/auth/forgot-password-email`, formik.values);

          console.log(formik.values);
          toast({
            title: "Reset Password",
            description: "confirmation has been send to your email",
            status: "success",
            duration: 2000,
          });
          router.push("/auth/login");
        } catch (err) {
          console.log(err);
          toast({
            title: "error",
            description: err.message,
            status: "error",
          });
        }
      }, 3000);
      formik.setSubmitting(false);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Center bgGradient="linear(to-r, gray.200, gray.400)">
      <Flex m="56" justify="center">
        <Box w="sm" shadow="2xl" p="8" borderRadius={10} bgColor="white">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Reset password
          </Text>
          <Text textAlign="center">
            Enter your email to reset your password
          </Text>
          <form>
            <FormControl mt="2" isInvalid={formik.errors.email}>
              <FormLabel htmlFor="inputEmail">Email</FormLabel>
              <Input
                onChange={inputHandler}
                id="inputEmail"
                name="email"
                bgColor="white"
              />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>

            <Flex mt="4" justify="center">
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                disabled={formik.isSubmitting}
                color="white"
                bgGradient="linear(to-r, green.400, blue.400)"
                _hover={{
                  bgGradient: "linear(to-r, green.400, blue.400)",
                  boxShadow: "md",
                  color: "black",
                }}
              >
                Reset password
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Center>
  );
};

export default requestResetPassword;
