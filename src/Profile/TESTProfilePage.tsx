// import React, { useEffect } from "react";
// import Profile from "./Profile";
// import { ProfileType } from "../Common/Components/Types/Types";
// import { RouteComponentProps, useHistory } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { AppStateType } from "../Common/Components/Redux/reduxStore";
// import { actions, getStatus, profileContent, saveProfile } from "../Common/Components/Redux/profileReducer";


// type MapDispatchPropsType = {

// }

// type PathParamsType = {
//     userId: string
// }



// type PropsType =  MapDispatchPropsType & RouteComponentProps<PathParamsType>

//  const TESTProfilePage = (props: PropsType) => {


// const history = useHistory()
// const dispatch = useDispatch()

// const authUserId = useSelector((state:AppStateType) => state.auth.userId)
// const UserId = useSelector((state: AppStateType) => state.profilePage.profile?.userId)
// const profile = useSelector((state: AppStateType) => state.profilePage.profile)




// const ProfileContent  =(userId: number) =>{
//     dispatch(profileContent(userId))
//   }

//   const GetStatus  =(userId: number) =>{
//     dispatch(getStatus(userId) )
//   }


// useEffect(()=> {
//     let userId: any = UserId
//     if (!userId) {
//         userId = authUserId
//         if(!userId) {
//             history.push("/login")
//         }
//     }

// ProfileContent(userId);
// GetStatus(userId);

//    debugger
// }, [])

//      function SaveP(profile: ProfileType): Promise<any> {
//          throw new Error("Function not implemented.");
//      }

//     return (
//         <div>
//             <h1>TEST!!!</h1>
//             <Profile 
//             isOwner={!!authUserId} 
//             saveProfile= {SaveP}   />
//         </div>

//     );

// };

    
// export default TESTProfilePage
