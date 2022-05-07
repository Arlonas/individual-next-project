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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/auth";
import { useRequiresAuth } from "../../lib/hooks/useRequiresAuth";
import { useRouter } from "next/router";

export default function SignIn() {
  const authSelector = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      usernameOrEmail: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),

    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(() => {
        dispatch(userLogin(values, formik.setSubmitting));
      }, 2000);
      router.push("/");
    },
  });

  useRequiresAuth();
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
            <FormControl isInvalid={formik.errors.usernameOrEmail} id="usernameOrEmail">
              <FormLabel>Username or Email</FormLabel>
              <Input
                onChange={(event) =>
                  formik.setFieldValue("usernameOrEmail", event.target.value)
                }
              />
              <FormHelperText>{formik.errors.usernameOrEmail}</FormHelperText>
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
              <FormHelperText>{formik.errors.usernameOrEmail}</FormHelperText>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link href={"/forgot-password"}>
                  <Text
                    _hover={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    color={"blue.400"}
                  >
                    Forgot password?
                  </Text>
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
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
