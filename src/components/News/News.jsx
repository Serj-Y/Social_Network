import React from "react";
import s from "./News.module.css";

const News = React.memo(props => {
    return (
        <div className={s.News}>
            <h1>News</h1>
        </div>
    )
})

export default News