import { useEffect, useState } from "react";
import { getAllRooms } from "../../apis";
import { Box } from "@mui/material";
import Room from "../../containers/room/Room";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { route } from "../../configs/route";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [listRoom, setListRoom] = useState([]);
  const loadRooms = async () => {
    const result = await getAllRooms();
    setListRoom(result);
  };

  useEffect(() => {
    if (!user) {
      loadRooms();
    } else if (user.role === "user") {
      navigate(route.USER);
    } else navigate(route.ADMIN);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <NavBar />
      <Box sx={{ ml: "2%", mt: "3%" }}>
        {listRoom.length > 0 &&
          listRoom.map((room, index) => (
            <Room homepage={true} room={room} key={index} />
          ))}
      </Box>
    </>
  );
}

export default HomePage;
