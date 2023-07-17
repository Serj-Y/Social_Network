import React from "react";
import preLoader from "../../assets/img/Preloader.gif"
import { Spinner } from "react-bootstrap";

type PropsType = {

}

let Preloader: React.FC<PropsType> = (props) => {
    return<Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
}


export default Preloader;