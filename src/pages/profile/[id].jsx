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
import { useState } from "react";
import { IoHeartOutline, IoHeartDislikeOutline } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import axios from "axios";
import UsersLikes from "../../components/Users Likes";
import UsersPosts from "../../components/UsersPosts";
const UserProfile = ({ profileDetail }) => {
  const router = useRouter();
  const [postOrLike, setPostOrLike] = useState(false);
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
            {profileDetail?.username}
          </Heading>
        </Stack>

        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={profileDetail?.profile_picture}
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
            <Text fontWeight={500}>{profileDetail?.full_name}</Text>
            <Text>{profileDetail?.email}</Text>
            <Text color={"gray.500"}>{profileDetail?.bio}</Text>
          </Stack>
          <Stack mx={-6} direction={"row"} justifyContent={"space-around"}>
            <Icon
              boxSize={5}
              as={BsGripVertical}
              color={"gray.300"}
              // anonymous function ini itu untuk biar g keevecute lgsng gitu
              onClick={() => {
                setPostOrLike(false);
              }}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            />
            <Icon
              boxSize={5}
              as={postOrLike ? IoHeartOutline : IoHeartDislikeOutline}
              color={"gray.300"}
              onClick={() => {
                setPostOrLike(true);
              }}
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
          <UsersLikes userId={profileDetail.id} />
        ) : (
          <UsersPosts userId={profileDetail.id} />
        )}
      </Box>
    </Center>
  );
};
export const getServerSideProps = async (context) => {
  try {
    const profileId = context.query.id;
    const res = await axios.get(`http://localhost:2020/profile/${profileId}`);

    return {
      props: {
        profileDetail: res.data.result,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default UserProfile;
