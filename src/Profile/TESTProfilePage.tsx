import React from "react";
import Profile from "./Profile";
import { ProfileType } from "../Common/Components/Types/Types";



export const TESTProfilePage = (props: any) => {
    let refreshProfile = () => {

        let userId: number | null = +props.match.params.userId;
        if (!userId) {
            userId = props.AuthUserId;
            if (!userId) {
                props.history.push("/login");
            }
        }
        props.profileContent(userId);
        props.getStatus(userId);
    };



    return (
        <div>
            <h1>TEST!!!</h1>
            <Profile saveProfile={function (profile: ProfileType): Promise<any> {
                throw new Error("Function not implemented.");
            }} isOwner={true} {...props} // isOwner={!props.match.params.userId}
            />
        </div>

    );

};
