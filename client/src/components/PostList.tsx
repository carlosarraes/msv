import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

type Post = {
  id: string;
  title: string;
  comments: Comments[];
};

export type Comments = {
  id: string;
  content: string;
  status: string;
};

const PostList = () => {
  const [posts, setPosts] = useState<{ [key: string]: Post }>({});

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post: Post) => {
    return (
      <section
        key={post.id}
        className="flex flex-col gap-2 w-full p-2 border border-gray-300 rounded-md shadow-md"
      >
        <h3 className="text-sm font-bold">{post.title}</h3>
        <hr className="w-full" />
        <div className="w-full text-left">
          <CommentList comments={post.comments} />
        </div>
        <hr className="w-full" />
        <CommentCreate postId={post.id} />
      </section>
    );
  });

  return (
    <section className="flex flex-col gap-2 w-1/4 mt-2">
      <div className="flex flex-col gap-2 w-full mt-2 text-center">
        {renderedPosts}
      </div>
    </section>
  );
};

export default PostList;
