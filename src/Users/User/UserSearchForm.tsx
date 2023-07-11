import React from "react";
import { Field, Formik, Form } from "formik";
import { FilterType } from "../../Common/Components/Redux/usersReducer";


const UserSearchFormValue = (values: any) => {
  const error = {};
  return error;
};



type FormType = {
  term: string,
  friend: string | "true" | "false" | "null"
}
type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

export const UserSearchForm: React.FC<PropsType> =(props) => {

  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }
    props.onFilterChanged(filter);
    debugger
    setSubmitting(false)
  };

  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: "null" }}
        validate={UserSearchFormValue}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />

            <Field name= "friend" as="select">
              <option value="null" > All</option>
              <option value="true" > Friends</option>
              <option value="false" > !Friends</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>search</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
