import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { format } from "date-fns";
import "../index.css";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const BLOG = "/blog/";
const ADD_COMMENT = "/comment/add";
const DELETE_COMMENT = "/comment/delete/";

export default function BlogPage() {
  const { id } = useParams();
  const { auth } = useAuth();
  const location = useLocation();

  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [deletedcommentId, setDeletedCommentId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BLOG + id, {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer '+auth.accessToken,
          },
          withCredentials: false,
        });
        setTimeout(() => {}, 4000);
        console.log(JSON.stringify(response));
        setData(response?.data);
        setComments(response?.data?.comments);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [commentId, deletedcommentId]);

  const handleAddComment = async () => {
    const response = await axios.post(
      ADD_COMMENT,
      {
        content: addComment,
        blog: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        withCredentials: false,
      }
    );

    setAddComment("");
    setCommentId(response?.data?.id);
    // navigate(`/blog/${id}`, { replace: true });
  };

  const handleDeleteComment = async (e) => {
    try {
      const response = await axios.post(
        DELETE_COMMENT + e.target.id,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
          withCredentials: false,
        }
      );

      console.log(response);
      setDeletedCommentId(e.target.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="blogPost" key={id}>
      <div className="blogTitle">{data.title}</div>
      <div className="blogContent">{data.content}</div>
      <h3 className="commentHeading">Comments:</h3>
      <div className="Comments">
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <div className="comment">
                {comment.content}
                {auth?.user && auth?.admin && (
                  <button
                    className="deleteComment"
                    id={comment._id}
                    onClick={handleDeleteComment}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="commentAddedTime">
                {format(comment.added, "MMM dd, yyyy")}
              </div>
            </div>
          );
        })}
        {auth?.user ? (
          <div className="addCommentSection">
            <input
              className="addComment"
              onChange={(e) => setAddComment(e.target.value)}
              value={addComment}
            ></input>
            <button className="addCommentButton" onClick={handleAddComment}>
              Add
            </button>
          </div>
        ) : (
          <p>
            Please{" "}
            <NavLink to="/login" state={{ from: location }} replace>
              Login
            </NavLink>{" "}
            to add Comment
          </p>
        )}
      </div>
      {/* <div className='Comments'>{JSON.stringify(data.comments[0])} </div> */}
    </div>
  );
}
