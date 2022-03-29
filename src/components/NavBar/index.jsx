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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { auth_types } from "../../redux/types/auth";
import jsCookie from "js-cookie";
import { React } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { axiosInstance } from "../Configs/api";
import HomePage from "../../pages/homepage/homepage";

export default function Nav({ imageUrl }) {
  // ambil dari redux avatarnya nanti di masukin situ
  const { colorMode, toggleColorMode } = useColorMode();
  const authSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signoutBtnHandler = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });
    jsCookie.remove("user_data");
  };

  const formik = useFormik({
    initialValues: {
      location: "",
      imageUrl: "",
      caption: "",
    },

    validationSchema: Yup.object().shape({
      location: Yup.string().required("This field is required"),
      imageUrl: Yup.string()
        .matches(
          `/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/`,
          "Enter correct url!"
        )
        .required("This field is required"),
      caption: Yup.string().required("This field is required"),
    }),

    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        let date = moment().format("MMMM Do YYYY, h:mm:ss a");
        const newPost = {
          userId: 1,
          location: values.location,
          date,
          image_url: values.imageUrl,
          likes: 0,
          caption: values.caption,
        };

        await axiosInstance.post("/posts", newPost)
      } catch (err) {
        toast({
          status: "error",
          title: "Failed to upload post",
          description: err.message,
          duration: 2000,
        });
      }
    },
  });

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
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
                        <FormControl isInvalid={formik.errors.location}>
                          <FormLabel>Location</FormLabel>
                          <Input
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

                        <FormControl mt={4} isInvalid={formik.errors.imageUrl}>
                          <FormLabel>ImageUrl</FormLabel>
                          <Input
                            placeholder="url"
                            onChange={(event) =>
                              formik.setFieldValue(
                                "imageUrl",
                                event.target.value
                              )
                            }
                          />
                          <FormHelperText>
                            {formik.errors.imageUrl}
                          </FormHelperText>
                        </FormControl>

                        <FormControl mt={4} isInvalid={formik.errors.caption}>
                          <FormLabel>Caption</FormLabel>
                          <Textarea
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
                          onClick={formik.handleSubmit}
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
                    <Avatar
                      src={
                        authSelector.profilePicture
                        
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      Settings <Icon as={IoMdSettings} />
                    </MenuItem>
                    <MenuItem onClick={signoutBtnHandler}>
                      Logout <Icon as={IoMdLogOut} />
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
                    bg={"pink.400"}
                    _hover={{
                      bg: "pink.300",
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
