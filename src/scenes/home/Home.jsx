import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../configs/route";
export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user === undefined || user === null) {
      navigate(route.HOME);
    } else {
      if (user.role === "user") {
        navigate(route.USER);
      } else {
        navigate(route.ADMIN);
      }
    }
  }, [navigate, user]);
  return null;
}
