// import React, { useEffect } from "react";
// import Profile from "./Profile";
// import { ProfileType } from "../Common/Components/Types/Types";
// import { useHistory } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { AppStateType } from "../Common/Components/Redux/reduxStore";
// import { getStatus, profileContent } from "../Common/Components/Redux/profileReducer";




// const TESTProfilePage = () => {
//     const history = useHistory()
//     const dispatch = useDispatch()

//     const authUserId = useSelector((state: AppStateType) => state.auth.userId)

//     const ProfileContent = (userId: number) => {
//         dispatch(profileContent(userId))
//     }

//     const GetStatus = (userId: number) => {
//         dispatch(getStatus(userId))
//     }

//     const urlUserId = history.location.pathname.substring(9)
//     useEffect(() => {
//         let userId: any = urlUserId
//         if (!userId) {
//             userId = authUserId
//             if (!userId) {
//                 history.push("/login")
//             }
//         }
//         ProfileContent(userId)
//         GetStatus(userId)
//     }, [history.location.pathname])


//     function SaveP(profile: ProfileType): Promise<any> {
//         throw new Error("Function not implemented.");
//     }

//     return (
//         <div>
//             <h1>TEST!!!</h1>
//             <Profile
//                 isOwner={!urlUserId}
//                 saveProfile={SaveP} />
//         </div>
//     );

// };


// export default TESTProfilePage
