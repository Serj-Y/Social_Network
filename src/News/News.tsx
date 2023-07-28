import React from "react";
import styles from "./News.module.scss";

type PropsType = {

}

const News: React.FC<PropsType> = (props) => {
  return (<div className={styles.News} >
    <h1 > Coming soon...</h1>
  </div>

  )
}

export default News