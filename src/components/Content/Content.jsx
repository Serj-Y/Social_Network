import React from "react";
import "./Content.module.css"
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Content = (props) => {
    return <div>
        <ProfileInfo />
        <MyPostsContainer store={props.store} />
    </div>
}
export default Content