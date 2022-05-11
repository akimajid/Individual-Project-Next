import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Image,
  Avatar,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  AspectRatio,
  HStack,
  useToast,
  FormControl,
  FormHelperText,
  Input,
  Button,
  IconButton
} from "@chakra-ui/react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import api from "../../lib/api";
import axios from "axios";
import Page from "../../component/Page";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { BiLink } from "react-icons/bi";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Navbar from "../../component/Navbar";

const PostPageDetails = ({ post, Comments }) => {
  const authSelector = useSelector((state) => state.auth);

  const [comments, setComments] = useState([]);
  const [viewComment, setViewComment] = useState(false);
  const [page, setPage] = useState(1);
  const [postLikes, setPostLikes] = useState({});
  const [likePost, setLikePost] = useState(false);

  const maxComments = 5;

  const toast = useToast();

  const router = useRouter();

  const refreshPage = () => {
    window.location.reload();
  };

  const deleteButton = async () => {
    try {
      await api.delete("/posts/" + post?.id);

      router.push("/posts");
    } catch (error) {
      console.log(error);
      toast({
        title: "Can't Reach The Server",
        description: "Connect The Server",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        await api.post("/comments/post/" + post?.id, {
          post_id: post?.id,
          user_id: authSelector.id,
          content: values.content,
        });

        formik.setFieldValue("content", "");
        // fetchComments();
        renderComment();
        setViewComment(false);
        refreshPage();
      } catch (error) {
        toast({
          title: "Can't Add a Comment",
          description: "Connect The Server",
          status: "error",
          duration: 2000,

          position: "top",
        });
      }
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().max(300, "You've reached Max Character"),
    }),
  });

  const fetchComments = async () => {
    try {
      const res = await api.get("/posts/" + post?.id, {
        params: {
          _page: page,
          _limit: maxComments,
        },
      });

      setComments((prevComments) => [
        ...prevComments,
        ...res?.data?.result?.Comments,
      ]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Can't Reach The Comment Server",
        description: "Connect The Server",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const fetchLike = async () => {
    try {
      const res = await api.get("/posts/postlike/" + post?.id);

      const res2 = await api.get("/posts/" + post?.id, {
        params: {
          _page: page,
          _limit: maxComments,
        },
      });

      setPostLikes(res2?.data?.result?.post?.like_count);

      if (!res?.data?.result) {
        return setLikePost(false);
      } else if (res?.data?.result) {
        return setLikePost(true);
      }
    } catch (error) {
      toast({
        title: "Can't Reach Like Server",
        description: "Connect The Server",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const likeButton = async () => {
    try {
      await api.post("/posts/postlike/" + post?.id);

      setLikePost(true);
      fetchLike();
      router.push(`/posts/` + post?.id);
    } catch (error) {
      toast({
        title: "Can't Reach Like Server",
        description: "Connect The Server",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const unlikeButton = async () => {
    try {
      await api.delete("/posts/postlike/" + post?.id);

      setLikePost(false);
      fetchLike();
      router.push(`/posts/` + post?.id);
    } catch (error) {
      toast({
        title: "Can't Reach Like Server",
        description: "Connect The Server",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const nextComment = () => {
    setPage(page + 1);
  };

  const hideCommentBtn = () => {
    setViewComment(!viewComment);
  };

  const renderComment = () => {
    return comments.map((val) => {
      return (
        <Box display="flex" marginLeft="2" marginRight="2" marginTop="2">
          <Text lineHeight="4">
            <b>{val?.User?.username} </b>
            {val?.content}{" "}
            <span
              style={{
                fontSize: "small",
                color: "gray",
                fontWeight: "lighter",
              }}
            >
              {`(${moment(val?.createdAt).format("MMMM, DD")})`}
            </span>
          </Text>
        </Box>
      );
    });
  };

  const webUrl = `https://localhost:3000`;

  const copyLink = () => {
    navigator.clipboard.writeText(`${webUrl}${router.asPath}`);

    toast({
      position: "top-left",
      status: "success",
      title: "Link copied",
    });
  };

  useEffect(() => {
    fetchComments();

    return fetchLike();
  }, [page]);

  return (
    <>
      <Navbar />
      <Page
        title={`${post?.User?.username} post`}
        description={post.caption}
        image={post.image_url}
        url={`${webUrl}${router.asPath}`}
      >
        <Center bgGradient="linear(to-r, gray.200, gray.400)">
          <Container
            bgColor="white"
            mb="14"
            maxW="5xl"
            shadow="dark-lg"
            mt="16"
          >
            <Flex>
              <Box my="5" flex="65">
                <Stack>
                  <AspectRatio ratio={4 / 3}>
                    <Image width="100%" src={post?.image_url} />
                  </AspectRatio>
                </Stack>
              </Box>

              <Divider mx="1" borderColor="red" orientation="vertical" />

              <Box my="5" flex="35">
                <Box mx="3" mt="2">
                  <Box display="flex" flexDirection="column">
                    <Box
                      justifyContent="space-between"
                      mb="3"
                      display="flex"
                      alignItems="center"
                    >
                      <HStack>
                        <Avatar src={post?.User?.profile_picture} />

                        <Box ml="2">
                          <Text className="username" fontWeight="bold">
                            {post?.User?.username}
                          </Text>
                          <Text color="gray">{post?.location}</Text>
                        </Box>
                      </HStack>

                      <Box>
                        {post?.user_id == authSelector.id ? (
                          <Menu>
                            <MenuButton>
                              <Icon
                                as={HiOutlineMenuAlt4}
                                ml="4"
                                boxSize="6"
                                sx={{
                                  _hover: {
                                    cursor: "pointer",
                                  },
                                }}
                              ></Icon>
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() =>
                                  router.push(`/edit-post/${post?.id}`)
                                }
                              >
                                Edit post
                              </MenuItem>
                              <MenuItem onClick={deleteButton}>
                                Delete post
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        ) : null}
                      </Box>
                    </Box>

                    <Box>
                      {likePost ? (
                        <Icon
                          boxSize="6"
                          onClick={unlikeButton}
                          marginRight="4"
                          color="red"
                          as={FaHeart}
                          sx={{
                            _hover: {
                              cursor: "pointer",
                              color: "red",
                            },
                          }}
                        ></Icon>
                      ) : (
                        <Icon
                          boxSize="6"
                          onClick={likeButton}
                          marginRight="4"
                          as={FaRegHeart}
                          sx={{
                            _hover: {
                              cursor: "pointer",
                              color: "red",
                            },
                          }}
                        ></Icon>
                      )}

                      <Icon
                        onClick={hideCommentBtn}
                        boxSize="6"
                        mr="4"
                        as={FaRegComment}
                        sx={{
                          _hover: {
                            cursor: "pointer",
                            color: "blue",
                          },
                        }}
                      ></Icon>
                    </Box>

                    <Text pt="1" fontSize="sm" fontWeight="bold">
                      {postLikes?.toLocaleString() ||
                        post?.like_count?.toLocaleString()}{" "}
                      likes
                    </Text>
                  </Box>
                </Box>

                <Box paddingTop="1" ml="2">
                  <Text
                    paddingLeft="1"
                    display="inline"
                    fontWeight="bold"
                    marginRight="2"
                  >
                    {post?.User?.username}
                  </Text>
                  <Text display="inline">{post?.caption}</Text>

                  <Text
                    textAlign="right"
                    mt="2"
                    fontSize="smaller"
                    color="gray"
                    fontWeight="hairline"
                  >
                    {`${moment(post?.createdAt).format("DD-MMMM-YYYY")}`}
                  </Text>
                </Box>

                <Divider ml="2" />

                <Flex ml="3" mt="1">
                  <WhatsappShareButton
                    url={`${webUrl}${router.asPath}`}
                    title={`${post?.User?.username}'s Post`}
                  >
                    <WhatsappIcon size="40" round />
                  </WhatsappShareButton>
                  <TwitterShareButton
                    url={`${webUrl}${router.asPath}`}
                    title={`${post?.User?.username}'s Post`}
                  >
                    <TwitterIcon size="40" round />
                  </TwitterShareButton>
                  <FacebookShareButton
                    url={`${webUrl}${router.asPath}`}
                    quote={`${post?.User?.username}'s Post`}
                  >
                    <FacebookIcon size="40" round />
                  </FacebookShareButton>
                  <IconButton
                    onClick={copyLink}
                    borderRadius="50%"
                    icon={<Icon as={BiLink} />}
                  />
                </Flex>

                <Text>{renderComment()}</Text>

                <Text
                  onClick={nextComment}
                  marginTop="1"
                  mt="1"
                  textAlign="center"
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  View mores...
                </Text>

                {viewComment ? (
                  <FormControl
                    position="fixed"
                    bottom="36"
                    width="80"
                    mt="3"
                    ml="2"
                    isInvalid={formik.errors.content}
                  >
                    <FormHelperText>{formik.errors.content}</FormHelperText>
                    <Flex>
                      <Input
                        mr="2"
                        width="80"
                        onChange={(event) =>
                          formik.setFieldValue("content", event.target.value)
                        }
                        value={formik.values.content}
                        placeholder={"Add a comment ..."}
                      />
                      <Button onClick={formik.handleSubmit} colorScheme="green">
                        Send
                      </Button>
                    </Flex>
                  </FormControl>
                ) : null}
              </Box>
            </Flex>
          </Container>
        </Center>
      </Page>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { auth_token } = context.req.cookies;
  const limitComment = 5;

  const res = await axios.get(`http://localhost:2020/posts/${id}`, {
    headers: {
      Authorization: auth_token,
    },
    params: {
      _page: 1,
      _limit: limitComment,
    },
  });

  return {
    props: {
      post: res?.data?.result,
    },
  };
}

export default PostPageDetails;
