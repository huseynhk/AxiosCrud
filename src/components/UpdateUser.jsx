import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { Button } from "react-bootstrap";
import { EditUsers } from "../api/editRequst";
import { GetSingleUser } from "../api/getRequest";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  position: "",
};

const UpdateUser = () => {
  const { inputRef, setFocus, loading, setLoading } = useGlobalContext();
  const [editedUser, setEditedUser] = useState(initialState);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await GetSingleUser(userId);
    setEditedUser(response);
  };

  const handleEditUser = async () => {
    setLoading(true);
    await EditUsers(userId, editedUser);
    setEditedUser(initialState);
    toast.success("User added successfully!", {
      autoClose: 1000,
    });
    setLoading(false);
    setTimeout(() => {
      navigate(ROUTER.Home);
    }, 1500);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchUser();
    setFocus();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <h1 className="text-white my-4">Edit User</h1>
      <div className="bg-dark-subtle w-50 text-center rounded  border border-primary">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleInputChange}
            className="p-2 w-75 my-2 border border-primary rounded"
            ref={inputRef}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            name="position"
            value={editedUser.position}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={editedUser.age}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>

        <Button className="m-2 px-4" onClick={handleEditUser}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateUser;
