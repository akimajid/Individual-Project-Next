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
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useSelector } from "react-redux";
import api from "../lib/api";
import moment from "moment"

const ContentCard = ({
  location,
  caption,
  like_count,
  image_url,
  User,
  createdAt,
  Comments,
  id: postId
}) => {

  const renderComment = () => {
    return Comments.map((val) => {
      return (
        <Box display="flex" marginLeft="1" marginRight="2" marginTop="1">
          <Text lineHeight="4">
            <b>{val?.User?.username} </b>
            {val?.content} {" "}
            <span style={{ fontSize:"small", color: "gray", fontWeight: "lighter" }}>
               {`(${moment(val?.createdAt).format("MMMM, DD")})`}
            </span>
          </Text>
        </Box>
      );
    })
  }

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
          <Avatar src={User?.profile_picture} size="md" />

          <Box marginLeft="2">
            <Text fontWeight="bold" fontSize="sm">
              {User?.username}
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
              <MenuItem>
                <Link href={`/posts/${postId}`}>View details...</Link>
              </MenuItem>
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
        <Text
          paddingLeft="1"
          display="inline"
          fontWeight="bold"
          marginRight="2"
        >
          {User?.username}
        </Text>
        <Text display="inline">{caption}</Text>
      </Box>

      <Box>
        {renderComment()}
      </Box>

      <Box paddingLeft="1">
        <Text mt="1" fontSize="smaller" color="gray">
          {`${moment(createdAt).format("DD--MMMM-YYYY")}`}
        </Text>
      </Box>
    </Container>
  );
};

export default ContentCard;
