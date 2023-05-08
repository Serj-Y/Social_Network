import React from "react";
import styles from "./FormsControls.module.css"
import { Field } from "redux-form";

export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")} >
            <div>
                <textarea {...props} {...input} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")} >
            <div>
                <input {...props} {...input} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const CreateFields = (placeholder, name, validators, component, props = {}, text = "") => (
    <div>
         <Field
        placeholder={placeholder}
        name={name}        
        validate={validators}
        component={component}
        {...props} />{text}
    </div> 
)