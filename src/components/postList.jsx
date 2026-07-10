import Post from "./post";
import { useContext } from "react";
import { PostListInfo } from "../store/postListStore";
import WelcomeMSG from "./welcomeMSG";
import Loader from "./loader";

function PostList() {
    const { postList,fetching } = useContext(PostListInfo);
    

    return <>
        {fetching===true?<Loader/>:(postList.length === 0 ? <WelcomeMSG /> : postList.map((post) => {
            return <Post key={`${post.userID}${post.id}`} post={post} />

        }))}

    </>
}
export default PostList;