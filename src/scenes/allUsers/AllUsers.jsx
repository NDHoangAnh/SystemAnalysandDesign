import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { db } from "../../configs/firebase";
import ModalAdd from "../../components/ModalAdd";
import ModalDetail from "../../components/ModalDetail";
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

  // modal detail
  const [detailUser, setDetailUser] = useState({});

  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);

  const closeModalDetail = () => {
    setIsOpenModalDetail(false);
  };
  const openModalDetail = () => {
    setIsOpenModalDetail(true);
  };

  const getDetailUser = async (user) => {
    const documentRef = doc(db, "Users", user?.id);
    const documentSnapshot = await getDoc(documentRef);
    setDetailUser(documentSnapshot.data());
  };

  const handleDetailUser = (user) => {
    openModalDetail();
    getDetailUser(user);
  };
  //

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

      <ModalDetail
        isOpenModalDetail={isOpenModalDetail}
        closeModalDetail={closeModalDetail}
        detailUser={detailUser}
        modalDetailUser={true}
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
              <button onClick={() => handleDetailUser(user)}>Detail</button>
              <button>Delete</button>
            </div>
          </div>
        ))}

      {!users && <div>Loading</div>}
    </div>
  );
};

export default AllUsers;
