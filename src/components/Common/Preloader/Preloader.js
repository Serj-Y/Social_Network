import React from "react";
import preLoader from "../../../assets/img/Preloader.gif"


let Preloader = (props) => {
    return  <div>
    <img src={preLoader} style={{maxWidth: '55px'}} />
</div> 
} 
export default Preloader;