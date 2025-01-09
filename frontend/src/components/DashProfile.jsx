import { TextInput, Button, Modal, Alert } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

const DashProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    console.log("Uploading...");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async (e) => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/signup");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />

        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />

        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-6">
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes, I&apos;m sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancle
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
      {/* {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )} */}
    </div>
  );
};

export default DashProfile;
