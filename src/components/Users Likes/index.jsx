import api from "../../lib/api";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import Link from "next/link";
const UsersLikes = ({ userId }) => {
  const [UserLikedPost, setUserLikedPost] = useState([]);
  const fetchUserLikes = async () => {
    try {
      const res = await api.get(`/profile/posts/likes/${userId}`);
      // console.log(res.data.result);
      setUserLikedPost(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const renderLikedImage = () => {
    return UserLikedPost.map((val) => {
      return (
        <GridItem>
          <Link href={`/detail-post/${val?.Post?.id}`}>
            <Box
              _hover={{
                cursor: "pointer",
              }}
              px={2}
              mb={2}
            >
              <Image
                key={val.id.toString()}
                w={"100%"}
                h={"200px"}
                objectFit={"cover"}
                src={val?.Post?.image_url}
              />
            </Box>
          </Link>
        </GridItem>
      );
    });
  };
  useEffect(() => {
    fetchUserLikes();
  }, []);

  return <Grid templateColumns="repeat(2, 1fr)">{renderLikedImage()}</Grid>;
};
export default UsersLikes;
