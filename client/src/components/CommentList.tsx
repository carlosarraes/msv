import type { Comments } from "./PostList";

type CommentListProps = {
  comments: Comments[];
};

const CommentList = ({ comments }: CommentListProps) => {
  const checkStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Comment is awaiting moderation";
      case "rejected":
        return "Comment has been rejected";
      default:
        return "";
    }
  };

  const renderedComments = comments.map((comment: Comments) => {
    return (
      <li className="text-xs" key={comment.id}>
        {checkStatus(comment.status) || comment.content}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
