import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  FormControl,
  FormHelperText,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  StackDivider,
  Divider,
  HStack,
  Input,
  Container,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import {
  FaRegHeart,
  FaRegComment,
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaRegCopy,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchNextContent } from "../../redux/actions/fetchNextContent";
import { fetchInitialContent } from "../../redux/actions/fetchInitialContent";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { fetchAllContent } from "../../redux/actions/fetchAllContent";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import Page from "../Page";
// pagination nanti didispatch aja bikin global state
const Content = ({
  username,
  location,
  caption,
  likes,
  imageUrl,
  profilePicture,
  userId,
  PassingConfirmDeletePost,
  postId,
  createdAt,
}) => {
  const authSelector = useSelector((state) => state.auth);
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const {
    isOpen: commentIsOpen,
    onOpen: commentOnOpen,
    onClose: commentOnClose,
  } = useDisclosure();
  const router = useRouter();
  const dispatch = useDispatch();
  const [commentList, setCommentList] = useState([]);
  const [like, setLike] = useState(false);
  const [commentPage, setCommentPage] = useState(1);
  const [commentCount, setCommentCount] = useState(0);
  const [shareButtons, setShareButtons] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      caption: caption,
    },

    validationSchema: Yup.object().shape({
      caption: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!authSelector.isVerified) {
        toast({
          status: "error",
          title: "Cannot edit post",
          description:
            "U have not verify your account, Please verify your account to enjoy our web apps features",
          duration: 3000,
        });
        editOnClose()
        return;
      }
      const editPost = {
        caption: values.caption,
      };
      // console.log(editPost);

      await api.patch(`/post/${postId}`, editPost);
      editOnClose();
      dispatch(fetchAllContent());

      router.push("/");
    },
  });

  const commentFormik = useFormik({
    initialValues: {
      comment: "",
    },

    validationSchema: Yup.object().shape({
      comment: Yup.string()
        .required("This field is required")
        .max(300, "Max Characters 300"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!authSelector.isVerified) {
        toast({
          status: "error",
          title: "Cannot comment on post",
          description:
            "U have not verify your account, Please verify your account to enjoy our web apps features",
          duration: 3000,
        });
        formik.setFieldValue("comment", "")
        return;
      }
      if (authSelector.id) {
        try {
          // console.log(values);
          await api.post(`/post/${postId}/comments`, {
            comment: values.comment,
          });
          commentFormik.setFieldValue("comment", "");
          commentFormik.setSubmitting(false);
          fetchInitialComment();
        } catch (err) {
          console.log(err);
        }
      } else {
        toast({
          status: "error",
          title: "Cannot comment on post",
          description:
            "You have to sign in first in order to enjoy our features",
          duration: 2000,
        });
        commentFormik.setFieldValue("comment", "");
      }
    },
  });
  const maxCommentsPerPage = 5;
  const fetchInitialComment = async () => {
    try {
      const res = await api.get(`/post/${postId}/comments`, {
        params: {
          _limit: maxCommentsPerPage,
          _page: 1,
          _sortBy: "createdAt",
          _sortDir: "DESC",
        },
      });
      setCommentList(res.data.result.rows);
      setCommentCount(res.data.result.count);
      setCommentPage(1);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchNextCommentPage = async () => {
    try {
      const res = await api.get(`/post/${postId}/comments`, {
        params: {
          _limit: maxCommentsPerPage,
          _page: commentPage,
          _sortBy: "createdAt",
          _sortDir: "DESC",
        },
      });
      setCommentList((prevComments) => [
        ...prevComments,
        ...res.data.result.rows,
      ]);
      // setCommentList(res.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchNextCommentPages = () => {
    setCommentPage(commentPage + 1);
  };
  const renderComment = () => {
    // console.log(commentList);
    return commentList.map((val) => {
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
    fetchInitialComment();
  }, []);
  useEffect(() => {
    if (commentPage > 1) {
      fetchNextCommentPage();
    }
  }, [commentPage]);
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
    if (authSelector.id) {
      toast({
        status: "error",
        title: "Cannot share post",
        description: "You have to sign in first in order to enjoy our features",
        duration: 2000,
      });
    }
    setShareButtons(true);
  };
  const ShareButtonHandlerFalse = () => {
    setShareButtons(false);
  };

  const copyLinkBtnHandler = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/detail-post/${postId}`
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

  const likesStatus = async () => {
    if (authSelector.id) {
      const res = await api.get(`/post/${postId}/likes`);
      // console.log(res?.data?.result);
      setLike(res?.data?.result);
    }
    return;
  };

  const createAndDeleteLike = async () => {
    if (!authSelector.isVerified) {
      toast({
        status: "error",
        title: "Cannot like post",
        description:
          "U have not verify your account, Please verify your account to enjoy our web apps features",
        duration: 3000,
      });
      return;
    }
    if (authSelector.id) {
      await api.post(`post/${postId}/likes`);
      likesStatus();
      dispatch(fetchAllContent());
    } else {
      toast({
        status: "error",
        title: "Cannot like post",
        description: "You have to sign in first in order to enjoy our features",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    likesStatus();
  }, []);
  return (
    <Page
      title={`Let's checkout the latest post from ${username}`}
      description={caption}
      image={imageUrl}
      url={`http://localhost:3000/detail-post/${postId}`}
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
            <Stack direction={"row"} spacing={1.5} align={"center"}>
              {userId == authSelector.id ? (
                <Avatar
                  onClick={rerouteToProfilePage}
                  src={profilePicture}
                  alt={"Author"}
                  sx={{
                    _hover: {
                      cursor: "pointer",
                    },
                  }}
                />
              ) : (
                <Link href={`/profile/${userId}`}>
                  <Avatar
                    src={profilePicture}
                    alt={"Author"}
                    sx={{
                      _hover: {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Link>
              )}
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{username}</Text>
                <Text mr={-1} color={"gray.500"}>
                  {location}
                </Text>
              </Stack>
            </Stack>
            <Stack>
              {authSelector.id ? (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <Link href={`/detail-post/${postId}`}>
                      <MenuItem>Detail Post</MenuItem>
                    </Link>
                    {userId == authSelector.id ? (
                      <>
                        <MenuItem onClick={editOnOpen}>Edit Post</MenuItem>
                        <MenuItem onClick={deleteOnOpen}>Delete Post</MenuItem>
                      </>
                    ) : null}
                  </MenuList>
                </Menu>
              ) : (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <Link href={`/detail-post/${postId}`}>
                      <MenuItem>Detail Post</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Stack>
          <Box mx={-6} mb={4} pos={"relative"}>
            <Image
              h={{ base: "100%", sm: "400px", lg: "400px" }}
              w={"100%"}
              objectFit={"cover"}
              src={imageUrl}
            />
          </Box>
          <Stack
            my={-3}
            ml={-4}
            spacing={5}
            direction="row"
            alignItems="center"
          >
            <Icon
              boxSize={5}
              as={like ? FaHeart : FaRegHeart}
              color={like ? "red.500" : null}
              onClick={() => createAndDeleteLike()}
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
          <Text textAlign={"end"} fontSize={"10px"} color={"gray.500"}>
            {moment(createdAt).format("MMMM Do YYYY")}
          </Text>

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
                    {/* di map nanti untuk commentnya */}
                    <Box ml={-4} mb={"2"}>
                      <HStack>
                        <Avatar
                          size={"xs"}
                          src={profilePicture}
                          alt={"Author"}
                        />
                        <Text display="inline" fontWeight={"bold"} mr={2}>
                          {username}
                        </Text>
                        <Text display="inline">{caption}</Text>
                      </HStack>
                    </Box>
                    <Divider />
                    {/* {postId == commentList.post_id ? (
                  ) : null} */}
                    <Box maxH={"320px"} overflowY={"scroll"} mt={"2"}>
                      {renderComment()}
                    </Box>
                    {commentList.length !== commentCount ? (
                      <Text
                        onClick={fetchNextCommentPages}
                        color={"#32b280"}
                        mb={"-4"}
                        _hover={{
                          cursor: "pointer",
                        }}
                        textAlign={"center"}
                      >
                        see more
                      </Text>
                    ) : (
                      <Text mb={"-4"} textAlign={"center"}>
                        No more comments here
                      </Text>
                    )}
                  </ModalBody>

                  <HStack my={"2"} mx={"2"}>
                    <Input
                      onChange={(event) =>
                        commentFormik.setFieldValue(
                          "comment",
                          event.target.value
                        )
                      }
                      value={commentFormik.values.comment}
                    />
                    <Button
                      onClick={commentFormik.handleSubmit}
                      color={"#32b280"}
                      disabled={commentFormik.isSubmitting}
                    >
                      Post
                    </Button>
                  </HStack>
                </VStack>
              </ModalContent>
            </Container>
          </Modal>
          {shareButtons ? (
            <HStack mt={2}>
              <FacebookShareButton
                url={`http://localhost:3000/detail-post/${postId}`}
                quote={`Let's checkout the latest post from ${username}`}
              >
                <IconButton
                  onClick={ShareButtonHandlerFalse}
                  borderRadius={"50%"}
                  color={"#385898"}
                  icon={<Icon size={"15%"} as={FaFacebook} />}
                />
              </FacebookShareButton>
              <TwitterShareButton
                title={`Let's checkout the latest post from ${username}`}
                url={`http://localhost:3000/detail-post/${postId}`}
              >
                <IconButton
                  borderRadius={"50%"}
                  color={"#1da1f2"}
                  icon={<Icon as={FaTwitter} />}
                />
              </TwitterShareButton>
              <IconButton
                borderRadius={"50%"}
                color={"#22c35e"}
                icon={<Icon as={FaWhatsapp} />}
              />
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
              {likes} Likes
            </Text>
          </Stack>
          <Box ml={-4}>
            <Text display="inline" fontWeight={"bold"} mr={2}>
              {username}
            </Text>
            {editIsOpen ? (
              <Stack mt={1}>
                <FormControl isOpen={editIsOpen} onClose={editOnClose}>
                  <Textarea
                    placeholder="caption"
                    value={formik.values.caption}
                    onChange={(event) =>
                      formik.setFieldValue("caption", event.target.value)
                    }
                  />
                  <FormHelperText>{formik.errors.caption}</FormHelperText>
                  <Button onClick={formik.handleSubmit} mt={1} mr={2}>
                    Edit
                  </Button>
                  <Button mt={1} onClick={editOnClose}>
                    Cancel
                  </Button>
                </FormControl>
              </Stack>
            ) : (
              <Text display="inline">{caption}</Text>
            )}
            {deleteIsOpen ? (
              <>
                <AlertDialog isOpen={deleteIsOpen} onClose={deleteOnClose}>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Post
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button onClick={deleteOnClose}>Cancel</Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            PassingConfirmDeletePost();
                            deleteOnClose();
                          }}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </>
            ) : null}
          </Box>
        </Box>
      </Center>
    </Page>
  );
};

export default Content;
