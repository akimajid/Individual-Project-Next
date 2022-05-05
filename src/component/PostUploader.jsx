import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../lib/api";
import { useRouter } from "next/router"

const PostUploader = () => {
  const authSelector = useSelector((state) => state.auth);

  const toast = useToast();
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      caption: "",
      location: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const inputFile = useRef(null);

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    alert(event.target.files[0].name);
  };

  const uploadHandler = async () => {
    if (!selectedFile) {
      toast({
        position: "top",
        status: "error",
        description: "You must choose a image!",
        title: "Error",
      });
      return;
    }

    const formData = new FormData();
    const { caption, location } = formik.values;

    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("user_id", authSelector.id);
    formData.append("post_image_file", selectedFile);

    try {
      await api.post("/posts", formData);
      setSelectedFile(null);
      formik.setFieldValue("caption", "");
      formik.setFieldValue("location", "");
    } catch (err) {
      console.log(err);
    }
    
    router.push("/posts")
  };

  return (
    <Stack fontWeight="bold" boxShadow="xl" m="48" bgColor="white" rounded="xl">
      <Box px="2" my="2" width="xl" borderRadius="md">
        <Text mb="8" textAlign="center" fontSize="3xl">
          Create a post
        </Text>

        <Input
          my="2"
          onChange={(event) =>
            formik.setFieldValue("caption", event.target.value)
          }
          placeholder="Caption"
        />

        <Input
          my="2"
          onChange={(event) =>
            formik.setFieldValue("location", event.target.value)
          }
          placeholder="Location"
        />

        <Flex my="2" justifyContent="space-between">
          <Input
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFile}
            ref={inputFile}
            type="file"
            display="none"
          />

          <Button
            onClick={() => inputFile.current.click()}
            w="45%"
            ml="2"
            colorScheme="facebook"
          >
            Choose photo
          </Button>

          <Button
            mr="2"
            onClick={uploadHandler}
            width="45%"
            color="white"
            bgGradient="linear(to-r, green.400, blue.400)"
            _hover={{
              bgGradient: "linear(to-r, green.300, blue.300)",
            }}
          >
            Post
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
};

export default PostUploader;
