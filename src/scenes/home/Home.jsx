import HomeAdmin from "./HomeAdmin";
import HomeUser from "./HomeUser";
export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role === "user") return <HomeUser />;
  else return <HomeAdmin />;

  // const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   if (user === null) {
  //     navigate("/login");
  //   } else {
  //     if (user.role === "user") {
  //       navigate("/home-user");
  //     } else {
  //       navigate("/home-admin");
  //     }
  //   }
  // }, [navigate, user]);

  // return null;
}
