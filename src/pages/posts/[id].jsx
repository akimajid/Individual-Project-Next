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
  AspectRatio
} from "@chakra-ui/react";
import api from "../../lib/api"
import ContentCard from "../../component/ContentCard";
import axios from "axios";
import Page from "../../component/Page";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt4 } from "react-icons/hi"

const PostsPage = ({ post, commentList }) => {
  const authSelector = useSelector((state) => state.auth)

  const deleteButton = async () => {
    try {
      await api.delete("/posts/" + post?.id)
    } catch (err) {
      console.log(err)
    }
  }

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
            <Flex mx="3" mt="2">
              <Box display="flex" flexDirection="column">
                <Box mb="3" px="2" display="flex" alignItems="center">
                  <Link href={`/profile/${post?.User?.id}`}>
                    <Avatar src={post?.User?.Profile_picture} />
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
                </Box>

                <Flex>
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
                      color: "blue"
                    }
                  }}></Icon>

                  <Text color="gray" fontWeight="hairline" ml="5">
                    {post?.createdAt}  
                  </Text>

                  {post?.user_id == authSelector.id ? (
                    <Menu>
                    <MenuButton>
                      <Icon
                      as={HiOutlineMenuAlt4}
                      ml="4"
                      boxSize="6"
                      sx={{
                        _hover: {
                          cursor: "pointer"
                        }
                      }}></Icon>
                    </MenuButton>
                    <MenuList>
                      <Link href={`/edit-post/${post?.id}`}>
                        <MenuItem>Edit post</MenuItem>
                      </Link>
                      <MenuItem>Delete post</MenuItem>
                    </MenuList>
                  </Menu> 
                  ) : null}
                </Flex>

                <Text fontSize="sm" fontWeight="bold">
                  {post?.like_count?.toLocaleString()} Likes
                </Text>
              </Box>
            </Flex>

            <Divider ml="2" />

            Test

            <Text mt="1" textAlign="center">
              View mores...
            </Text>
          </Box>
        </Flex>
      </Container>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { postId } = context.params;
  
  const res = await axios.get(`http://localhost:2020/posts/${postId}`)

  return {
    props: {
      post: res?.data?.result?.post
    }
  }
}

export default PostsPage;
