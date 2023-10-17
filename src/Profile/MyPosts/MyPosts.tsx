import React from "react";
import styles from "./MyPosts.module.scss";
import Post from "./Posts/Post";
import { PostsType } from "../../Common/Components/Types/Types";
import { AddPostFormValueType, AddPostFormRedux } from "./AddPostForm";

export type MapPropsType = {
  posts: Array<PostsType>;
};

export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  const postsElements = props.posts.map((posts: PostsType) => (
    <Post
      key={posts.id}
      message={posts.message}
      likesCount={posts.likesCount}
    />
  ));

  const onAddPost = (values: AddPostFormValueType) => {
    return props.addPost(values.newPostText);
  };
  return (
    <div className={styles.postsBlock}>
      <AddPostFormRedux onSubmit={onAddPost} />
      <div className={styles.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
