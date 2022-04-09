import { Avatar, Box, Center, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "../../lib/api";
 const DetailPost = () => {
  const router = useRouter();
  const [content, setContent] = useState({});
  const postId = router.query.id;
  const fetchContent = () => {
    const res = api.get(`/posts/${postId}`, {
      params: {
        _expand: "user",
      },
    });
    setContent(res.data);
  };
  useEffect(() => {
    if (router.isReady) {
      fetchContent();
    }
  }, [router.isReady]);
  const rerouteToProfilePage = () => {
    return router.push("/my-profile");
  };

  return (
    <Center py={6} mt={8}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        my={-12}
        overflow={"hidden"}
      >
        <Stack
          ml={-3}
          mt={-2}
          mb={1}
          direction={"row"}
          spacing={3}
          align={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            onClick={rerouteToProfilePage}
            direction={"row"}
            spacing={1.5}
            align={"center"}
          >
            <Avatar src={content.user.profile_picture} alt={"Author"} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{username}</Text>
              <Text mr={-1} color={"gray.500"}>
                {content.location}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Box mx={-6} mb={4} pos={"relative"}>
          <Image h={"290px"} w={"100%"} layout={"fill"} src={imageUrl} />
        </Box>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack
            my={-3}
            ml={-4}
            spacing={5}
            direction="row"
            alignItems="center"
          >
            <Icon
              boxSize={5}
              as={FaRegHeart}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
            <Icon
              boxSize={5}
              as={FaRegComment}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
            <Icon
              boxSize={5}
              as={FiSend}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
          </Stack>
          <Stack>
            <Text>{content.date}</Text>
          </Stack>
        </Stack>
        <Stack mt={4}>
          <Text ml={-4} fontWeight={"bold"}>
            {content.likes} Likes
          </Text>
        </Stack>
        <Box ml={-4}>
          <Text display="inline" fontWeight={"bold"} mr={2}>
            {content.username}
          </Text>
          <Text display="inline">{content.caption}</Text>
        </Box>
      </Box>
    </Center>
  );
};

export default DetailPost