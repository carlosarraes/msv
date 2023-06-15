import { useState } from "react";
import axios from "axios";

type CommentCreateProps = {
  postId: string;
};

const CommentCreate = ({ postId }: CommentCreateProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
      <label htmlFor="content" className="text-sm">
        New Comment
      </label>
      <input
        name="content"
        id="content"
        type="text"
        className="border border-gray-300 rounded-md p-1 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="p-1 bg-blue-500 rounded-md text-sm text-white hover:bg-blue-700 duration-150 cursor-pointer w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentCreate;
