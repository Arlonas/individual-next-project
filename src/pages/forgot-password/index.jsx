import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  FormLabel,
  FormHelperText
} from "@chakra-ui/react";
import { useRequiresAuth } from "../../lib/hooks/useRequiresAuth";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";

const ForgotPassword = () => {
  const router = useRouter();

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("This field is required")
        .email("Field should contain a valid e-mail"),
    }),

    validateOnChange: false,
    onSubmit: async (values) => {
      try {
           await api.post("/auth/forgot-password", {
              email: values.email
          })
          toast({
            title: "Email sent",
            description: "please check your email inbox",
            status: "success",
            duration: 2000,
            position: "top-right",
          });
          formik.setSubmitting(false);
      } catch (err) {
        console.log(err);
        if (
          err?.response?.data?.message ==
          "Wrong email, Please input the right email"
        ) {
          formik.setFieldError("email", "Wrong email, Please input the right email");
        }
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
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You'll get an email with a reset link
        </Text>
        <FormControl isInvalid={formik.errors.email} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(event) =>
                  formik.setFieldValue("email", event.target.value)
                }
              />
              <FormHelperText>{formik.errors.email}</FormHelperText>
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
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
