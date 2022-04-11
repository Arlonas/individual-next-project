import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Profile from "./profile";

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth);
  const [content, setContent] = useState([]);
  console.log(authSelector.id);
  //  fetch user biar gosah di map
  // yang perlu di map photonya aja

  const fetchContentUser = async () => {
    try {
      const res = await api.get("/posts", {
        params: {
          _expand: "user",
          userId: authSelector.id,
        },
      });
      setContent(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const renderProfile = () => {
    return content.map((val) => {
      return (
        <Profile
          backgroundProfilePicture={val.user.background_profile_picture}
          profilePicture={val.user.profile_picture}
          username={val.user.username}
          fullName={val.user.full_name}
          email={val.user.email}
          biography={val.user.bio}
          imageUrl={val.image_url}
        />
      );
    });
  };

  useEffect(() => {
    fetchContentUser();
  }, []);
  return <Box>{renderProfile()}</Box>;
};
export default MyProfile;
