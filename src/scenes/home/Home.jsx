import HomeAdmin from "./HomeAdmin";
import HomeUser from "./HomeUser";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role === "user") return <HomeUser />;
  else return <HomeAdmin />;
}
