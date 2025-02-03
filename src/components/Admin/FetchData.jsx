import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/FirebaseDB";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const FetchData = ({
  data,
  fetchData,
  setEditBlog,
  setEditButtonClicked,
  setHideAndShowDisplay,
}) => {
  const [show, setShow] = useState(false);
  const [delteId, setDelteId] = useState(null);
  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setDelteId(id);
    setShow(true);
  };
  const handleEdit = (id) => {
    let singleData = data.filter((e) => e.id === id);
    setEditBlog(singleData);
    setEditButtonClicked(true);
    setHideAndShowDisplay(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    handleClose();
    try {
      // Reference to the document in Firestore
      const docRef = doc(db, "blogs", delteId);
      await deleteDoc(docRef); // Delete the document
    } catch (error) {
      alert("Failed to delete the document.");
    }

    fetchData();
  };
  return (
    <>
      <div className="container mt-5 px-5 ">
        <h2 className="container text-center mb-5 border  shadow p-3  bg-body rounded">
          BLOGS DATA
        </h2>
        <table className="table table-bordered table-hover border-dark ">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                  <button
                    className="btn btn-primary px-4"
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleShow(item.id)}>
                    Delete
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete blog data?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleDelete}>
                        OK
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FetchData;
