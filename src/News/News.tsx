import React from "react";
// import s from "./News.module.css";

type PropsType = {

}

const News: React.FC<PropsType> = (props) => {
    return (
        <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    )
}

export default News