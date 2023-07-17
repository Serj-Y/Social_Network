import React from "react";
import preLoader from "../../assets/img/Preloader.gif"

type PropsType = {

}

let Preloader: React.FC<PropsType> = (props) => {
    return <div>
        <img src={preLoader} alt="preLoader" style={{ maxWidth: "55px" }} />
    </div>
}


export default Preloader;