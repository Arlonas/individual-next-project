import { Spinner,useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Content from "../../components/ContentCard";
import { axiosInstance } from '../../components/Configs/api'

const HomePage = () => {
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
             imageUrl={val.imgae_url}
             likes={val.likes}
             caption={val.caption}
            />
          )
        })
    }    
    
    useEffect(() => {
       fetchContent()
    }, [])
        return (
             <Box>
                 {isLoading ? <Spinner /> : null}
             </Box>
        )
}

export default HomePage