import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";

const ProfileInfo = (props) => {
if (!props.profile) {
    return <Preloader/>
}



    return <div>
        <div>
            <img src='https://cdn-imgix.headout.com/tour/29976/TOUR-IMAGE/f063b1b9-8a23-47ad-bc54-aaab71c5a7a0-a94e6f65-f5fd-4cf6-9b58-54676cfe5106-58e9748a-ed65-4e6b-93bb-e32bfd2340a8-16070-dubai-img-worlds-of-adventure-ticket---free-meal-voucher-08.jpeg'></img>
        </div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large}></img>
            Tut budet tvoio rilo
            </div>
    </div>
}
export default ProfileInfo