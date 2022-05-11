import { Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import api from "../../lib/api";
import { useRouter } from "next/router";
import * as Yup from "yup";

const forgotPasswordPage = () => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("This field is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      setTimeout(async () => {
        try {
          const res = await api.patch(`/auth/change-password-forgot/${token}`, formik.values);

          console.log(formik.values);

          toast({
            title: "Reset Password",
            description: res.data.message,
            status: "success",
            isClosable: true,
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

  const router = useRouter();

  const { token } = router.query;
  console.log(token);

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Center bgGradient="linear(to-r, gray.200, gray.400)">
    <Flex justify="center" m="56">
      <Box w="sm" shadow="2xl" p="8" borderRadius={10} bgColor="white">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Reset password
        </Text>
        <Text textAlign="center">Enter your new password</Text>
        <form>
          <FormControl mt="2" isInvalid={formik.errors.password}>
            <FormLabel htmlFor="inputPassword">Password</FormLabel>
            <Input onChange={inputHandler} id="inputPassword" name="password" bgColor="white" />
            <FormHelperText>{formik.errors.password}</FormHelperText>
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
              //
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

export default forgotPasswordPage;