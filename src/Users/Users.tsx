import React from "react";
import Paginator from "../Common/Components/Paginator/Paginator";
import User from "./User";
import { UsersType } from "../Common/Components/Types/Types";
import { Formik } from "formik";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
}


let Users: React.FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, unFollow, follow, followingInProgress, users }) => {
    return <div>

        <UserSearchForm/>
        <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize} />

        {users.map(u =>

            <User
                unFollow={unFollow}
                follow={follow}
                user={u}
                key={u.id}
                followingInProgress={followingInProgress} />
        )}

        <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize} />
    </div>
}
const UserSearchFormValue = (values: any) => {
    const error ={}
    return error
}

const UserSearchForm = () => {

const submit = (values: any, { setSubmitting }: any) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }

    return(
        <div>
<h1>Search</h1>
<Formik
       initialValues={{ email: '', password: '' }}
       validate={UserSearchFormValue}
       onSubmit={submit}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
        </div>
    )
}

export default Users