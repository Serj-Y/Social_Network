import React from "react";
import s from "./News.module.css";

type PropsType = {

}

const News: React.FC<PropsType> = (props) => {
    return (
        <div className={s.News}>
            <h1>News</h1>
        </div>
    )
}

export default News