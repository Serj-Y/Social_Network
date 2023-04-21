import React from "react";
import Post from "./Posts/Post";
import s from "./MyPosts.module.css"

const MyPosts = (props) => {
    let postsElements = props.posts.map(posts => <Post
        message={posts.message}
        id={posts.id}
        likesCount={posts.likesCount} />);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return <div className={s.postsBlock}>
        <h2>Snizu mojno napisati tvoio nahui nikomu ne nujnoe mnenie</h2>
        <div>
            <textarea onChange={onPostChange}
                ref={newPostElement}
                placeholder="Enter your post"
                value={props.newPostText} />
            <div>
                <button onClick={onAddPost}>Zadushniti dlia vseh</button>
            </div>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}
export default MyPosts
