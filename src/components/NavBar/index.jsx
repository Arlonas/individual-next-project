// Di chakra ui Box itu seperti div bisa di kasih display flex kalo seperti itu lebih baik 
// menggunakan stack karena stack itu sama saja seperti box tp di display flex
// kalo mau navbarnya beda pake if ternary di sign in ama sign upnya
import Link from 'next/link';

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';


export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
         <Link 
         href={"/"}>
          <Box
          _hover={{
            cursor: "pointer",
          }}
          >
            ARA
          </Box>
         </Link> 

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7} paddingRight={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
            <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Link style={{textDecoration:'none'}} href={"/signin"}>
            <Button
              fontSize={'sm'}
              fontWeight={400}
            >
              Sign In
            </Button>
            </Link>
            <Link style={{textDecoration:'none'}} href={"/signup"}>
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
  
              
             
