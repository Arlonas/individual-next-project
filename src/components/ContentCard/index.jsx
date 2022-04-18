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
} from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";
import { useRouter } from "next/router";
import Link from "next/link";
// nanay userlogin sama userdata dipisah gimn
// bikin resend verification
// apa harus pake api
// ambil id dari post pas render trs masukin ke edit ama delete post
// nanya kakaknya delete postnya gimn
// kalo detail post ambil datanya trs render ulang ama tambahin date
// pake pas kliknya itu diambil routeparams ato id dari postnya baru masukin ke getnya method
// kalo fullname itu diuserprofileaja pas edit
// bisa pake nano id di post methodnya di backend
// kalo mau pake nanoid itu
// id: nanoid
// biar g ngedouble di databsenya
// kalo mau sort pake api
// pakeuserlogin di comment like share ama profile kalo user blmlogin
// tanya kakaknya klao maufetch contetn dimasukin redux
// kalo reset password itu dari frontend kasih patch forget password / token user tersebut
// di backend kasih endpoint buat cari tokennya dan verify tokennya baru delete
// endpoint itu sekali nembak ke api itu endpoint route ama controllernya
// tanya kenapa id dari detail post g dpt
// hrs disabled login buttonnya
// kalo mau dapetin error dari backend err.response.data.message
// kalo infinite scrol sebelum di tambahin itu dispread buat di timpa ama yg baru biar yang lama g ilang
// kalo comment tuh ambil created at itu dari database kalo mau compare baru di moment().utc()
// kalo mau kasih liat liked post dari user ambil datanya dari table like
// di detail post hrs ada 5 most recent comments
// nanya kakanya protected page gimn ama requires auth
// kalo username or email it upake includes username.include(@) return true itu email kalo false username
// kalo g pake regex cari di stackoverflow ada di bookmark
// pake regex unutk email cari di stackoverflow
// kalo mau kasih character hrs mix character itu pkae if ternary di form helper text
// user ttp bisa login tp kasih button untuk resend verification
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
  const router = useRouter();

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

      await api.patch(`/posts/${postId}`, editPost);
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
          <Stack
            direction={"row"}
            spacing={1.5}
            align={"center"}
          >
            {userId == authSelector.id ? (
              <Avatar onClick={rerouteToProfilePage} src={profilePicture} alt={"Author"} />
            ) : <Avatar src={profilePicture} alt={"Author"} />}
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
          <Image h={"290px"} w={"100%"} layout={"fill"} src={imageUrl} />
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
                <Button onClick={formik.handleSubmit()} mt={1} mr={2}>
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
