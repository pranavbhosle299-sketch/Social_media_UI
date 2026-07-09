import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostListInfo } from "../store/postListStore";

function Post({ post }) {
  const { deletePost }=useContext(PostListInfo);

  return <div className="card post-card" >
    <div className="card-body">
      <h5 className="card-title">
        {post.title}
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
          <MdDelete onClick={()=>deletePost(post.id)}/>
        </span>
      </h5>
      <p className="card-text">{post.body}</p>
      {post.tags.map((tag) => <span className="badge text-bg-info hashTag" key={tag}>{`#${tag} `}</span>)}
      <div className="alert alert-success reactions" role="alert">
        this post is reacted by {post.reaction} people
      </div>
    </div>
  </div>
}
export default Post;