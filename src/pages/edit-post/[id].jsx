import {
  Box,
  Avatar,
  Text,
  Image,
  useToast,
  Flex,
  AspectRatio,
  Input,
  Container,
  FormLabel,
  Button,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../lib/api";
import axios from "axios";
import moment from "moment";
import { useFormik } from "formik";
import Navbar from "../../component/Navbar";

const EditPostPage = ({ photosDetail }) => {
  const toast = useToast();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      caption: `${photosDetail?.caption}`,
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await api.patch("/posts/" + photosDetail.id, {
          caption: values.caption,
        });

        formik.setFieldValue("caption", "");
        formik.setFieldValue("location", "");
      } catch (error) {
        toast({
          title: "Can't Reach The Server",
          description: "Connect The Server",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  return (
    <>
      <Navbar />
      <Center bgGradient="linear(to-r, gray.200, gray.400)">
        <Container bg="white" m="16" maxW="5xl" shadow="lg">
          <Flex>
            <Box my="5" flex={65}>
              <AspectRatio ratio={4 / 3}>
                <Image width="100%" src={photosDetail?.image_url} />
              </AspectRatio>
            </Box>

            <Box my="5" flex={35}>
              <Flex px="5" marginTop="2">
                <Box display="flex" flexDirection="column">
                  <Box mb="3" paddingX="2" display="flex" alignItems="center">
                    <Avatar src={photosDetail?.User?.profile_picture} />
                    <Box marginLeft="2">
                      <Text className="username" fontWeight="bold">
                        {photosDetail?.User?.username}
                      </Text>
                    </Box>
                  </Box>
                  <Box width="xs">
                    <FormLabel>Location:</FormLabel>
                    <Text textAlign="end">{photosDetail?.location}</Text>

                    <FormLabel>Number of Likes:</FormLabel>
                    <Text textAlign="end">
                      {photosDetail?.like_count?.toLocaleString()}
                    </Text>

                    <FormLabel>Created At:</FormLabel>
                    <Text
                      textAlign="end"
                      color="gray.400"
                      fontWeight="hairline"
                      ml={"5"}
                    >
                      {moment(photosDetail?.createdAt).format("DD-MMMM-YYYY")}
                    </Text>

                    <FormLabel>Caption: </FormLabel>
                    <Input
                      textAlign="end"
                      width="100%"
                      placeholder="Caption..."
                      onChange={(event) =>
                        formik.setFieldValue("caption", event.target.value)
                      }
                      value={formik.values.caption}
                    />
                  </Box>
                  <Box mt="3" align="end">
                    <Button
                      onClick={formik.handleSubmit}
                      mr="3"
                      width="fit-content"
                      color="white"
                      bgGradient="linear(to-r, green.400, blue.400)"
                      _hover={{
                        bgGradient: "linear(to-r, green.300, blue.300)",
                      }}
                    >
                      Save
                    </Button>

                    <Link href={"/posts"}>
                      <Button colorScheme="blue" width="fit-content">
                        Home
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:2020/posts/${id}`);

  return {
    props: {
      photosDetail: res?.data?.result,
    },
  };
}

export default EditPostPage;
