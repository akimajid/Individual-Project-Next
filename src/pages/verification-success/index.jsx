import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const VerificationPage = () => {
  const router = useRouter();

  return (
    <Center bgGradient="linear(to-r, gray.200, gray.400)">
      <Box m="64" w="sm" shadow="2xl" p="8" borderRadius={10} bgColor="white">
        <Stack>
          <Text textAlign="center" mb="5">
            Congratulation, your account has been verified 🎉
          </Text>
          <Button
            onClick={() => router.push("/auth/login")}
            colorScheme="green"
          >
            <Text>Go to Login Page</Text>
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default VerificationPage;
