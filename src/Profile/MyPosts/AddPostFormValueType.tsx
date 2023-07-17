import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Textarea } from "../../Common/Components/FormsControls/FormsControls";
import { maxLengthCreator, minLengthCreator, required } from "../../Common/Components/Validators/Validators";
import { CreateFields } from "../../Common/Components/FormsControls/FormsControls";
import { Button } from "react-bootstrap";


export const maxLength = maxLengthCreator(50);
export const minLength = minLengthCreator(2);

type AddPostPropsType = {};

export type AddPostFormValueType = {
    newPostText: string;
};

type AddPostFormValueTypeKey = GetStringKeys<AddPostFormValueType>;
let AddPostForm: React.FC<InjectedFormProps<AddPostFormValueType, AddPostPropsType> & AddPostPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {CreateFields<AddPostFormValueTypeKey>("Enter your post-message", "newPostText", [required, maxLength, minLength], Textarea)}
            <Button>Post</Button>
        </form>
    );
};
export const AddPostFormRedux = reduxForm<AddPostFormValueType, AddPostPropsType>({ form: "profileAddNewPostForm" })(AddPostForm);
