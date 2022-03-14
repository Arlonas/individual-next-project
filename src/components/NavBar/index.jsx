// Di chakra ui Box itu seperti div bisa di kasih display flex kalo seperti itu lebih baik 
// menggunakan stack karena stack itu sama saja seperti box tp di display flex
// kalo mau navbarnya beda pake if ternary di sign in ama sign upnya
import { Link } from 'react-router-dom'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { BsSun } from 'react-icons/bs'
import { HiMoon } from 'react-icons/hi'


export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
         <Link to={"/"}>
          <Box>
            ARA
          </Box>
         </Link> 

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7} paddingRight={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <HiMoon /> : <BsSun />}
              </Button>
            </Stack>
            <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Link style={{textDecoration:'none'}} to='/signin'>
            <Button
              fontSize={'sm'}
              fontWeight={400}
            >
              Sign In
            </Button>
            </Link>
            <Link style={{textDecoration:'none'}} to='/signup'>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}>
              Sign Up
            </Button>
            </Link>
          </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
  
              
             
