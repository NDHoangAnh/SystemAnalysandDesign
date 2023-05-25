import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
const { useState, useEffect } = require("react");

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const userCollection = collection(db, "Users");
    const userSnapShot = await getDocs(userCollection);
    setUsers(userSnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    users &&
    users.map((user, index) => (
      <div key={index}>
        <div>Email: {user.email}</div>
        <div>Name: {user.name}</div>
        <div>Role: {user.role}</div>
      </div>
    ))
  );
};

export default AllUsers;
