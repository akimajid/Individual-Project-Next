import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import jsCookie from "js-cookie";
import { SiConfluence } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { auth_types } from "../redux/types";
import { useRouter } from "next/router";

const NavBarItem = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutBtnHandler = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });

    jsCookie.remove("auth_token");
    router.push("/auth/login");
  };

  return (
    <Box bgColor="gray.200" px={5} position="-webkit-sticky" py="1.5">
      <Flex h={10} alignItems="center" justifyContent="space-between">
        <HStack spacing={0} alignItems="center">
          <Icon marginRight="8" boxSize={5} as={SiConfluence}></Icon>
          <Box
            color="black"
            as={Button}
            variant="string"
            cursor="pointer"
            minW={0}
            fontWeight="900px"
            _hover={{
              background: "gray.300",
            }}
          >
            <Link href="/posts">Home</Link>
          </Box>
        </HStack>
        <Flex alignItems="center">
          <Text>{`Hi, ${authSelector.username}`}</Text>
          <Menu>
            <MenuButton as={Button} variant="flex" cursor="pointer" minW={0}>
              <Avatar
                size="sm"
                src="https://pbs.twimg.com/profile_images/998482729892069377/Ls1MMr3q_400x400.jpg"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="/profile">Profile</Link>
              </MenuItem>
              <MenuItem>Create post</MenuItem>
              <MenuItem onClick={logoutBtnHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBarItem;
