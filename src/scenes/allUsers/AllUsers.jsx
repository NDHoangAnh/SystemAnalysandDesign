import { collection, getDocs, addDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { db } from "../../configs/firebase";
import ModalAdd from "../../components/ModalAdd";
const { useState, useEffect } = require("react");

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const userCollection = collection(db, "Users");

  const loadUsers = async () => {
    const userSnapShot = await getDocs(userCollection);
    setUsers(userSnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // modal add
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const closeModalAdd = () => {
    setIsOpenModalAdd(false);
  };
  const openModalAdd = () => {
    setIsOpenModalAdd(true);
  };

  const createNewUser = async (data) => {
    await addDoc(userCollection, { name: data.name, email: data.email });
    setIsOpenModalAdd(false);
    await loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <ModalAdd
        isOpenModalAdd={isOpenModalAdd}
        createNewUser={createNewUser}
        closeModalAdd={closeModalAdd}
        modalUser={true}
      />
      <button onClick={() => openModalAdd()}>Add</button>
      {users &&
        users.map((user, index) => (
          <div key={index}>
            <div>Email: {user.email}</div>
            <div>Name: {user.name}</div>
            <div>Role: {user.role}</div>
            <div>
              <button>
                <NavLink to={`user/${user.id}`}>Edit</NavLink>
              </button>
              <button>Detail</button>
              <button>Delete</button>
            </div>
          </div>
        ))}

      {!users && <div>Loading</div>}
    </div>
  );
};

export default AllUsers;
