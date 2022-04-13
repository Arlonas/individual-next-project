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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import api from "../../lib/api";

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth);
  const [content, setContent] = useState([]);
  //  fetch user biar gosah di map
  // yang perlu di map photonya aja

  const fetchContentUser = async () => {
    try {
      const res = await api.get("/posts", {
        params: {
          _expand: "user",
          userId: authSelector.id,
        },
      });
      setContent(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderImage = async () => {
    return content.map((val) => {
      return (
        <Box></Box>
      )
    })
  }
  useEffect(() => {
    fetchContentUser();
  }, []);
  return (
    <Center py={6}>
      <Box
        maxW={"340px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={authSelector.backgroundProfilePicture}
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={authSelector.profilePicture}
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
        <Stack alignItems={"center"} pl={20} mt={0.5} mb={-4}>
          <EditIcon
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          />
        </Stack>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {authSelector.username}
            </Heading>
            <Text fontWeight={500}>{authSelector.fullName}</Text>
            <Text>{authSelector.email}</Text>
            <Text color={"gray.500"}>{authSelector.biography}</Text>
          </Stack>
          <Divider />
        </Box>
        <Stack direction={"row"}>{authSelector.imageUrl}</Stack>
      </Box>
    </Center>
  );
};
export default MyProfile;
