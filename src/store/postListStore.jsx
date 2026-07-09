import { createContext, useReducer } from "react";

export const PostListInfo = createContext({
    postList: [],
    addPost: () => { },
    deletePost: () => { }
});

const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if (action.type === "DELETE_POST") {
        newPostList = currPostList.filter((post) => {
            return post.id !== action.payload.postID;
        })
    }
    else if (action.type === "ADD_POST") {
        newPostList = [...currPostList, {
            id: action.payload.userId,
            title: action.payload.Title,
            body: action.payload.Content,
            reaction: action.payload.Reactions,
            tags: action.payload.TagsString,
            userID: action.payload.userId
        }]
    }
    return newPostList;
};

const PostListInfoProvider = ({ children }) => {
    const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POSTLIST);

    const addPost = (userId, Title, Content, Reactions, TagsString) => {
        dispatchPostList({
            type: "ADD_POST",
            payload: {
                id,
                userId,
                Title,
                Content,
                Reactions,
                TagsString
            }
        });
    };
    const deletePost = (postID) => {
        const action = {
            type: "DELETE_POST",
            payload: {
                postID: postID
            }
        };
        dispatchPostList(action);
    };
    return <PostListInfo.Provider value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost
    }}>{children}</PostListInfo.Provider>
};

const DEFAULT_POSTLIST = [{
    id: "1",
    title: "Going To College",
    body: "hello dosto mai apne college jaa raha hu,mera college mere ghar se boht door hai.",
    reaction: 2,
    tags: ["travelling", "study"],
    userID: "user-9"
},
{
    id: "2",
    title: "Going To Pune",
    body: "chalo bhailog mai pune ja rha huu ghumne ke liye kon kon ana chahta hai batao jaldi .",
    reaction: 4,
    tags: ["travelling", "Food"],
    userID: "user-10"
}
]
export default PostListInfoProvider;