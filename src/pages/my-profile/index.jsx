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
  Input,
  Grid,
  GridItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast,
  FormHelperText,
  IconButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon, EmailIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import api from "../../lib/api";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth_types } from "../../redux/types";

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth);
  const [contentImage, setContentImage] = useState([]);
  const [myProfileContent, setMyProfileContent] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const inputFileRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const fetchContentUser = async () => {
    try {
      const res = await api.get("/profile");
      setContentImage(res.data.result.Posts);
      console.log(res.data.result);
      setMyProfileContent(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      bio: "",
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      fullName: Yup.string().required("This field is required"),
      bio: Yup.string().required("This field is required"),
    }),

    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(selectedFile);
      console.log(values);
      try {
        if (!selectedFile) {
          toast({
            status: "error",
            title: "Failed to edit profile",
            description: "U have not chose a profile picture",
            duration: 2000,
          });
          return;
        }
        const formData = new FormData();

        formData.append("username", values.username);
        formData.append("full_name", values.fullName);
        formData.append("bio", values.bio);
        formData.append("update_image_file", selectedFile);

        await api.post("/profile", formData);
        setSelectedFile(null);
        formik.setFieldValue("username", "");
        formik.setFieldValue("fullName", "");
        formik.setFieldValue("bio", "");
        formik.setSubmitting(false);
        onClose();
        fetchContentUser();
      } catch (err) {
        console.log(err);
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message == "Username has been taken") {
          formik.setFieldError("username", "Username has been taken");
        }
        toast({
          status: "error",
          title: "Failed to upload post",
          description: err?.response?.data?.message,
          duration: 2000,
        });
      }
    },
  });
  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const resendEmailVerification = async () => {
    await api.post("/auth/resend-verification");
    toast({
      status: "success",
      title: "Email sent",
      description: "Please check your inbox",
      duration: 2000,
    });
  };

  // console.log(content)
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
  // console.log(renderImage())
  useEffect(() => {
    fetchContentUser();
  }, []);
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
            {myProfileContent?.username}
          </Heading>
        </Stack>

        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={myProfileContent?.profile_picture}
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Stack
              spacing={4}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile Edit
              </Heading>
              <FormControl id="username">
                <FormLabel>Profile Picture</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar
                      size="xl"
                      src={myProfileContent?.profile_picture}
                    ></Avatar>
                  </Center>
                  <Center w="full">
                    <FormControl>
                      <Input
                        placeholder="url"
                        onChange={handleFile}
                        ref={inputFileRef}
                        display={"none"}
                        type={"file"}
                        accept={"image/png, image/jpeg"}
                        multiple={false}
                      />
                      <Button
                        onClick={() => inputFileRef.current.click()}
                        w="full"
                      >
                        Change Profile Picture
                      </Button>
                    </FormControl>
                  </Center>
                </Stack>
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  value={formik.values.username}
                  placeholder="Username"
                  _placeholder={{ color: "gray.500" }}
                  onChange={(event) =>
                    formik.setFieldValue("username", event.target.value)
                  }
                />
                <FormHelperText>{formik.errors.username}</FormHelperText>
              </FormControl>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={formik.values.fullName}
                  placeholder="Full Name"
                  _placeholder={{ color: "gray.500" }}
                  onChange={(event) =>
                    formik.setFieldValue("fullName", event.target.value)
                  }
                />
                <FormHelperText>{formik.errors.fullName}</FormHelperText>
              </FormControl>
              <FormControl id="bio" isRequired>
                <FormLabel>Biography</FormLabel>
                <Input
                  value={formik.values.bio}
                  placeholder="Biography"
                  _placeholder={{ color: "gray.500" }}
                  onChange={(event) =>
                    formik.setFieldValue("bio", event.target.value)
                  }
                />
                <FormHelperText>{formik.errors.bio}</FormHelperText>
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={onClose}
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
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </ModalContent>
        </Modal>
        {myProfileContent.is_verified ? null : (
          <Stack alignItems={"end"} mr={2}>
            <IconButton
              onClick={resendEmailVerification}
              variant="outline"
              colorScheme="teal"
              icon={<EmailIcon />}
            />
          </Stack>
        )}

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Text fontWeight={500}>{myProfileContent?.full_name}</Text>
            <Text>{myProfileContent?.email}</Text>
            <Text color={"gray.500"}>{myProfileContent?.bio}</Text>
          </Stack>
          <Divider />
        </Box>
        <Grid templateColumns="repeat(2, 1fr)">{renderImage()}</Grid>
      </Box>
    </Center>
  );
};
export default MyProfile;
