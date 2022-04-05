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
  Checkbox,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import jsCookie from "js-cookie";
import api from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { auth_types } from "../../redux/types/auth";
import { userLogin } from "../../redux/actions/auth";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  // tanya kakaknya kalo mau chech udh ke login ato blm dri mana
  // sama kenapa di stringified

  const dispatch = useDispatch();

  const authSelector = useSelector((state) => state.auth)

  const router = useRouter();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),

    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        dispatch(userLogin(values))

        router.push("/");
      } catch (err) {
        toast({
          status: "error",
          title: "Failed to Login",
          description: err.message,
          duration: 2000,
        });
      }
    },
  });
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg itu backgroundcolor
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={formik.errors.username} id="username">
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(event) =>
                  formik.setFieldValue("username", event.target.value)
                }
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>
            <FormControl isInvalid={formik.errors.password} id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={formik.handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Don't have an account?
              <Link href={"/signup"}>
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
                  Signup
                </Text>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
