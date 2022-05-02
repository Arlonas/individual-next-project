import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import moment from "moment";
const DetailPost = () => {
  const router = useRouter();
  const [content, setContent] = useState({});
  const { id } = router.query;
  const {
    isOpen: commentIsOpen,
    onOpen: commentOnOpen,
    onClose: commentOnClose,
  } = useDisclosure();

  const fetchContent = async () => {
    const res = await api.get(`/post/${id}`, {
      params: {
        _limit: 5,
        _sortDir: "DESC",
        _sortBy: "createdAt",
      },
    });

    // console.log(res.data.result)
    setContent(res?.data?.result);
  };
  const renderComment = () => {
    // console.log(commentList);
    return content.Comments?.map((val) => {
      return (
        <Box mb={2}>
          <Avatar
            mb={"2"}
            size={"xs"}
            src={"https://bit.ly/kent-c-dodds"}
            alt={"Author"}
          />
          <Text ml={"2.5"} display="inline" fontWeight={"bold"} mr={2}>
            {val.User.username}
          </Text>
          <Text display="inline">{val.comment}</Text>
          <Text fontSize={"xs"} color={"gray.500"}>
            {moment(val.createdAt).format("MMMM Do YYYY")}
          </Text>
        </Box>
      );
    });
  };
  useEffect(() => {
    if (router.isReady) {
      // console.log(id)
      fetchContent();
    }
  }, [router.isReady]);
  const rerouteToProfilePage = () => {
    return router.push("/my-profile");
  };
  // console.log(content?.createdAt.moment().format())
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
            <Avatar
              _hover={{
                cursor: "pointer",
              }}
              src={content?.User?.profile_picture}
              alt={"Author"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{content?.User?.username}</Text>
              <Text mr={-1} color={"gray.500"}>
                {content?.location}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Box mx={-6} mb={4} pos={"relative"}>
          <Image
            h={{ base: "100%", sm: "400px", lg: "400px" }}
            w={"100%"}
            objectFit={"cover"}
            src={content?.image_url}
          />
        </Box>
        <Stack ml={0.2} direction={"row"} justifyContent={"space-between"}>
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
              onClick={commentOnOpen}
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
        </Stack>
        <Stack mt={-1}>
          <Text textAlign={"end"} fontSize={"10px"} color={"gray.500"}>
            {moment(content?.createdAt).format("MMMM Do YYYY")}
          </Text>
        </Stack>
        <Modal isOpen={commentIsOpen} onClose={commentOnClose}>
          <Container>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Comments</ModalHeader>
              <ModalCloseButton />
              <Divider />
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                <ModalBody>
                  <Box maxH={"320px"} mt={"2"}>
                    {renderComment()}
                  </Box>
                </ModalBody>
              </VStack>
            </ModalContent>
          </Container>
        </Modal>
        <Stack mt={2.5}>
          <Text ml={-4} fontWeight={"bold"}>
            {content?.like_count} Likes
          </Text>
        </Stack>
        <Box ml={-4}>
          <Text display="inline" fontWeight={"bold"} mr={2}>
            {content?.User?.username}
          </Text>
          <Text display="inline">{content?.caption}</Text>
        </Box>
      </Box>
    </Center>
  );
};

export default DetailPost;
