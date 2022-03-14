import {
    Box,
    Image,
    Text,
    Avatar,
    Center,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
  } from "@chakra-ui/react";
  import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
  import { BiDotsVerticalRounded } from "react-icons/bi";
  import { FaRegComment } from "react-icons/fa";
  
 

  
  
  
  const ContentCard = ({
    username,
    location,
    likes,
    date,
    caption,
    likeStatus,
    imgUrl,
    deleteDataFn,
    likeStatusFnOnclick,
    likeStatusFnDblclick,
    id,
    userId,
  }) => {
    
  
    return (
      <Center>
        <Box
          w="500px"
          rounded="10px"
          overflow="auto"
          boxShadow="2xl"
          mt={3}
          mb={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            my={2}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                size="md"
                name="user"
                src="https://images.pexels.com/photos/8415157/pexels-photo-8415157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                marginX={3}
              />
              <div>
                
                  <Text fontWeight={"bold"} fontSize="xl">
                    username
                  </Text>
                
                <Text color="gray.500" fontSize="smaller">
                  location
                </Text>
              </div>
            </Box>
            <div>
              <Menu>
                <MenuButton>
                  <Icon
                    
                    className="click"
                    boxSize={6}
                    my={4}
                    mx={3}
                  />
                </MenuButton>
                <MenuList>
                  
                    <MenuItem>Detail Post</MenuItem>
                  
                   
                    <>
                      <MenuItem>Edit Post</MenuItem>
                      <MenuItem >Delete</MenuItem>
                    </>
                  
                </MenuList>
              </Menu>
  
              <Modal>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Post</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel htmlFor="locationInput">Location</FormLabel>
                      <Input
                        
                        // value={location}
                        id="locationInput"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="captionInput">Caption</FormLabel>
                      <Textarea
                       
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="outline" me={2} >
                      Cancel
                    </Button>
                    <Button  colorScheme="teal">
                      Edit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </Box>
          <Image
            
            src={imgUrl}
            alt="View"
            objectFit="inherit"
          />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex">
              {likeStatus ? (
                <Icon
                  
                  
                  color="red"
                  boxSize={8}
                  mt={3}
                  ms={3}
                  className="click"
                />
              ) : (
                <Icon
                  
                 
                  color="black"
                  boxSize={8}
                  mt={3}
                  ms={3}
                  className="click"
                />
              )}
              <Icon
                
                
                
                boxSize={7}
                mt={3}
                ms={3}
                className=" click"
              />
            </Box>
            <Text mt={4} me={4} color="gray.500" fontSize="xs">
              date
            </Text>
          </Box>
          <Text ps={4} pt={3} fontSize="sm">
             Likes
          </Text>
          <Box>
            <Text fontSize="md" px={4} py={1}>
              <span className="font-bold">username</span>{" "}
              <span className="font-light"> - caption </span>
            </Text>
          </Box>
          <Box paddingX="4" marginBottom={4}>
            <Text fontSize="md" pt={0} decoration="underline">
              Comments
            </Text>
            
           
              <Box display="flex" alignItems="center" mt={2}>
                {/* <Form> */}
                {/* <commentInput onClickFn={inputCommentHandler} /> */}
                <Input
                  
                 
                />
                {/* </Form> */}
                <Button
                  
                >
                  Post
                </Button>
              </Box>
            
  
            {/* formik is not defined beacuse the useformik doesn't have variable name */}
            
          </Box>
        </Box>
      </Center>
    );
  };
  
  export default ContentCard;
  