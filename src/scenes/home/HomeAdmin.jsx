import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AllStaffs from "../allStaffs/AllStaffs";
import AllRooms from "../allRooms/AllRooms";
import AllServices from "../allServices/AllServices";
import ListBooking from "../listBooking/ListBookingAdmin";
import ChangePass from "../changePassword/ChangePass";
import { useNavigate } from "react-router-dom";
import { route } from "../../configs/route";
import { useEffect, useState } from "react";
import User from "../detailUser/User";
import NavBar from "../../components/NavBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function HomeAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hanleLogout = () => {
    localStorage.clear();
    navigate(route.HOME);
  };

  useEffect(() => {
    if (user === undefined || user === null) {
      navigate(route.HOME);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NavBar />
      {user && (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "100vh",
            padding: "10px 10px",
            backgroundColor: "",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Danh sách nhân viên" {...a11yProps(0)} />
            <Tab label="Danh sách phòng" {...a11yProps(1)} />
            <Tab label="Danh sách dịch vụ" {...a11yProps(2)} />
            <Tab label="Danh sách đặt phòng" {...a11yProps(3)} />
            <Tab label="Đổi mật khẩu" {...a11yProps(4)} />
            <Tab label="Thông tin cá nhân" {...a11yProps(5)} />
            <Tab
              label="Đăng xuất"
              {...a11yProps(7)}
              onClick={() => hanleLogout()}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <AllStaffs />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AllRooms />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AllServices />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ListBooking />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ChangePass />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <User />
          </TabPanel>
        </Box>
      )}
    </>
  );
}
