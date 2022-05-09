import { Avatar, Box, Flex, Text, Heading, Container, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "../../lib/hooks/useFetch";
import useFetchUser from "../../lib/hooks/useFetchUser";
import moment from "moment";
import ProfileCard from "../../component/ProfileCard";
import axios from "axios";

const UserDetails = () => {
  const router = useRouter();

  const { id } = router.query;
  const [profile] = useFetchUser(`/users/${id}`);

  const renderProfile = () => {
    return (
      <Box
        w={200}
        padding={3}
        ms="5"
        mt={8}
        shadow="inner"
        bgColor="gray.100"
        borderRadius="4"
      >
        <Flex justify="center">
          <Avatar
            size="xl"
            src={profile.profile_picture}
            border="3px solid teal"
          />
        </Flex>
        <Text
          fontWeight="bold"
          textAlign="center"
        >{`@${profile.username}`}</Text>
        <Text textAlign="center">{profile.full_name}</Text>
        <Text textAlign="center">{profile.bio}</Text>
      </Box>
    );
  };

  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);

  return (
    <Center>
      <Flex justify="space-between">
        <Box>{renderProfile()}</Box>
      </Flex>
    </Center>
  );
};

export default UserDetails;
