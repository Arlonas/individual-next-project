import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRequiresAuth } from "../../lib/hooks/useRequiresAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const VerificationPage = () => {
  const authSelector = useSelector((state) => state.auth);
  const router = useRouter();
  useRequiresAuth();
  useEffect(() => {
    if (!authSelector.id) {
      router.push("/");
    }
  }, [authSelector.id]);
  const homepage = () => {
    return router.push("/");
  };
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Verification Success
      </Heading>
      <Text color={"gray.500"}>
        Your account has been verified, Please click the button below to go back
      </Text>
      <Button onClick={homepage} mt={2} colorScheme="teal" variant="outline">
        go back to Homepage
      </Button>
    </Box>
  );
};

export default VerificationPage;
