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
  useDisclosure,
  FormControl,
  FormLabel,
  AvatarBadge,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import requiresAuth from "../../lib/hoc/requiresAuth";
import ContentImage from "./content";

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth);
  const [content, setContent] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <GridItem>
          <ContentImage image = {val.image}/>
        </GridItem>
      );
    });
  };
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
            onClick={onOpen}
          />
        </Stack>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          onClick={isOpen}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile Edit
            </Heading>
            <FormControl id="userName">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">Change Icon</Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>

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
        <Grid templateColumns="repeat(2, 1fr)">
          {renderImage()}
        </Grid>
        <Stack direction={"row"}>{authSelector.imageUrl}</Stack>
      </Box>
    </Center>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  const userData = context.req.cookies.user_data_login;
  return {
    props: {
      user: userData,
    },
  };
});
export default MyProfile;
