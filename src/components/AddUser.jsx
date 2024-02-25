import  { useState, useEffect } from "react";
import { AddUsers } from "../api/addRequest";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  position: "",
};

const AddUser = () => {
  const { inputRef, setFocus } = useGlobalContext();
  const [newUser, setNewUser] = useState(initialState);
  const navigate = useNavigate();

  const handleAddUser = async () => {
    await AddUsers(newUser);
    setNewUser(initialState);
    toast.success("User added successfully!", {
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate(ROUTER.Home);
    }, 1500);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  useEffect(() => {
    setFocus();
  }, []);


  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column ">
        <h1 className="text-white my-4">Add User</h1>
        <div className="bg-dark-subtle w-50 text-center rounded  border border-primary">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={newUser.fullName}
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
              value={newUser.email}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={newUser.position}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={newUser.age}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>

          <Button className="my-3 px-5 py-2 fs-5" onClick={handleAddUser}>
            Add User
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddUser;
