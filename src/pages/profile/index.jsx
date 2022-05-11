import {
  Center,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../lib/api";
import { auth_types } from "../../redux/types";
import jsCookie from "js-cookie";
import Navbar from "../../component/Navbar";
import { FaFileUpload } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Profile = () => {
  const authSelector = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(authSelector.image_url);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState();
  const [editPic, setEditPic] = useState();

  const toast = useToast()

  const refreshPage = () => {
    window.location.reload();
  };

  const formik = useFormik({
    initialValues: {
      id: authSelector.id,
      username: authSelector.username,
      email: authSelector.email,
      full_name: authSelector.full_name,
      bio: authSelector.bio,
      profile_picture: authSelector.profile_picture,
      is_verified: authSelector.is_verified,
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const uploadProfilePicture = async () => {
    const formData = new FormData();

    formData.append("profile_image_file", selectedFile);

    try {
      const res = await api.patch("/users/profile/picture", formData);
      const data = res.data.result;

      console.log(data);
      const updateData = { ...formik.values, ...data };
      console.log(updateData);
      const stringifyData = JSON.stringify(updateData);

      jsCookie.remove("user_data");
      jsCookie.set("user_data", stringifyData);

      const savedUserData = jsCookie.get("user_data");
      if (savedUserData) {
        const parsedUserData = JSON.parse(savedUserData);

        dispatch({
          type: auth_types.LOGIN_USER,
          payload: parsedUserData,
        });
      }

      setEditPic(!editPic);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };
  const editProfile = async () => {
    console.log(authSelector.id);
    try {
      const updateData = {
        username: formik.values.username
          ? formik.values.username
          : authSelector.username,
        id: authSelector.id,
        email: authSelector.email,
        bio: formik.values.bio ? formik.values.bio : authSelector.bio,
        profile_picture: authSelector.profile_picture,
        is_verified: authSelector.is_verified,
        full_name: formik.values.full_name
          ? formik.values.full_name
          : authSelector.full_name,
      };

      const res = await api.patch("/users/profile", updateData);
      const data = res.data.result;

      const stringifyData = JSON.stringify(data);

      jsCookie.remove("user_data");
      jsCookie.set("user_data", stringifyData);

      const savedUserData = jsCookie.get("user_data");
      if (savedUserData) {
        const parsedUserData = JSON.parse(savedUserData);

        dispatch({
          type: auth_types.LOGIN_USER,
          payload: parsedUserData,
        });
      }

      setEdit(!edit);
    } catch (err) {
      console.log(err);
    }
  };

  const resendVerifiedEmail = async () => {
    try {
      await api.post("/auth/resend-verification");
      toast({
        position: "top-right",
        status: "success",
        description: "Resend verification success",
        title: "Verification"
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <Center bgGradient="linear(to-r, gray.200, gray.400)">
        <Flex justify="center" m="20">
          <Stack
            bgColor="white"
            boxSize="sm"
            height="100%"
            borderRadius={10}
            shadow="dark-lg"
          >
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
              <Flex hidden={authSelector.is_verified} justify={"center"}>
                <Button
                  m="4"
                  size="xs"
                  colorScheme="yellow"
                  cursor="pointer"
                  onClick={() => resendVerifiedEmail()}
                >
                  verifiy Account
                </Button>
              </Flex>
            </Flex>
            <Flex mt="5" justify="center">
              <Avatar size="xl" src={authSelector.profile_picture}></Avatar>
            </Flex>
            {editPic ? (
              <>
                <Flex mt={5} justify={"center"}>
                  <Input
                    accept="image/png, image/jpeg"
                    display="none"
                    type="file"
                    id="image_url"
                    name="image_url"
                    onChange={handleFile}
                    ref={inputFileRef}
                  />
                  <Button
                    size="xs"
                    onClick={() => inputFileRef.current.click()}
                    bgGradient="linear(to-r, green.400, blue.400)"
                    _hover={{
                      bgGradient: "linear(to-r, green.300, blue.300)",
                    }}
                  >
                    choose File
                  </Button>
                </Flex>
                <Flex justify={"center"}>
                  <Box>
                    <Icon
                      as={FaFileUpload}
                      boxSize={6}
                      onClick={() => uploadProfilePicture()}
                      _hover={{
                        cursor: "pointer",
                      }}
                      color="blue.500"
                    />
                    <Icon
                      ms="4"
                      as={MdCancel}
                      boxSize={6}
                      onClick={() => setEditPic(!editPic)}
                      _hover={{
                        cursor: "pointer",
                      }}
                      color="red.600"
                    />
                  </Box>
                </Flex>
              </>
            ) : (
              <Flex justify="center">
                <Button
                  size="xs"
                  onClick={() => setEditPic(!editPic)}
                  color="white"
                  bgGradient="linear(to-r, green.400, blue.400)"
                  _hover={{
                    bgGradient: "linear(to-r, green.300, blue.300)",
                  }}
                >
                  Change Picture
                </Button>
              </Flex>
            )}

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
              {edit ? (
                <Button
                  size="xs"
                  mb={3}
                  me={3}
                  onClick={() => setEdit(!edit)}
                  colorScheme="orange"
                >
                  cancel
                </Button>
              ) : (
                <Button
                  size="xs"
                  mb={3}
                  me={3}
                  onClick={() => setEdit(!edit)}
                  color="white"
                  bgGradient="linear(to-r, green.400, blue.400)"
                  _hover={{
                    bgGradient: "linear(to-r, green.300, blue.300)",
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                mb={3}
                me={3}
                size="xs"
                hidden={edit ? false : true}
                onClick={editProfile}
                color="white"
                bgGradient="linear(to-r, green.400, blue.400)"
                _hover={{
                  bgGradient: "linear(to-r, green.300, blue.300)",
                }}
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Center>
    </>
  );
};

export default Profile;
