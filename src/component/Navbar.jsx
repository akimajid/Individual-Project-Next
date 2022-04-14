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
  Text
} from "@chakra-ui/react";
import { SiConfluence } from "react-icons/si";
import { useSelector } from "react-redux";

const NavBarItem = () => {
  const authSelector = useSelector((state) => state.auth)

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
          <Box
            color="black"
            as={Button}
            variant="flex"
            cursor="pointer"
            minW={0}
            fontWeight="900px"
            _hover={{
              background: "gray.300",
            }}
          >
            Explore
          </Box>
          <Box
            color="black"
            as={Button}
            variant="flex"
            cursor="pointer"
            minW={0}
            fontWeight="900px"
            _hover={{
              background: "gray.300",
            }}
          >
            Menu3
          </Box>
        </HStack>
        <Flex alignItems="center">
          <Text>{authSelector.username}</Text>
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
              <MenuItem>Link 2</MenuItem>
              <MenuItem>Link 3</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBarItem;
