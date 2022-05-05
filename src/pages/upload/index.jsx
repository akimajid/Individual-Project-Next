import { Center } from "@chakra-ui/react"
import PostUploader from "../../component/PostUploader"


const UploadPage = () => {
    return (
        <Center bgGradient="linear(to-r, gray.200, gray.400)">
            <PostUploader />
        </Center>
    )
}

export default UploadPage