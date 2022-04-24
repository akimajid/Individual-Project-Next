import {
  Box,
  Image,
  Avatar,
  Text,
  Icon,
  Container,
  AspectRatio,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  HStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const ContentCard = (props) => {
  const { location, caption, like_count, image_url, user_post, createdAt } = props;

  return (
    <Container
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      maxW="2xl"
      paddingY="4"
      marginY="8"
      shadow="xl"
    >
      <Box
        justifyContent="space-between"
        paddingX="1"
        paddingBottom="2"
        display="flex"
        alignItems="center"
      >
        <HStack>
          <Avatar src={user_post?.profile_picture} size="md" />

          <Box marginLeft="2">
            <Text fontWeight="bold" fontSize="sm">
              {user_post?.username}
            </Text>

            <Text fontSize="sm" color="GrayText">
              {location}
            </Text>
          </Box>
        </HStack>

        <Box>
          <Menu>
            <MenuButton>
              <Icon
                ml="4"
                boxSize="6"
                as={HiOutlineMenuAlt4}
                sx={{
                  _hover: {
                    cursor: "pointer",
                    color: "blue",
                  },
                }}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit Post</MenuItem>
              <MenuItem>Delete Post</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <AspectRatio ratio={4 / 3}>
        <Image padding="1" src={image_url} />
      </AspectRatio>

      <Box marginTop="2">
        <Icon boxSize={6} as={FaRegHeart} />
        <Icon
          marginLeft="4"
          boxSize={6}
          as={FaRegComment}
          sx={{
            _hover: {
              cursor: "pointer",
            },
          }}
        />
      </Box>

      <Box>
        <Text paddingLeft="1" fontWeight="bold">
          {like_count?.toLocaleString()} Likes
        </Text>
      </Box>

      <Box paddingTop="1">
        <Text paddingLeft="1" display="inline" fontWeight="bold" marginRight="2">
          {user_post?.username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>

      <Box paddingLeft="1">
        <Text fontSize="smaller" color="gray">{createdAt}</Text>
      </Box>
    </Container>
  );
};

export default ContentCard;
