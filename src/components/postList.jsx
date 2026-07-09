import Post from "./post";
import { useContext } from "react";
import { PostListInfo } from "../store/postListStore";

function PostList() {
    const { postList } = useContext(PostListInfo);

    return <>
        {postList.map((post) => {
            return <Post key={`${post.userID}${post.id}`} post={post}/>
            
        })}

    </>
}
export default PostList;