import api from "../../lib/api";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import Link from "next/link";
const UsersPosts = ({ userId }) => {
  const [UsersPosts, setUsersPosts] = useState([]);
  const fetchUsersPosts = async () => {
    try {
      const res = await api.get("/post/postsWithoutPageAndLimit", {
        params: {
          user_id: userId,
        },
      });
      console.log(res.data.result.rows);
      setUsersPosts(res.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };
  const renderImage = () => {
    return UsersPosts.map((val) => {
      return (
        <GridItem>
          <Link href={`/detail-post/${val.id}`}>
            <Box
              _hover={{
                cursor: "pointer",
              }}
              px={2}
              mb={2}
            >
              <Image
                w={"100%"}
                h={"200px"}
                objectFit={"cover"}
                key={val.id.toString()}
                src={val.image_url}
              />
            </Box>
          </Link>
        </GridItem>
      );
    });
  };
  useEffect(() => {
    fetchUsersPosts();
  }, []);

  return <Grid templateColumns="repeat(2, 1fr)">{renderImage()}</Grid>;
};
export default UsersPosts;
