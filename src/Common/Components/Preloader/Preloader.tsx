import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type PropsType = {

}

let Preloader: React.FC<PropsType> = (props) => {
    return <div>
        <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
    </div>
}


export default Preloader;