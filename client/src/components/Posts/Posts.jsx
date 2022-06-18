import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import Post from "../Post/Post";
import "./Posts.css";

const Posts = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
