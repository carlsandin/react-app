import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import { FaImage, FaTelegramPlane } from "react-icons/fa";
import "./Form.css";

const Form = () => {
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const [postData, setPostData] = useState({
    creator: currUser.username,
    message: "",
    selectedFile: "",
  });
  const [noMessage, setNoMessage] = useState(false);
  const dispatch = useDispatch();
  const resetImg = () => {
    setPostData({ ...postData, selectedFile: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (postData.message === "") {
      setNoMessage(true);
    } else {
      dispatch(createPost(postData));
      setPostData({ ...postData, message: "", selectedFile: "" });
      setNoMessage(false);
    }
  };
  return (
    <div className="form_container">
      <form
        className="input_container"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <textarea
          className={noMessage ? "form_input no_message" : "form_input"}
          name="message"
          placeholder="Message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <img className="img_preview" src={postData.selectedFile} alt="" />
        {postData.selectedFile !== "" ? (
          <div className="reset_img" onClick={resetImg}>
            x
          </div>
        ) : null}
        <div className="form_lower">
          <div className="file_input">
            <FileBase
              className="choose_file"
              type="file"
              name="file"
              accept="image/*"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
            <div className="upload">
              <FaImage className="file_icon" />
              <label htmlFor="file" className="file_btn">
                Image
              </label>
            </div>
          </div>
          <div className="form_submit" onClick={handleSubmit}>
            <FaTelegramPlane className="submit_icon" />
            <button className="form_btn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
