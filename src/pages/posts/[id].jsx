import { Box, Center } from "@chakra-ui/react";
import ContentCard from "../../component/ContentCard";
import axios from "axios";
import Page from "../../component/Page";

const PostsPage = ({ post, postDetailData, webUrl }) => {
  return (
    <Page
      description={`${
        postDetailData.username
      } said, ${postDetailData?.caption?.slice(0, 15)}`}
      image={postDetailData.image_url}
      title={`${postDetailData.username} | ${postDetailData?.caption?.slice(
        0,
        15
      )}...`}
      url={webUrl}
    >
      <Box>
        <Center>
          <ContentCard
              username={post.User.username}
              profileAva={post.User.image_url}
              location={post.location}
              image={post.image}
              caption={post.caption}
              likes={post.like_count}
              id={post.id}
              comment={post.Comments}
              userId={post.userId}
          />
        </Center>
      </Box>
    </Page>
  );
};

export async function getServerSideProps(context) {
    const { id } = context.params
    const { auth_token } = context.req.cookies

    try {
      const res = await axios.get(`localhost://localhost:2020/posts/${id}`, {
        headers: {
          Authorization: auth_token
        }
      })
      const post = res.data.result

      return { props: { post } }
    } catch (err) {
      return {
        props: {}
      }
    }

}

export default PostsPage
