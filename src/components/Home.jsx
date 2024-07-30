import { useEffect } from "react";
import { GetUsers } from "../api/getRequest";
import EditUser from "./EditUser";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { DeleteUser } from "../api/deleteRequest";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import DeleteModal from "./DeleteModal";
import useGetUser from "../hooks/GetUser";

const Home = () => {
  const {
    isModalOpen,
    editedItem,
    openModal,
    openDeleteModal,
    closeDeleteModal,
    users,
    setUsers,
    handleSortUsers,
    handleSortUsersButtons,
  } = useGlobalContext();

  // const { user , fetchUsers } = useGetUser();

  const fetchUsers = async () => {
    const response = await GetUsers();
    setUsers(response);
  };

  const resetSortedData = async () => {
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [isModalOpen]);

  const deleteUser = async (userId) => {
    await DeleteUser(userId);
    fetchUsers();
    toast.success("User deleted successfully!", {
      autoClose: 1000,
    });
    closeDeleteModal();
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-white my-3">User List</h1>
        <select className="px-6 py-2 mb-3 rounded" onChange={handleSortUsers}>
          <option value="A-Z">A-Z Fullname</option>
          <option value="Z-A">Z-A Fullname</option>
          <option value="Low-to-High">Low To High Age</option>
          <option value="High-to-Low">High To Low Age</option>
        </select>

        <div className="mb-3">
          <button
            className="btn btn-primary"
            onClick={() => handleSortUsersButtons("A-Z")}
          >
            A-Z Fullname
          </button>
          <button
            className="btn btn-info mx-2"
            onClick={() => handleSortUsersButtons("Z-A")}
          >
            Z-A Fullname
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleSortUsersButtons("Low-to-High")}
          >
            Low To High Age
          </button>
          <button
            className="btn btn-warning mx-2"
            onClick={() => handleSortUsersButtons("High-to-Low")}
          >
            High To Low Age
          </button>
          <button className="btn btn-danger" onClick={resetSortedData}>
            Reset Sort
          </button>
        </div>

        <table className="table table-striped w-75 fs-4">
          <thead>
            <tr>
              <th>S.No</th>
              <th>FullName</th>
              <th>Age</th>
              <th>Email</th>
              <th>Position</th>
              <th>Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => openModal(user)}
                  >
                    Modal
                  </button>
                  <Link
                    className="btn btn-primary"
                    to={`${ROUTER.UpdateUser}/${user.id}`}
                  >
                    Page
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => openDeleteModal(user)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-info text-white"
                    to={`${ROUTER.Detail}/${user.id}`}
                  >
                    Info
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editedItem && <EditUser />}
        <DeleteModal deleteUser={deleteUser} />
      </div>
    </>
  );
};

export default Home;
