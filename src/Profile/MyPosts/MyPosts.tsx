import React from "react";
import styles from "./MyPosts.module.scss";
import Post from "./Posts/Post";
import { PostsType } from "../../Common/Components/Types/Types";
import { AddPostFormValueType, AddPostFormRedux } from "./AddPostFormValueType";


export type MapPropsType = {
    posts: Array<PostsType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let postsElements = props.posts.map((posts: PostsType) =>
     <Post
        key={posts.id}
        message={posts.message}
        likesCount={posts.likesCount} 
        />);

    let onAddPost = (values: AddPostFormValueType) => {
        return props.addPost(values.newPostText);
    }
    return (
        <div className={styles.postsBlock}>
            <h2>Posts</h2>
            <AddPostFormRedux onSubmit={onAddPost} />
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
}



export default MyPosts