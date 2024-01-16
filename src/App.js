import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    // Gọi API để lấy danh sách bài post
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleAddPost = () => {
    // Gọi API để thêm bài post mới
    axios
      .post("http://localhost:3000/posts", newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        console.log(setPosts);
        setNewPost({ title: "", content: "" });
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  const handleEditPost = () => {
    // Gọi API để sửa bài post
    axios
      .put(`http://localhost:3000/posts/${editPost.id}`, editPost)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post.id === editPost.id ? response.data : post
        );
        setPosts(updatedPosts);
        setEditPost(null);
      })
      .catch((error) => {
        console.error("Error editing post:", error);
      });
  };

  const handleDeletePost = (postId) => {
    // Gọi API để xóa bài post
    axios
      .delete(`http://localhost:3000/posts/${postId}`)
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div>
      {/* Form để thêm bài post mới */}
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>

      {/* Danh sách bài post */}
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
              <button onClick={() => setEditPost(post)}>Edit</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Form để sửa bài post */}
      {editPost && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={editPost.title}
            onChange={(e) =>
              setEditPost({ ...editPost, title: e.target.value })
            }
          />
          <textarea
            placeholder="content"
            value={editPost.content}
            onChange={(e) =>
              setEditPost({ ...editPost, content: e.target.value })
            }
          />
          <button onClick={handleEditPost}>Save Changes</button>
          <button onClick={() => setEditPost(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
