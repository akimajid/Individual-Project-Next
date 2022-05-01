import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Image,
  Link,
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
  useToast
} from "@chakra-ui/react";
import api from "../../lib/api";
import ContentCard from "../../component/ContentCard";
import axios from "axios";
import Page from "../../component/Page";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react"

const PostPageDetails = ({ post, id: postId }) => {
  const authSelector = useSelector((state) => state.auth);

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1)

  const toast = useToast()

  const deleteButton = async () => {
    try {
      await api.delete("/posts/" + post?.id);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get("/posts/" + postId, {
        params: {
          _page: page,
        },
      });

      console.log(postId);
      console.log(res.data.result);
      setComments((prevComments) => [
        ...prevComments,
        ...res?.data?.result?.comment,
      ]);
    } catch (error) {
      toast({
        title: "Can't Reach The Comment Server",
        description: "Connect The Server",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const renderComment = () => {
    return comments.map((val) => {
      return (
        <Box display="flex" marginLeft="1" marginRight="2" marginTop="1">
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

  const viewCommentButton = () => {
    setPage(page + 1);
  };

  useEffect(() => {
      fetchComments();
  }, [page]);

  return (
    <Page title={`${post?.User?.username} post`}>
      <Container mb="14" maxW="5xl" shadow="dark-lg" mt="16">
        <Flex mb="5">
          <Box my="5" flex="65">
            <Stack>
              <AspectRatio ratio={4 / 3}>
                <Image width="100%" src={post?.image_url} />
              </AspectRatio>
            </Stack>
          </Box>

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
                    <Link href={`/profile/${post?.User?.id}`}>
                      <Avatar src={post?.User?.profile_picture} />
                    </Link>

                    <Box ml="2">
                      <Link
                        href={`/profile/${post?.User?.id}`}
                        textDecoration="none"
                      >
                        <Text className="username" fontWeight="bold">
                          {post?.User?.username}
                        </Text>
                      </Link>
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
                          <Link href={`/edit-post/${post?.id}`}>
                            <MenuItem>Edit post</MenuItem>
                          </Link>
                          <MenuItem>Delete post</MenuItem>
                        </MenuList>
                      </Menu>
                    ) : null}
                  </Box>
                </Box>

                <Box>
                  <Icon
                    boxSize="6"
                    mr="4"
                    as={FaRegHeart}
                    sx={{
                      _hover: {
                        cursor: "pointer",
                        color: "Red",
                      },
                    }}
                  ></Icon>

                  <Icon
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
                  {post?.like_count?.toLocaleString()} Likes
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

            <Text>{renderComment()}</Text>

            <Text onClick={viewCommentButton} mt="1" textAlign="center">
              View mores...
            </Text>
          </Box>
        </Flex>
      </Container>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { auth_token } = context.req.cookies;

  const res = await axios.get(`http://localhost:2020/posts/${id}`, {
    headers: {
      Authorization: auth_token,
    },
  });

  return {
    props: {
      post: res?.data?.result,
    },
  };
}

export default PostPageDetails;
