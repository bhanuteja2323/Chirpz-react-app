import React, { useEffect, useState } from "react";
import "../App.css";
import Close from "../Images/Close.png";
import { useDispatch, useSelector } from "react-redux";
import { postRequest, fetchUsersRequest } from "../Redux/action";

interface ModalProps {
  show: boolean;
  onCloseButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onCloseButtonClick }) => {
  const [tag, setTag] = useState<string>("");
  const [hashTagList, setHashTagList] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");

  const { ApiInfo } = useSelector((state: any) => ({
    ApiInfo: state?.userList?.[0]?.message,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (ApiInfo === "Creation succcessful") dispatch(fetchUsersRequest());
  }, [ApiInfo]);

  if (!show) {
    return null;
  }

  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCaption(inputValue);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTag(inputValue);
  };

  const handleAddHashTag = () => {
    const x = [...hashTagList];
    x.push("#" + tag);
    setHashTagList(x);
    setTag("");
  };

  const handlePostComments = () => {
    const postData = {
      userName: "Samantha Hardy",
      caption: caption,
      tags: hashTagList,
      isVerified: true,
    };

    dispatch(postRequest(postData));
    onCloseButtonClick();
  };

  return (
    <div className="modal-wrapper">
      <div>
        <div className="modal-top-header">
          <h3>
            Create <span className="span-text"> Chirpz </span>
          </h3>
          <img
            src={Close}
            alt="close"
            className="close-icon"
            onClick={onCloseButtonClick}
          />
        </div>
        <div className="comment-hashtag-container">
          <div className="comment-create">
            <h3 className="label-text">Create</h3>
            <input
              placeholder="What's on your mind?"
              type="text"
              className="input-style"
              value={caption}
              onChange={handleCaptionChange}
            />
          </div>

          <div className="comment-create">
            <h3 className="label-text">Add Tags</h3>
            <div className="input-add-btn">
              <input
                id="tag"
                placeholder="Write Tags"
                type="text"
                className="input-style"
                value={tag}
                onChange={handleTagChange}
              />
              {tag.trim() !== "" && (
                <button
                  className="create-btn add-hashtag-btn"
                  onClick={handleAddHashTag}
                >
                  Add
                </button>
              )}
            </div>
            <div className="hash-tag-container">
              {hashTagList?.map((eachTag, index) => (
                <div className="hash-tags" key={index}>
                  {eachTag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="create-btn" onClick={handlePostComments}>
          Create
        </button>
        <button className="create-btn cancle-btn" onClick={onCloseButtonClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
