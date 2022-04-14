import {
  Box,
  Image,
  Avatar,
  Text,
  Icon,
  Container,
  AspectRatio,
} from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

const ContentCard = (props) => {
  const { username, location, caption, like_count, image_url, id, User } =
    props;

  return (
    <Container
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      maxW="3xl"
      paddingY="4"
      marginY="8"
    >
      <Box paddingX="1" paddingBottom="2" display="flex" alignItems="center">
        <Avatar src="https://bit.ly/dan-abramov" size="md" />
        <Box marginLeft="2">
          <Text fontWeight="bold" fontSize="sm">
            {User?.username}
          </Text>
          <Text fontSize="sm" color="GrayText">
            {location}
          </Text>
        </Box>
      </Box>

      <AspectRatio ratio={4 / 3}>
        <Image padding="1" src={image_url} />
      </AspectRatio>

      <Box paddingX="2">
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
        <Text paddingX="2" fontWeight="bold">
          {like_count?.toLocaleString()} Likes
        </Text>
      </Box>

      <Box paddingX="2">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>
    </Container>
  );
};

export default ContentCard;
