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
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
const Profile = ({ 
  backgroundProfilePicture,
  profilePicture,
  username,
  fullName,
  email,
  biography,
  imageUrl
 }) => {
  return (
    <Center py={6}>
      <Box
        maxW={"340px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={backgroundProfilePicture}
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={profilePicture}
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
          />
        </Stack>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {username}
            </Heading>
            <Text fontWeight={500}>{fullName}</Text>
            <Text>{email}</Text>
            <Text color={"gray.500"}>{biography}</Text>
          </Stack>
          <Divider />
        </Box>
        <Stack direction={"row"}>
          {imageUrl}
        </Stack>
      </Box>
    </Center>
  );
};

export default Profile
