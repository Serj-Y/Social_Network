import React, { useState } from "react";
import style from "./Paginator.module.css"


type PropsType = {
    totalItemsCount: number
     pageSize: number
      currentPage: number 
      onPageChanged: (pageNumber: number) => void
       portionSize: number
}


let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
   
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number>  = [];
    for (let i = 1; i <= pagesCount; i++) { 
        pages.push(i);
     }

let portionCount = Math.ceil(pagesCount / portionSize);
let [portionNumber, setPortionNumber] = useState(1);
let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
let rightPortionNumber = portionNumber * portionSize



    return (
        <div className={style.paginator}>
            {portionNumber > 1 && 
            <button onClick={() => {setPortionNumber(portionNumber - 1) }}>{"< ..."}</button>}


            {pages.filter(p => p >= leftPortionNumber && p<=rightPortionNumber).map((p) => {
                return (
                    <button 
                    key={p}
                        onClick={(e) => {onPageChanged(p); }}>{p}
                    </button>
                )
            })}
{portionCount > portionNumber && 
<button onClick={() => {setPortionNumber(portionNumber + 1 ) }}>{"... >"}</button>}



        </div>
    )
}

export default Paginator;