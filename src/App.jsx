import Header from "./components/header"
import Footer from "./components/footer"
import Sidebar from "./components/sidebar"
import CreatePost from "./components/createPost"
import PostList from "./components/postList"
import './App.css'
import { useState } from "react"
import PostListInfoProvider from "./store/postListStore"

function App() {
  const [selectedTab, setSelectedTab] = useState("Home")
  return <PostListInfoProvider>
    <div className="app-container">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Sidebar>
      <div className="content">
        <Header></Header>
        <div className="post-list">
        {selectedTab === "Home" ? <PostList></PostList> : <CreatePost></CreatePost>}
        </div>
        <Footer></Footer>
      </div>
    </div>
  </PostListInfoProvider>

}
export default App