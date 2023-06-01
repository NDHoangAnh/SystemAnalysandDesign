import { useParams } from "react-router-dom";
import { db } from "../../configs/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  const loadUser = async () => {
    const documentRef = doc(db, "Users", id);
    const documentSnapshot = await getDoc(documentRef);
    setUser(documentSnapshot.data());
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  return user && <div>{user.id}</div>;
};

export default User;
