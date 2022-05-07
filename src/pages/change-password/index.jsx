import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRequiresAuth } from "../../lib/hooks/useRequiresAuth";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import api from "../../lib/api";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast()

  const token = router.query.fpt;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object().shape({
      password: Yup.string().required("This field is required"),
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // ),
      confirmPassword: Yup.string().required("This field is required"),
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // ),
    }),

    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      console.log(token);
      try {
        if (values.confirmPassword !== values.password) {
          formik.setFieldError(
            "confirmPassword",
            "password didn't match, Please input the same password as above"
          );
        }

        await api.post("/auth/change-password", {
          password: values.confirmPassword,
          forgotPasswordToken: token,
        });
        toast({
          title: "Password Changed",
          description: "please sign in again to enjoy our features",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
        router.push("/signin")
        formik.setSubmitting(false)
      } catch (err) {
        console.log(err);
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
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Enter new password
        </Heading>
        <FormControl  isRequired>
          <FormLabel>New Password</FormLabel>
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
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            type={"password"}
            onChange={(event) =>
              formik.setFieldValue("confirmPassword", event.target.value)
            }
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
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
    </Flex>
  );
};

export default ChangePassword;
