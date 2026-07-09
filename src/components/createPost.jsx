import { useContext,useRef } from "react";
import { PostListInfo } from "../store/postListStore";


function CreatePost() {
  const {addPost}=useContext(PostListInfo);
  let userIdElement=useRef();
  let TitleElement=useRef();
  let ContentElement=useRef();
  let ReactionsElement=useRef();
  let TagsElement=useRef();

  const handleSubmit=(event)=>{
    event.preventDefault();
    const userId=userIdElement.current.value;
    const Title=TitleElement.current.value;
    const Content=ContentElement.current.value;
    const Reactions=ReactionsElement.current.value;
    const TagsString=TagsElement.current.value.split(/\s+/);
    addPost(userId,Title,Content,Reactions,TagsString);
    userIdElement.current.value="";
    TitleElement.current.value=""
    ContentElement.current.value=""
    ReactionsElement.current.value=""
    TagsElement.current.value=""
  }

  return <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="UserID" className="form-label">UserName</label>
      <input ref={userIdElement}type="text" className="form-control" id="UserID" placeholder="Enter UserName" />
    </div>
    <div className="mb-3">
      <label htmlFor="Title" className="form-label">Post Title</label>
      <input ref={TitleElement}type="text" className="form-control" id="Title" placeholder="Enter Title For Your Post" />
    </div>
    <div className="mb-3">
      <label htmlFor="Body" className="form-label">Content</label>
      <textarea ref={ContentElement} rows={4} type="text" className="form-control" id="Body" placeholder="enter the content here" />
    </div>
    <div className="mb-3">
      <label htmlFor="Reactions" className="form-label">Number Of Reactions</label>
      <input ref={ReactionsElement} type="text" className="form-control" id="Reactions" placeholder="How Mnay People Have Reacted To This Post" />
    </div>
    <div className="mb-3">
      <label className="form-label" htmlFor="Tags">Tags</label>
      <input ref={TagsElement} type="text" className="form-control" id="Tags" placeholder="enter tags" />
    </div>
    <button type="submit" className="btn btn-primary">post</button>
  </form>
}
export default CreatePost;