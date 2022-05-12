import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  HStack,
  Icon,
  IconButton,
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import {
  FaRegHeart,
  FaRegComment,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaRegCopy,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import Page from "../../components/Page";
const DetailPost = ({ postDetail }) => {
  const authSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const [shareButtons, setShareButtons] = useState(false);
  const {
    isOpen: commentIsOpen,
    onOpen: commentOnOpen,
    onClose: commentOnClose,
  } = useDisclosure();
  const toast = useToast();

  const renderComment = () => {
    // console.log(commentList);
    return postDetail.Comments?.map((val) => {
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
  const ShareButtonHandlerTrue = () => {
    if (!authSelector.isVerified) {
      toast({
        status: "error",
        title: "Cannot delete post",
        description:
          "U have not verify your account, Please verify your account to enjoy our web apps features",
        duration: 3000,
      });
      return;
    }
    if (!authSelector.id) {
      toast({
        status: "error",
        title: "Cannot share post",
        description: "You have to sign in first in order to enjoy our features",
        duration: 2000,
      });
      return;
    }
    setShareButtons(true);
  };
  const ShareButtonHandlerFalse = () => {
    setShareButtons(false);
  };
  const copyLinkBtnHandler = () => {
    navigator.clipboard.writeText(
      `https://orange-crabs-sin-107-155-21-231.loca.lt${router.asPath}`
    );
    toast({
      position: "top-right",
      status: "info",
      title: "Link copied",
    });
  };
  const rerouteToProfilePage = () => {
    return router.push("/my-profile");
  };
  return (
    <Page
      title={`Let's checkout the latest post from ${postDetail.User.username}`}
      description={postDetail.caption}
      image={postDetail.image_url}
      url={`http://localhost:3000/detail-post/${postDetail.id}`}
    >
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
                src={postDetail?.User?.profile_picture}
                alt={"Author"}
              />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{postDetail?.User?.username}</Text>
                <Text mr={-1} color={"gray.500"}>
                  {postDetail?.location}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Box mx={-6} mb={4} pos={"relative"}>
            <Image
              h={{ base: "100%", sm: "400px", lg: "400px" }}
              w={"100%"}
              objectFit={"cover"}
              src={postDetail?.image_url}
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
              {shareButtons ? (
                <Icon
                  boxSize={5}
                  as={FiSend}
                  onClick={ShareButtonHandlerFalse}
                  sx={{
                    _hover: {
                      cursor: "pointer",
                    },
                  }}
                />
              ) : (
                <Icon
                  boxSize={5}
                  as={FiSend}
                  onClick={ShareButtonHandlerTrue}
                  sx={{
                    _hover: {
                      cursor: "pointer",
                    },
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack mt={-1}>
            <Text textAlign={"end"} fontSize={"10px"} color={"gray.500"}>
              {moment(postDetail?.createdAt).format("MMMM Do YYYY")}
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
          {shareButtons ? (
            <HStack mt={2}>
              <FacebookShareButton
                url={`https://orange-crabs-sin-107-155-21-231.loca.lt${router.asPath}`}
                quote={`Let's checkout the latest post from ${postDetail.User.username}`}
              >
                <IconButton
                  onClick={ShareButtonHandlerFalse}
                  borderRadius={"50%"}
                  color={"#385898"}
                  icon={<Icon size={"15%"} as={FaFacebook} />}
                />
              </FacebookShareButton>
              <TwitterShareButton
                title={`Let's checkout the latest post from ${postDetail.User.username}`}
                url={`https://orange-crabs-sin-107-155-21-231.loca.lt${router.asPath}`}
              >
                <IconButton
                  onClick={ShareButtonHandlerFalse}
                  borderRadius={"50%"}
                  color={"#1da1f2"}
                  icon={<Icon as={FaTwitter} />}
                />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`https://orange-crabs-sin-107-155-21-231.loca.lt${router.asPath}`}
                quote={`Let's checkout the latest post from ${postDetail.User.username}`}
              >
                <IconButton
                  onClick={ShareButtonHandlerFalse}
                  borderRadius={"50%"}
                  color={"#22c35e"}
                  icon={<Icon as={FaWhatsapp} />}
                />
              </WhatsappShareButton>
              <Stack>
                <IconButton
                  onClick={copyLinkBtnHandler}
                  borderRadius={"50%"}
                  icon={<Icon as={FaRegCopy} />}
                />
              </Stack>
            </HStack>
          ) : null}
          <Stack mt={2.5}>
            <Text ml={-4} fontWeight={"bold"}>
              {postDetail?.like_count} Likes
            </Text>
          </Stack>
          <Box ml={-4}>
            <Text display="inline" fontWeight={"bold"} mr={2}>
              {postDetail?.User?.username}
            </Text>
            <Text display="inline">{postDetail?.caption}</Text>
          </Box>
        </Box>
      </Center>
    </Page>
  );
};
export const getServerSideProps = async (context) => {
  try {
    const postId = context.query.id;
    const res = await axios.get(`http://localhost:2020/post/${postId}`, {
      params: {
        _sortBy: "createdAt",
        _sortDir: "DESC",
      },
    });

    return {
      props: {
        postDetail: res.data.result,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default DetailPost;
