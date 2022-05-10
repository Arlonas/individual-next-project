import { Box, Spinner, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Content from "../../components/ContentCard";
import api from "../../lib/api";
import { fetchInitialContent as contentList } from "../../redux/actions/fetchInitialContent";
import { fetchAllContent } from "../../redux/actions/fetchAllContent";
import { fetchNextContent as contentNextList } from "../../redux/actions/fetchNextContent";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  // bikin content dulu aja jadi pas udh login bisa create bisa delete bisa edit
  // create
  // The content should have the following data:
  // 1. Media (image)
  // 2. Caption
  // 3. Created Date
  // 4. Number of likes
  // Edit post caption
  // delete post
  // userprofile
  // comments like
  // <Avatar src={"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} />
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const contentSelector = useSelector((state) => state.content);
  const [page, setPage] = useState(1);
  const [moreContent, setMoreContent] = useState(true);
  const authSelector = useSelector((state) => state.auth);

  const fetchContent = () => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(contentList());
      // console.log(contentList());
      setIsLoading(false);
    }, 2000);
  };
  const fetchNextContent = () => {
    dispatch(contentNextList(page));
  };
  const fetchNextPage = () => {
    setPage(page + 1);
  };
  // console.log(contentSelector.contentList)
  const renderContent = () => {
    return contentSelector?.contentList?.map((val) => {
      // console.log(val.username)
      // console.log(val.image_url)
      return (
        <Content
        key={val.id.toString()}
          username={val?.User?.username}
          location={val?.location}
          imageUrl={val?.image_url}
          likes={val?.like_count}
          caption={val?.caption}
          profilePicture={val?.User?.profile_picture}
          userId={val?.user_id}
          PassingConfirmDeletePost={() => confirmDeletePost(val.id)}
          postId={val?.id}
          createdAt={val?.createdAt}
        />
      );
    });
  };
  // if (contentSelector?.contentList?.length == contentSelector?.contentCount) {
  //   setMoreContent(false);
  // }

  useEffect(() => {
    if (page > 1) {
      fetchNextContent();
    }
  }, [page]);
  useEffect(() => {
    fetchContent();
  }, []);

  const confirmDeletePost = async (id) => {
    if (!authSelector.isVerified) {
      toast({
        status: "error",
        title: "Cannot delete post",
        description:
          "U have not verify your account, Please verify your account to enjoy our web apps features",
        duration: 3000,
      });
      return
    }
    let text = `Are u sure?  You want to delete this post `;
    if (confirm(text)) {
      await api.delete(`/post/${id}`);
      dispatch(fetchAllContent());
    }
  };
  return (
    <Box>
      <InfiniteScroll
        dataLength={contentSelector?.contentList?.length}
        next={fetchNextPage}
        hasMore={true}
        loader={
          <Stack alignItems={"center"}>{isLoading ? <Spinner /> : null}</Stack>
        }
      >
        {renderContent()}
      </InfiniteScroll>
    </Box>
  );
};

export default HomePage;
