import { 
    Avatar,
    Box,
    Text,
 } from "@chakra-ui/react"

const ProfileCard = ( full_name, profile_picture, bio,  username, email ) => {
    return (
        <>
            <Avatar src={profile_picture} size="xl" />
            <Text fontSize="sm" color="gray.500">
                {username}
            </Text>

            <Box>
                <Text>{full_name}</Text>
                <Text>{email}</Text>
                <Text>{bio}</Text>
            </Box>
        </>
        
    )
}

export default ProfileCard