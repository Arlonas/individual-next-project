import { Box, Spinner, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Content from "../../components/ContentCard";
import api from "../../lib/api";
import { fetchContent as contentList } from "../../redux/actions/fetchContent";
import { useDispatch, useSelector } from "react-redux";

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

  const fetchContent = () => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(contentList());
      console.log(contentList());
      setIsLoading(false)
    }, 2000);
  };
  console.log(contentSelector.contentList)
  const renderContent = () => {
    return contentSelector.contentList.map((val) => {
      return (
        <Content
          username={val.user.username}
          location={val.location}
          imageUrl={val.image_url}
          likes={val.likes}
          caption={val.caption}
          profilePicture={val.user.profile_picture}
          userId={val.userId}
          PassingConfirmDeletePost={() => confirmDeletePost(val.id)}
          postId={val.id}
        />
      );
    });
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const confirmDeletePost = async (id) => {
    let text = `Are u sure?  You want to delete this post `;
    if (confirm(text)) {
      await api.delete(`/posts/${id}`);
      fetchContent();
    }
    router.push("/");
  };
  return (
    <Box>
      <Stack alignItems={"center"}>{isLoading ? <Spinner /> : null}</Stack>
      {renderContent()}
    </Box>
  );
};

export default HomePage;
