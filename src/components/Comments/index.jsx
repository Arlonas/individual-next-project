import { Box, Text, useColorModeValue, } from "@chakra-ui/react";

const Comments = ({username, comment}) => {
    return (
        <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        rounded={'md'}
        overflow={'hidden'}
        >
         <Text>Comment</Text>
         <Text display={"inline"} fontWeight={"bold"} mr={"2"}>
             {username}
         </Text>
         <Text display="inline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, voluptates.</Text>
        </Box>
    );
  };
  
  export default Comments;
  