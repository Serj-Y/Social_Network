import React from "react";
import { reduxForm } from "redux-form";
import { Textarea } from "../../Common/FormsControls/FormsControls";
import { maxLengthCreator, minLengthCreator, required } from "../../Common/Validators/Validators";
import s from "./MyPosts.module.css";
import Post from "./Posts/Post";
import { CreateFields } from "../../Common/FormsControls/FormsControls";
import { PostsType } from "../../Common/Types/Types";

const maxLength = maxLengthCreator(50);
const minLength = minLengthCreator(2);

type PropsType = {
    // Bad solution 
    [x: string]: any;
    // Fix it !!!!!!!!!!
}



let AddPostForm = (props: { handleSubmit: React.FormEventHandler<HTMLFormElement> }) => {
    return (
        <form onSubmit={props.handleSubmit} >
            {CreateFields("Enter your post-message", "newPostText", [required, maxLength, minLength], Textarea)}
            <button>Post</button>
        </form>
    )
}
let AddPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(AddPostForm)


const MyPosts: React.FC<PropsType> = (props) => {

    let postsElements = props.posts.map((posts: PostsType) => <Post
        key={posts.id}
        message={posts.message}
        likesCount={posts.likesCount} />);

    let onAddPost: React.FC<PropsType> = (values) => {
        return props.addPost(values.newPostText);
    }
    return (
        <div className={s.postsBlock}>
            <h2>Posts</h2>
            <AddPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}



export default MyPosts