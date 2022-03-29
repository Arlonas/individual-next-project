import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Icon,
} from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";

const Content = ({ username, location, caption, likes, imageUrl, profilePicture }) => {
  const authSelector = useSelector(state => state.auth)
  return (
    <Center py={6} mt={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        my={-6}
        overflow={"hidden"}
      >
        <Stack
          ml={-3}
          mt={-2}
          mb={1}
          direction={"row"}
          spacing={3}
          align={"center"}
        >
          <Avatar src={profilePicture} alt={"Author"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{username}</Text>
            <Text mr={-1} color={"gray.500"}>
              {location}
            </Text>
          </Stack>

          {/* <Stack direction={"column"} spacing={0}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem icon={<AddIcon />} command="⌘T">
                  New Tab
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                  New Window
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                  Open Closed Tab
                </MenuItem>
                <MenuItem icon={<EditIcon />} command="⌘O">
                  Open File...
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack> */}
        </Stack>
        <Box mx={-6} mb={4} pos={"relative"}>
          <Image h={"290px"} w={"100%"} layout={"fill"} src={imageUrl} />
        </Box>
        <Stack my={-3} ml={-4} spacing={5} direction="row" alignItems="center">
          <Icon
            boxSize={5}
            as={FaRegHeart}
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          />
          <Icon
            boxSize={5}
            as={FaRegComment}
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          />
          <Icon
            boxSize={5}
            as={FiSend}
            sx={{
              _hover: {
                cursor: "pointer",
              },
            }}
          />
        </Stack>
        <Stack mt={4}>
          <Text ml={-4} fontWeight={"bold"}>
            {likes} Likes
          </Text>
        </Stack>
        <Box ml={-4}>
          <Text display="inline" fontWeight={"bold"} mr={2}>
            {username}
          </Text>
          <Text display="inline">{caption}</Text>
        </Box>
      </Box>
    </Center>
  );
};

export default Content;
