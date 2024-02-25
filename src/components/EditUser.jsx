import  { useState } from "react";
import { EditUsers } from "../api/editRequst";
import { Modal, Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../contexts/GlobalContext";

const EditUser = () => {
  const { isModalOpen, editedItem, closeModal } = useGlobalContext();
  const [editedUser, setEditedUser] = useState(editedItem);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const updateUser = async () => {
    await EditUsers(editedUser.id, editedUser);
    closeModal();
  };

  return (
    <div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={editedUser.fullName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={editedUser.position}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={editedUser.age}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <Button variant="primary" className="py-2 px-5" onClick={updateUser}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUser;
