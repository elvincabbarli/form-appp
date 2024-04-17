// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../store/postSlice";

const Main = () => {

  const dispatch = useDispatch();
  const { postsAll } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className="main-cont">
      <h2>All Posts</h2>
      <div>
        <ul className="main-posts">
          {postsAll.map((post, index) => (
            <li className="singlePost" key={index}>
              <h3>{post.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <p>Category: {post.category_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;

