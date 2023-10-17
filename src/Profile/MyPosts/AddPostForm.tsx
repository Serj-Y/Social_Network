import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  GetStringKeys,
  Textarea,
} from "../../Common/Components/FormsControls/FormsControls";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../Common/Components/Validators/Validators";
import { CreateFields } from "../../Common/Components/FormsControls/FormsControls";
import { Btn } from "../../Common/Components/styles/button/Button";
import styles from "./AddPostForm.module.scss";

export const maxLength = maxLengthCreator(250);
export const minLength = minLengthCreator(2);

type AddPostPropsType = {};

export type AddPostFormValueType = {
  newPostText: string;
};

type AddPostFormValueTypeKey = GetStringKeys<AddPostFormValueType>;

let AddPostForm: React.FC<
  InjectedFormProps<AddPostFormValueType, AddPostPropsType> & AddPostPropsType
> = (props) => {
  return (
    <div className={styles.addPostForm}>
      <form className={styles.form} onSubmit={props.handleSubmit}>
        {CreateFields<AddPostFormValueTypeKey>(
          "Enter your post-message",
          "newPostText",
          [required, maxLength, minLength],
          Textarea
        )}
        <div className={styles.submitBtn}>
          <Btn ButtonText={"Post"} />
        </div>
      </form>
    </div>
  );
};
export const AddPostFormRedux = reduxForm<
  AddPostFormValueType,
  AddPostPropsType
>({ form: "profileAddNewPostForm" })(AddPostForm);
