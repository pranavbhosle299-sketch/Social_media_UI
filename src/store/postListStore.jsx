import { act, useEffect, useState } from "react";
import { createContext, useReducer } from "react";

export const PostListInfo = createContext({
    postList: [],
    fetching: "",
    addPost: () => { },
    deletePost: () => { },
    addInitialPost: () => { }
});




const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if (action.type === "DELETE_POST") {
        newPostList = currPostList.filter((post) => {
            return post.id !== action.payload.postID;
        })
    }
    else if (action.type === "ADD_INITIAL_POST") {
        newPostList = action.payload.postsArray;
    }
    else if (action.type === "ADD_POST") {
        newPostList = [action.payload, ...currPostList]
    }
    return newPostList;
};

const PostListInfoProvider = ({ children }) => {
    const [postList, dispatchPostList] = useReducer(postListReducer, []);
    const [fetching, setFetching] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setFetching(true);
        fetch('https://dummyjson.com/posts', { signal })
            .then(res => res.json())
            .then((obj) => {
                addInitialPost(obj.posts);
                setFetching(false);
            });
        return () => {
            controller.abort();
        };
    }, []);


    const addPost = (userId, Title, Content, Reactions, TagsString) => {
        dispatchPostList({
            type: "ADD_POST",
            payload: {
                id: Date.now(),
                title: Title,
                body: Content,
                reaction: Reactions,
                tags: TagsString,
                userId: userId
            }
        });
    };
    const addInitialPost = (postsArray) => {
        dispatchPostList({
            type: "ADD_INITIAL_POST",
            payload: {
                postsArray: postsArray
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
        fetching: fetching,
        addPost: addPost,
        deletePost: deletePost,
        addInitialPost: addInitialPost
    }}>{children}</PostListInfo.Provider>
};


export default PostListInfoProvider;