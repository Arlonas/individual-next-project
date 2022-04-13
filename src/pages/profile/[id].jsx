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
  import { EditIcon } from "@chakra-ui/icons";
  import { useRouter } from "next/router";
  const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query
    const [content, setContent] = useState([]);

      const fetchContentUser = async () => {
        try {
          const res = await api.get("/posts", {
            params: {
              _expand: "user",
              userId: id,
            },
          });
          setContent(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        if (router.isReady) {
          fetchContentUser();
        }
      }, [router.isReady]);
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
            src={content?.background_profile_picture}
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={content?.profile_picture}
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
                {content?.user?.username}
              </Heading>
              <Text fontWeight={500}>{content?.user?.fullName}</Text>
              <Text>{content?.user?.email}</Text>
              <Text color={"gray.500"}>{content?.user?.bio}</Text>
            </Stack>
            <Divider />
          </Box>
          <Stack direction={"row"}>
            {content?.image_url}
          </Stack>
        </Box>
      </Center>
    );
  };
  
  export default UserProfile
  