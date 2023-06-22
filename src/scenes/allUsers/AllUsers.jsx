// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ModalAdd from "../../components/ModalAdd";
// import ModalDetail from "../../components/ModalDetail";
// import ModalEdit from "../../components/ModalEdit";
// const { useState, useEffect } = require("react");

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const userCollection = collection(db, "Users");

//   // const loadUsers = async () => {
//   //   const userSnapShot = await getDocs(userCollection);
//   //   setUsers(userSnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   // };

//   // modal add
//   const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
//   const closeModalAdd = () => {
//     setIsOpenModalAdd(false);
//   };
//   const openModalAdd = () => {
//     setIsOpenModalAdd(true);
//   };

//   // const createNewUser = async (data) => {
//   //   await addDoc(userCollection, { name: data.name, email: data.email });
//   //   setIsOpenModalAdd(false);
//   //   await loadUsers();
//   //   toast.success("Add user successfully");
//   // };

//   // modal detail
//   const [detailUser, setDetailUser] = useState({});

//   const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);

//   const closeModalDetail = () => {
//     setIsOpenModalDetail(false);
//   };
//   const openModalDetail = () => {
//     setIsOpenModalDetail(true);
//   };

//   // const getDetailUser = async (user) => {
//   //   const documentRef = doc(db, "Users", user?.id);
//   //   const documentSnapshot = await getDoc(documentRef);
//   //   setDetailUser(documentSnapshot.data());
//   // };

//   // const handleDetailUser = (user) => {
//   //   openModalDetail();
//   //   getDetailUser(user);
//   // };
//   //

//   // modal edit
//   const [userEdit, setUserEdit] = useState({});

//   const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

//   const closeModalEdit = () => {
//     setIsOpenModalEdit(false);
//   };
//   const openModalEdit = () => {
//     setIsOpenModalEdit(true);
//   };
//   // const handleEditUser = (user) => {
//   //   openModalEdit();
//   //   setUserEdit(user);
//   // };

//   // const editUser = async (user) => {
//   //   const userDoc = doc(db, "Users", userEdit.id);
//   //   const newFields = { name: user.name, email: user.email };
//   //   await updateDoc(userDoc, newFields);
//   //   setIsOpenModalEdit(false);
//   //   await loadUsers();
//   //   toast.warning("Edit successfully");
//   // };
//   //

//   // delete
//   // const handleDeleteUser = async (user) => {
//   //   const userDoc = doc(db, "Users", user?.id);
//   //   await deleteDoc(userDoc);
//   //   await loadUsers();
//   //   toast.error("Delete successfully");
//   // };
//   //

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   return (
//     <div>
//       <ToastContainer />
//       {/* <ModalAdd
//         isOpenModalAdd={isOpenModalAdd}
//         createNewUser={createNewUser}
//         closeModalAdd={closeModalAdd}
//         modalUser={true}
//       />

//       <ModalDetail
//         isOpenModalDetail={isOpenModalDetail}
//         closeModalDetail={closeModalDetail}
//         detailUser={detailUser}
//         modalDetailUser={true}
//       />

//       <ModalEdit
//         isOpenModalEdit={isOpenModalEdit}
//         closeModalEdit={closeModalEdit}
//         userEdit={userEdit}
//         modalEditUser={true}
//         editUser={editUser}
//       /> */}

//       {/* <button onClick={() => openModalAdd()}>Add</button> */}
//       {users &&
//         users.map((user, index) => (
//           <div key={index}>
//             <div>Email: {user.email}</div>
//             <div>Name: {user.name}</div>
//             {/* <div>Id: {user.id}</div> */}
//             <div>
//               {/* <button onClick={() => handleEditUser(user)}>Edit</button>
//               <button onClick={() => handleDetailUser(user)}>Detail</button>
//               <button onClick={() => handleDeleteUser(user)}>Delete</button> */}
//             </div>
//           </div>
//         ))}

//       {!users && <div>Loading</div>}
//     </div>
//   );
// };

// export default AllUsers;
