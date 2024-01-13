import "../index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import axios from "../api/axios";
const ALL_BLOGS = "/blog/allblogs";

import useAuth from "../hooks/useAuth";

function Blogs() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(ALL_BLOGS, {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer '+auth.accessToken,
          },
          withCredentials: false,
        });
        setTimeout(() => {}, 2000);

        setData(response?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const handleCardClick = (e) => {
    console.log("clicked on card");
    console.log(e.target.id);

    navigate(`/blog/${e.target.id}`);
  };

  return (
    <div className="blogsCards">
      {loading ? (
        <div>loading</div>
      ) : (
        data.map((title) => {
          return (
            title.isPublished && (
              <div
                className="card"
                key={title._id}
                id={title._id}
                onClick={handleCardClick}
              >
                <div className="cardTitle">{title.title}</div>
                <p className="cardcreated">
                  {format(title.added, "MMM dd yyyy")}
                </p>
              </div>
            )
          );
        })
      )}
      {auth.user && auth.admin && (
        <NavLink className="card" to="/addBlog">
          <div>Add Blog</div>
        </NavLink>
      )}
    </div>
  );
}

export default Blogs;
