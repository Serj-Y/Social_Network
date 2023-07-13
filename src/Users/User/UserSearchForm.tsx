import React from "react";
import { Field, Formik, Form } from "formik";
import { FilterType } from "../../Common/Components/Redux/usersReducer";
import { useSelector } from "react-redux";
import { getUserFilter } from "../../Common/Components/Redux/userSelectors";


const UserSearchFormValue = (values: any) => {
  const error = {};
  return error;
};

type FilterFormType = "true" | "false" | "null"

type FormType = {
  term: string,
  friend: FilterFormType
}
type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

export const UserSearchForm: React.FC<PropsType> = (props) => {

  const filter = useSelector(getUserFilter)

  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }
    props.onFilterChanged(filter);
    setSubmitting(false)
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) as FilterFormType }}
        validate={UserSearchFormValue}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />

            <Field name="friend" as="select">
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
