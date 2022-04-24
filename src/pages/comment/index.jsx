import { Box } from "@chakra-ui/react";
const Comment = () => {
  return (
    <>
      <Box position="relative">Cover</Box>
      {/* // shorthand */}
      <Box pos="absolute">Cover</Box>
      <Box pos="absolute" top="5" left="0">
        Absolute with top and left
      </Box>
      <Box pos="relative" w="100%" zIndex={2}>
        Fixed with zIndex
      </Box>
    </>
  );
};

export default Comment
