import React from "react";
import styles from "./InputBtn.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export const InputBtn = ({ OnChange }: any) => {
  return (
    <div className={styles.container}>
      <input
        type="file"
        id="file"
        onChange={OnChange}
        className={styles.input}
      />
      <label htmlFor="file">
        <div className={styles.inputBtn}>
          {" "}
          Change Photo <FontAwesomeIcon icon={faUpload} />
        </div>
      </label>
    </div>
  );
};
