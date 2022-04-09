import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Profile from "./profile";

const MyProfile = () => {
  const authSelector = useSelector((state) => state.auth);
  const [content, setContent] = useState([]);

  const fetchContentUser = async () => {
    try {
      const res = await api.get("/posts", {
        params: {
          _expand: "user",
          userId: authSelector.id,
        },
      });
      setContent(res.data);
      console.log(res.data)
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
      )
    })
  }

  useEffect(() => {
    fetchContentUser()
  }, [])
  return (
    <Box>
      {renderProfile()}
    </Box>
  );
};
export default MyProfile;
