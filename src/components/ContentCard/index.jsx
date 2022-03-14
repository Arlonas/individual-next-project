

import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Icon
} from '@chakra-ui/react';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Content = ({username, location, caption, likes, imageUrl }) => {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
          <Stack ml={-3} mt={-2} mb={1} direction={'row'} spacing={3} align={'center'}>
            <Avatar
              src={imageUrl}
              alt={'Author'}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{username}</Text>
              <Text mr={-1} color={'gray.500'}>{location}</Text>
            </Stack>
          </Stack>
        <Box
          h={'290px'}
          bg={'gray.100'}
          mx={-6}
          mb={4}
          pos={'relative'}>
          <Image
            layout={'fill'}
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            />
        </Box>
            <Stack mx={-3}  my={-3} display="row" alignItems="center">
              <Icon
              ml={-1}
              mr={3}  
              boxSize={5} 
              as={FaRegHeart}
              sx={{
                _hover: {
                  cursor: "pointer",
                }}}
              />
              <Icon 
              ml={3}
              boxSize={5} 
              as={FaRegComment}
              sx={{
                _hover: {
                  cursor: "pointer",
                }}}

              />
              <Icon 
              ml={3}
              boxSize={5} 
              as={FiSend}
              sx={{
                _hover: {
                  cursor: "pointer",
                }}}
              />
            </Stack>
            <Stack mt={2}>
              <Text ml={-4} fontWeight={"bold"}>{likes}</Text>
            </Stack>
            <Box ml={-3}>
            <Text display="inline" fontWeight={"bold"} mr={2}>
              {username}
            </Text>
            <Text display="inline">{caption}</Text>
            </Box>

      </Box>
    </Center>
  );
}

export default Content
              
             
              
              
              



