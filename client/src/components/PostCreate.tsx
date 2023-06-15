import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("http://posts.com/posts/create", { title });

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-1/4 mt-2">
      <label htmlFor="title" className="text-sm">
        Title of the post
      </label>
      <input
        name="title"
        id="title"
        type="text"
        value={title}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="p-2 bg-green-500 rounded-md text-white hover:bg-green-700 duration-150 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default PostCreate;
