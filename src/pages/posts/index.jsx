import { Box, Center, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ContentCard from "../../component/ContentCard"
import { axiosInstance } from "../../configs/api"

const postData = {
    userId: 1,
    location: "BSD",
    imageUrl: "http://placeimg.com/640/480",
    numberOfLikes: 12345,
    caption: "Balanced bottom-line adapter",
    id: 1,
    username: "Seto"
}

const PostsPage = () => {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        try {
            const res = await axiosInstance.get("/posts")

            setPosts(res.data.result)
        } catch (err) {
            console.log(err?.data?.message || err.message)
        }
    }


    useEffect(() => {
        fetchPosts()
    }, [])

    return(
        <Box bgGradient="linear(to-r, gray.200, gray.400)" spacing="4">
            <Center>
                <Stack spacing={4}>
                    <ContentCard {...postData} />
                    <ContentCard {...postData} />
                    <ContentCard {...postData} />
                </Stack>
            </Center>
        </Box>
    )

}

export default PostsPage