import { Box, Spinner, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Content from "../../components/ContentCard";
import { axiosInstance } from '../../components/Configs/api'

const HomePage = () => {
// bikin content dulu aja jadi pas udh login bisa create bisa delete bisa edit 
// create 
    // The content should have the following data:
    // 1. Media (image)
    // 2. Caption
    // 3. Created Date
    // 4. Number of likes
// Edit post caption 
// delete post
// userprofile 
// comments like
// <Avatar src={"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} />
 const [isLoading, setIsLoading] = useState(false)
 const [content, setContent] = useState([])

 const toast = useToast()

 const fetchContent = () => {
     setIsLoading(true)

    setTimeout(() => {
        axiosInstance.get("/posts" , {
             params: {
                 _expand: "user"
             }
         })
         .then((res) => {
            setContent(res.data)
         })
         .catch((err) => {
             toast({
                title: 'Failed to fetch data',
                description: "There is an error in server data",
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "top"
             })
         })
         .finally(() => {
             setIsLoading(false)
         })
        }, 2000)
     }
     
     const renderContent = () => {
        return content.map((val) => {
            return (
            <Content 
             username={val.user.username}
             location={val.location}
             imageUrl={val.image_url}
             likes={val.likes}
             caption={val.caption}
             profilePicture={val.user.profile_picture}
            />
          )
        })
    }    
    
    useEffect(() => {
       fetchContent()
    }, [])
        return (
             <Box>
                 <Stack alignItems={"center"}>
                     {isLoading ? <Spinner /> : null}
                 </Stack>
                 <Stack mb={"-0.5"}>
                     {renderContent()}
                 </Stack>
             </Box>
        )
}

export default HomePage

