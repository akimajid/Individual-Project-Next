import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { auth_types } from "../../redux/types/";
import Cookies from "js-cookie";
import api from "../../lib/api";

const profilePage = () => {
  const authSelector = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(authSelector.image_url);
  const [edit, setEdit] = useState();

  const formik = useFormik({
    initialValues: {
      username: authSelector.username,
      full_name: authSelector.full_name,
      email: authSelector.email,
      bio: authSelector.bio,
      image_url: authSelector.profile_picture,
      is_verified: false,
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(value, name);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const uploadContentHandler = async () => {
    try {
      const formData = new FormData();
      const { username, email, full_name, bio } = formik.values;
      console.log(formik.values);

      formData.append("username", username || authSelector.username);
      formData.append("full_name", full_name || authSelector.full_name);
      formData.append("bio", bio || authSelector.bio);
      formData.append("email", email || authSelector.email);
      formData.append("profile_image", selectedFile);

      const res = await api.patch("/auth/profile", formData);
      const data = res.data.result;

      console.log(data);
      const stringifyData = JSON.stringify(data);

      Cookies.remove("user_data");
      Cookies.set("user_data", stringifyData);

      setEdit(!edit);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex boxSizing="border-box" justify="center" m="20">
      <Stack borderRadius={10} shadow="dark-lg">
        <Flex justifyContent="space-between">
          <Heading
            ms="3"
            mb="3"
            mt="4"
            fontSize="xl"
            lineHeight="1.1"
            justifyContent="space-between"
          >
            User profile
          </Heading>
          {edit ? (
            <Button
              size="xs"
              mt={3}
              me={2}
              onClick={() => setEdit(!edit)}
              colorScheme="orange"
            >
              cancel
            </Button>
          ) : (
            <Button
              size="xs"
              mt={3}
              me={2}
              onClick={() => setEdit(!edit)}
              colorScheme="messenger"
            >
              edit
            </Button>
          )}
        </Flex>
        <Flex mt="5" justify="center">
          <Avatar size="xl" src={authSelector.profile_picture}></Avatar>
          <Input
            accept="image/png, image/jpeg"
            display="none"
            type="file"
            id="image_url"
            placeholder="Please enter domain"
            name="image_url"
            onChange={handleFile}
            ref={inputFileRef}
          />
        </Flex>
        <Flex mt={5} justify={"center"}>
          <Button
            size="xs"
            hidden={edit ? false : true}
            onClick={() => inputFileRef.current.click()}
            colorScheme="facebook"
          >
            choose File
          </Button>
        </Flex>

        <Box boxSizing="sm" p={4}>
          <Stack>
            <FormControl>
              <FormLabel fontSize="xs">Username</FormLabel>
              <Input
                size="xs"
                fontSize="sm"
                id="username"
                name="username"
                defaultValue={authSelector.username}
                isDisabled={edit ? false : true}
                onChange={inputHandler}
              />

              <FormLabel mt={2} fontSize="xs">
                Full Name
              </FormLabel>
              <Input
                size="xs"
                fontSize="sm"
                defaultValue={authSelector.full_name}
                isDisabled={edit ? false : true}
                id="full_name"
                name="full_name"
                onChange={inputHandler}
              />

              <FormLabel fontSize="xs" mt={2}>
                Email Address
              </FormLabel>
              <Input
                size="xs"
                fontSize="sm"
                defaultValue={authSelector.email}
                isDisabled
              />

              <FormLabel fontSize="xs" mt={2}>
                Bio
              </FormLabel>
              <Textarea
                size="xs"
                fontSize="sm"
                id="bio"
                name="bio"
                defaultValue={authSelector.bio}
                isDisabled={edit ? false : true}
                onChange={inputHandler}
              />
            </FormControl>
          </Stack>
        </Box>

        <Flex justify={"end"}>
          <Button
            mb={3}
            me={3}
            size="sm"
            hidden={edit ? false : true}
            onClick={uploadContentHandler}
            colorScheme="facebook"
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default profilePage;
