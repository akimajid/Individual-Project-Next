import { Box, Button, Input, Flex, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../lib/api"

const PostUploader = () => {
  const authSelector = useSelector((state) => state.auth)

  const toast = useToast();

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
          title: "Error"
      })
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
  };

  return (
    <Box p="2" my="4" width="xl" borderRadius="md">
      <Text>Create a post</Text>

      <Input
        onChange={(event) =>
          formik.setFieldValue("caption", event.target.value)
        }
        placeholder="Caption"
      />

      <Input
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
          w="50%"
          mr="1"
          color="blue"
        >
          Upload photo
        </Button>

        <Button onClick={uploadHandler} width="50%" color="blue">
          Post
        </Button>
      </Flex>
    </Box>
  );
};

export default PostUploader;
