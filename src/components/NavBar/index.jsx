// Di chakra ui Box itu seperti div bisa di kasih display flex kalo seperti itu lebih baik
// menggunakan stack karena stack itu sama saja seperti box tp di display flex
// kalo mau navbarnya beda pake if ternary di sign in ama sign upnya
import Link from "next/link";

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { auth_types } from "../../redux/types/auth";
import jsCookie from "js-cookie";
import { React, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";
import { useRouter } from "next/router";
import {  fetchInitialContent } from "../../redux/actions/fetchInitialContent";
import { useRef } from "react";

export default function Nav() {
  // ambil dari redux avatarnya nanti di masukin situ
  const { colorMode, toggleColorMode } = useColorMode();
  const authSelector = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(authSelector);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const inputFileRef = useRef();

  const signoutBtnHandler = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });
    jsCookie.remove("auth_token");
  };

  const formik = useFormik({
    initialValues: {
      location: "",
      caption: "",
    },

    validationSchema: Yup.object().shape({
      caption: Yup.string().required("This field is required"),
      location: Yup.string().required("This field is required"),
    }),

    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(selectedFile);
      try {
        if (!selectedFile) {
          toast({
            status: "error",
            title: "Failed to upload content",
            description: "U have not chose a file",
            duration: 2000,
          });
          return;
        }
        const formData = new FormData();
        const likes = 0;

        formData.append("caption", values.caption);
        formData.append("user_id", authSelector.id);
        formData.append("post_image_file", selectedFile);
        formData.append("like_count", likes);
        formData.append("location", protectedLocation());

        await api.post("/post", formData);
        setSelectedFile(null);
        formik.setFieldValue("caption", "");
        formik.setFieldValue("location", "");
        setTimeout(() => {
          dispatch(fetchInitialContent());
        }, 2000);
        router.push("/");
      } catch (err) {
        console.log(err);
        toast({
          status: "error",
          title: "Failed to upload post",
          description: err.message,
          duration: 2000,
        });
      }
    },
  });

  const protectedLocation = () => {
    const { values } = formik;
    const text = values.location;
    const [firstChar, ...restChar] = text.split("");
    const firstCharUpperCased = firstChar.toUpperCase();
    const joinrestChar = restChar.join("");
    const restCharLowerCased = joinrestChar.toLowerCase();
    const location = firstCharUpperCased + restCharLowerCased;

    return location;
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const rerouteToProfilePage = () => {
    return router.push("/my-profile");
  };
  return (
    <>
      <Box mb={3} bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link href={"/"}>
            <Box
              _hover={{
                cursor: "pointer",
              }}
            >
              ARA
            </Box>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7} paddingRight={7}>
              {authSelector.id ? (
                <>
                  <Button onClick={onOpen} leftIcon={<Icon as={AddIcon} />}>
                    Upload
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Create your account</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl>
                          <FormLabel>ImageUrl</FormLabel>
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
                            color={"#32b280"}
                          >
                            Choose File
                          </Button>
                          {/* <FormHelperText>
                            {formik.errors.location}
                          </FormHelperText> */}
                        </FormControl>

                        <FormControl mt={4} isInvalid={formik.errors.location}>
                          <FormLabel>Location</FormLabel>
                          <Input
                            value={formik.values.location}
                            placeholder="location"
                            onChange={(event) =>
                              formik.setFieldValue(
                                "location",
                                event.target.value
                              )
                            }
                          />
                          <FormHelperText>
                            {formik.errors.location}
                          </FormHelperText>
                        </FormControl>

                        <FormControl mt={4} isInvalid={formik.errors.caption}>
                          <FormLabel>Caption</FormLabel>
                          <Textarea
                            value={formik.values.caption}
                            placeholder="caption here"
                            onChange={(event) =>
                              formik.setFieldValue(
                                "caption",
                                event.target.value
                              )
                            }
                          />
                          <FormHelperText>
                            {formik.errors.caption}
                          </FormHelperText>
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={() => {
                            formik.handleSubmit();
                            onClose();
                          }}
                        >
                          Post
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              ) : null}
            </Stack>
            <Stack direction={"row"} spacing={7} paddingRight={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              {authSelector.id ? null : (
                <Link style={{ textDecoration: "none" }} href={"/signin"}>
                  <Button fontSize={"sm"} fontWeight={400}>
                    Sign In
                  </Button>
                </Link>
              )}
              {authSelector.id ? (
                <Menu>
                  <MenuButton>
                    <Avatar src={authSelector.profilePicture} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={rerouteToProfilePage}>
                      Settings <span><Icon as={IoMdSettings} /></span>
                    </MenuItem>
                    <MenuItem onClick={signoutBtnHandler}>
                      Logout <span><Icon as={IoMdLogOut} /></span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link style={{ textDecoration: "none" }} href={"/signup"}>
                  <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"#32b280"}
                    _hover={{
                      bg: "green.400",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
