import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ContentCard from "../../component/ContentCard";
import api from "../../lib/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../../component/Navbar"

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const toast = useToast();

  const maxPostsPage = 5;

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts", {
        params: {
          _limit: maxPostsPage,
          _page: page,
        },
      });

      setPosts((prevPosts) => [...prevPosts, ...res.data.result.rows]);
    } catch (err) {
      console.log(err?.data?.message || err.message);
      toast({
        title: "Can't Reach The Server",
        description: "Connect The Server",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <>
    <Navbar />
    <Box bgGradient="linear(to-r, gray.200, gray.400)" spacing="4">
      <Center>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchNextPage}
          hasMore={true}
          loader={<Spinner alignContent="center" />}
        >
          {posts.map((postData) => {
            return <ContentCard {...postData} />;
          })}
        </InfiniteScroll>
      </Center>
    </Box>
    </>
  );
};

export default PostsPage;
