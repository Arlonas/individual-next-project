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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  StackDivider,
  Divider,
  HStack,
  Input,
} from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchContent } from "../../redux/actions/fetchContent";
import { useEffect } from "react";
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

  const formik = useFormik({
    initialValues: {
      caption: caption,
    },

    validationSchema: Yup.object().shape({
      caption: Yup.string().required("This field is required"),
    }),

    onSubmit: async (values) => {
      const editPost = {
        caption: values.caption,
      };
      console.log(editPost);

      await api.patch(`/post/${postId}`, editPost);
      editOnClose();
      dispatch(fetchContent());

      router.push("/");
    },
  });

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
          <Stack direction={"row"} spacing={1.5} align={"center"}>
            {userId == authSelector.id ? (
              <Avatar
                onClick={rerouteToProfilePage}
                src={profilePicture}
                alt={"Author"}
              />
            ) : (
              <Avatar src={profilePicture} alt={"Author"} />
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
        <Stack my={-3} ml={-4} spacing={5} direction="row" alignItems="center">
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
        {/* <Stack>
          <Text fontSize={"10px"} color={"gray.500"}>
            {moment(createdAt).format("MMMM Do YYYY")}
          </Text>
        </Stack> */}
        <Modal isOpen={commentIsOpen} onClose={commentOnClose}>
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
                    <Avatar size={"xs"} src={profilePicture} alt={"Author"} />
                    <Text display="inline" fontWeight={"bold"} mr={2}>
                      {username}
                    </Text>
                    <Text display="inline">{caption}</Text>
                  </HStack>
                </Box>
                <Divider />
                <Box position={"relative"} zIndex={2} mt={"2"}>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/kent-c-dodds"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                  <Box>
                    <Avatar
                      mb={"2"}
                      size={"xs"}
                      src={"https://bit.ly/ryan-florence"}
                      alt={"Author"}
                    />
                    <Text
                      ml={"2.5"}
                      display="inline"
                      fontWeight={"bold"}
                      mr={2}
                    >
                      username
                    </Text>
                    <Text display="inline">caption</Text>
                  </Box>
                </Box>
                {/* <Text mb={"-4"} textAlign={"center"}>see more</Text> */}
              </ModalBody>

              <HStack position={"relative"} zIndex={1} my={"2"} mx={"2"}>
                <Input />
                <Button color={"#32b280"}>Post</Button>
              </HStack>
            </VStack>
          </ModalContent>
        </Modal>
        <Stack mt={4}>
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
  );
};

export default Content;
