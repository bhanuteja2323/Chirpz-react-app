import React, { useState, useEffect } from "react";
import Logo from "../Images/Logo.png";
import ProfilePhoto from "../Images/ProfilePicture.png";
import Hamburger from "../Images/Hamburger.png";
import RightMark from "../Images/RightMark.png";
import { fetchUsersRequest } from "../Redux/action";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

interface User {
  userName: string;
  isVerified: boolean;
  caption: string;
  tags: string[];
}

function HomePage() {
  const [userData, setUserData] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  const { Users } = useSelector((state: any) => ({
    Users: state?.userList?.body,
  }));

  useEffect(() => {
    setUserData(Users);
  }, [Users]);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="middle-section">
        <div className="top-section">
          <span />
          <h4 className="home-header">Home</h4>
          <button className="create-btn" onClick={toggleShowModal}>
            Create
          </button>
        </div>
        <div className="bottom-section">
          {userData?.map((user) => (
            <div className="main-content" key={user.userName}>
              <h5 className="user-name">
                {user?.userName}
                {user?.isVerified ? (
                  <img className="right-icon" src={RightMark} alt="RightMark" />
                ) : (
                  ""
                )}
              </h5>
              <p className="message-text">{user?.caption}</p>
              <div className="hash-tag-container">
                {user?.tags?.map((eachTag, index) => (
                  <div className="hash-tags" key={index}>
                    {eachTag}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Modal show={showModal} onCloseButtonClick={toggleShowModal} />
        </div>
      </div>
      <div className="right-section">
        <img src={ProfilePhoto} className="profile-icon" alt="Profile" />
        <h4 className="person-name">Samantha Hardy</h4>
        <img src={Hamburger} className="Hamburger-icon" alt="Hamburger" />
      </div>
    </div>
  );
}

export default HomePage;

