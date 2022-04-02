import { 
    Box,
    Image,
    Avatar,
    Text,
    Icon,
    Container
 } from "@chakra-ui/react"
 import { FaRegHeart, FaRegComment } from "react-icons/fa"

 const ContentCard = (props) => {
    const { username, location, caption, numberOfLikes, imageUrl, id } = props

    return (
        <Container bg="white" borderWidth="1px" borderRadius="lg" maxW="2xl" paddingY="4" marginTop="4" >
            <Box paddingX="1" paddingBottom="2" display="flex" alignItems="center">
                <Avatar src="https://bit.ly/dan-abramov" size="md" />
                <Box marginLeft="2">
                    <Text fontWeight="bold" fontSize="sm">
                        {username}
                    </Text>
                    <Text fontSize="sm" color="GrayText">
                        {location}
                    </Text>
                </Box>
            </Box>

            <Image padding="1" src={imageUrl} />

            <Box paddingX="2">
                <Icon boxSize={6} as={FaRegHeart} />
                <Icon
                marginLeft="4"
                boxSize={6}
                as={FaRegComment}
                sx={{
                    _hover: {
                        cursor: "pointer"
                    }
                }}
                />
            </Box>

            <Box>
                <Text paddingX="2" fontWeight="bold">{numberOfLikes} Likes</Text>
            </Box>

            <Box paddingX="2">
                <Text display="inline" fontWeight="bold" marginRight="2">
                    {username}
                </Text>
                <Text display="inline">
                    {caption}
                </Text>
            </Box>
        </Container>
    )
 }

 export default ContentCard