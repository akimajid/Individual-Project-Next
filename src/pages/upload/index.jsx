import { Center } from "@chakra-ui/react";
import PostUploader from "../../component/PostUploader";
import Navbar from "../../component/Navbar";

const UploadPage = () => {
  return (
    <>
      <Navbar />
      <Center bgGradient="linear(to-r, gray.200, gray.400)">
        <PostUploader />
      </Center>
    </>
  );
};

export default UploadPage;
