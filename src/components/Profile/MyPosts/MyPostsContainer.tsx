import { compose } from "redux";
import { actions } from "../../../Redux/profileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../Redux/reduxStore";
import React from "react";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
};
// Dispatch type it works but need fix!!! 

const mapDispatchToProps = (dispatch: (arg0: { readonly type: "ADD-POST"; readonly newPostText: string; }) => void ) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText));
        }
    }
};

export default compose<React.ComponentType> ( 
    connect(mapStateToProps, mapDispatchToProps),
)(MyPosts);
