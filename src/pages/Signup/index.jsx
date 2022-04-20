import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { DragHandleIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import api from "../../lib/api";
import { useRouter } from "next/router";
import { network_types } from "../../redux/types";
// dibackend lgsng res.redirect aja ke signin page

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const toast = useToast();

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      email: Yup.string()
        .required("This field is required")
        .email("Field should contain a valid e-mail"),
      password: Yup.string()
        .required("This field is required")
        // .matches(
        //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        // ),
    }),

    validateOnChange: false,
    onSubmit: async (values) => {
      
        try {
          const res = await api.post("/auth/signup", {
            username: values.username,
            email: values.email,
            password: values.password,
          });
          // console.log(res?.statusText)
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2000,
            position: "top-right",
          });

          formik.setSubmitting(false)
          router.push("/signin");
        } catch (err) {
          console.log(err);
          // untuk mengetahui apakah usernamenya taken ato engga
          if (
            err?.response?.data?.message == "Username or Email has been taken"
          ) {
            formik.setFieldError("username", "This username has been taken");
          }
          if (
            err?.response?.data?.message == "Username or Email has been taken"
          ) {
            formik.setFieldError("email", "This email address has been taken");
          }
          dispatch({
            type: network_types.NETWORK_ERROR,
            payload: {
              title: "Registration Failed",
              description: err?.response?.data?.message,
            },
          });
          formik.setSubmitting(false)
        }
      
    },
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          w="393px"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(event) =>
                  formik.setFieldValue("username", event.target.value)
                }
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)
                }
              />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?
              <Link href={"/signin"}>
                <Text
                  align={"center"}
                  display={"inline"}
                  ml={1}
                  color={"blue.400"}
                  _hover={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Signin
                </Text>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
