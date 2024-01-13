import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ADD_BLOG = "/blog/create";

function AddBlog() {
  const editorRef = useRef(null);
  const [published, setpublished] = useState(false);
  const [title, setTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const log = async () => {
    if (editorRef.current) {
      if (title === "") {
        setErrMsg("Title Required");
      } else {
        try {
          const response = await axios.post(
            ADD_BLOG,
            {
              title: title,
              content: editorRef.current.getContent(),
              isPublished: published,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.accessToken,
              },
              withCredentials: false,
            }
          );

          console.log(response?.data?.id);
          navigate("/", { replace: true });
        } catch (error) {
          console.log(error);
        }
      }

    }
  };

  const handlePublishedClick = (e) => {
    console.log(e.target.checked);

    setpublished(e.target.checked);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="blogEditor">
      <div className="title-blog">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <input
          className="blog-title"
          name="blogTitle"
          id="blogTitle"
          placeholder="Enter your Title"
          required
          onChange={handleTitleChange}
          value={title}
        ></input>
      </div>
      <Editor
        apiKey="tkfg8v7vg8ij9seirnu24bdkf7fu2enrwkl16tact06wuuw9"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 600,
          menubar: false,
          placeholder: "Your Blog Content",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}
      />
      <div className="publish">
        <label htmlFor="publication" className="publishLabel">
          Publish
        </label>
        <input
          type="checkbox"
          id="publication"
          name="publication"
          onClick={handlePublishedClick}
        />
      </div>

      <br></br>
      <button className="createBlogButton" onClick={log}>
        Create Blog
      </button>
    </div>
  );
}

export default AddBlog;
