import { Box, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ContentCard from "../../component/ContentCard";
import axiosInstance from "../../lib/api";
import InfiniteScroll from "react-infinite-scroll-component";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const maxPostsPage = 5;

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts", {
        params: {
          _limit: maxPostsPage,
          _page: page,
        },
      });

      setPosts((prevPosts) => [...prevPosts, ...res.data.result.rows]);
    } catch (err) {
      console.log(err?.data?.message || err.message);
    }
  };

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <Box bgGradient="linear(to-r, gray.200, gray.400)" spacing="4">
      <Center>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchNextPage}
          hasMore={true}
          loader={<Spinner alignContent="center" />}
        >
          {posts?.map((postData) => {
            return <ContentCard {...postData} />;
          })}
        </InfiniteScroll>
      </Center>
    </Box>
  );
};

export default PostsPage;
