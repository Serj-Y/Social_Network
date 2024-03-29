import React, { ReactElement } from "react";
import styles from "./FormsControls.module.scss";
import { FieldValidatorType } from "../Validators/Validators";
import { Field, WrappedFieldProps } from "redux-form";
import { WrappedFieldMetaProps } from "redux-form/lib/Field";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
  children: ReactElement;
};

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function CreateFields<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        className={styles.Field}
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />{" "}
      <div style={{ textAlign: "center", fontWeight: "600" }}>{text}</div>
    </div>
  );
}

export type GetStringKeys<T> = Extract<keyof T, string>;
