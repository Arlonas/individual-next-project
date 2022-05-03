import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Divider,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";
import { IoHeartOutline, IoHeartDislikeOutline } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contentImage, setContent] = useState([]);
  const [userProfileContent, setUserProfileContent] = useState();
  const [postOrLike, setPostOrLike] = useState(true);
  const [UserLikedPost, setUserLikedPost] = useState([]);

  const fetchContentUser = async () => {
    try {
      const res = await api.get(`/profile/${id}`);
      setContent(res.data.result.Posts);
      console.log(res.data.result)
      setUserProfileContent(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchLikedPostUser = async () => {
    try {
      const res = await api.get(`/profile/posts/likes/${id}`);
      // console.log(res.data.result);
      setUserLikedPost(res.data.result);
      setPostOrLike(false);
    } catch (err) {
      console.log(err);
    }
  };
  const renderImage = () => {
    return contentImage?.map((val) => {
      return (
        <GridItem>
          <Link href={`/detail-post/${val.id}`}>
            <Box
              _hover={{
                cursor: "pointer",
              }}
              px={2}
              mb={2}
            >
              <Image src={val.image_url} />
            </Box>
          </Link>
        </GridItem>
      );
    });
  };
  const renderLikedImage = () => {
    return UserLikedPost.map((val) => {
      return (
        <GridItem>
          <Link href={`/detail-post/${val?.Post?.id}`}>
            <Box
              _hover={{
                cursor: "pointer",
              }}
              px={2}
              mb={2}
            >
              <Image
                w={"100%"}
                h={"200px"}
                objectFit={"cover"}
                src={val?.Post?.image_url}
              />
            </Box>
          </Link>
        </GridItem>
      );
    });
  };
  useEffect(() => {
    if (router.isReady) {
      fetchContentUser();
    }
  }, [router.isReady]);
  return (
    <Center py={6}>
      <Box
        maxW={"500px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          mt={"-4"}
          mb={"6"}
          justifyContent={"space-around"}
          h={"120px"}
          w={"full"}
        >
          <Heading
            textAlign={"center"}
            fontSize={"2xl"}
            fontWeight={500}
            fontFamily={"body"}
          >
            {userProfileContent?.username}
          </Heading>
        </Stack>

        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={userProfileContent?.profile_picture}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
            _hover={{
              cursor: "pointer",
              opacity: 0.9,
            }}
          />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Text fontWeight={500}>{userProfileContent?.full_name}</Text>
            <Text>{userProfileContent?.email}</Text>
            <Text color={"gray.500"}>{userProfileContent?.bio}</Text>
          </Stack>
          <Stack mx={-6} direction={"row"} justifyContent={"space-around"}>
            <Icon
              boxSize={5}
              as={BsGripVertical}
              color={"gray.300"}
              onClick={fetchContentUser}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
            <Icon
              boxSize={5}
              as={postOrLike ? IoHeartDislikeOutline : IoHeartOutline}
              color={"gray.300"}
              onClick={fetchLikedPostUser}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
          </Stack>
          <Divider />
        </Box>
        {postOrLike ? (
          <Grid templateColumns="repeat(2, 1fr)">{renderImage()}</Grid>
        ) : (
          <Grid templateColumns="repeat(2, 1fr)">{renderLikedImage()}</Grid>
        )}
      </Box>
    </Center>
  );
};

export default UserProfile;
