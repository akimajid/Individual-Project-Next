// import {
//     Stack,
//     Avatar,
//     Box,
//     Center,
//     Image,
//     useColorModeValue,
//     Flex,
//     Heading,
//     Text,
//     Button,
//   } from "@chakra-ui/react";
  
//   const ProfilePage = () => {
//     return (
//       <Center bgGradient="linear(to-r, gray.200, gray.400)" py="28">
//         <Box
//           w={"280px"}
//           bg={useColorModeValue("white", "gray.800")}
//           boxShadow="2xl"
//           rounded="md"
//           overflow="hidden"
//         >
//           <Image
//             h="120px"
//             w="full"
//             src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da3400f2-9687-4649-9348-c280595c520c/d5fsath-330ac945-0b30-40b4-b149-bea203f53501.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhMzQwMGYyLTk2ODctNDY0OS05MzQ4LWMyODA1OTVjNTIwY1wvZDVmc2F0aC0zMzBhYzk0NS0wYjMwLTQwYjQtYjE0OS1iZWEyMDNmNTM1MDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EmwxgX9bmV8QntXIp2pz5enmfmgE0zCbZSDZ7Pwxy7k"
//             objectFit="cover"
//           />
//           <Flex justify="center" mt="-12">
//             <Avatar
//               size="xl"
//               src="https://pbs.twimg.com/profile_images/998482729892069377/Ls1MMr3q_400x400.jpg"
//               alt="author"
//               css={{
//                 border: "2px solid white",
//               }}
//             />
//           </Flex>
  
//           <Box p="6">
//             <Stack spacing="0" align="center" mb="5">
//               <Heading fontSize="2xl" fontWeight="500" fontFamily="body">
//                 Monkey D. Luffy
//               </Heading>
//               <Text color="gray.500">Pirates</Text>
//             </Stack>
  
//             <Stack direction="row" justify="center" spacing="6">
//               <Stack align="center">
//                 <Text fontWeight="600">24k</Text>
//                 <Text fontSize="sm" color="gray.500">
//                   Followers
//                 </Text>
//               </Stack>
//               <Stack align="center">
//                 <Text fontWeight="600">24k</Text>
//                 <Text fontSize="sm" color="gray.500">
//                   Following
//                 </Text>
//               </Stack>
//             </Stack>
  
//             <Button
//               w="full"
//               mt="8"
//               bg={useColorModeValue("#151f21", "gray.900")}
//               color="white"
//               rounded="md"
//               _hover={{
//                 transform: "translateY(-2px)",
//                 boxShadow: "lg",
//               }}
//             >
//               Follow
//             </Button>
//           </Box>
//         </Box>
//       </Center>
//     );
//   };
  
//   export default ProfilePage;
  