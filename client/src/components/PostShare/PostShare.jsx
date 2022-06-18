import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import "./PostShare.css";
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const serverPublic =
  process.env.REACT_APP_PUBLIC_FOLDER || "http://localhost:4000/images/";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const desc = useRef();
  const imageRef = useRef();

  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch();

  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(newPost));
    resetShare();
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input type="text" placeholder="What's happening" ref={desc} required />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes
              onClick={() => setImage(null)}
              style={{
                padding: "1px",
                color: "white",
                backgroundColor: "grey",
                borderRadius: "50%",
                opacity: "60%",
              }}
            />
            <img src={URL.createObjectURL(image)} alt="preview" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
