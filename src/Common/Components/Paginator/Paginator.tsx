import React, { useState } from "react";
import style from "./Paginator.module.scss";
import cn from "classnames";
import { Btn } from "../styles/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <Btn
          Click={() => {
            setPortionNumber(portionNumber - 1);
          }}
          ButtonText={<FontAwesomeIcon icon={faChevronLeft} />}
        />
      )}

      {pages
        .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
        .map((p) => {
          return (
            <Btn
              PropBtnStyle={cn({ [style.selectedPage]: currentPage === p })}
              key={p}
              Click={(e: any) => {
                onPageChanged(p);
              }}
              ExtraComponent={p}
            />
          );
        })}
      {portionCount > portionNumber && (
        <Btn
          Click={() => {
            setPortionNumber(portionNumber + 1);
          }}
          ButtonText={<FontAwesomeIcon icon={faChevronRight} />}
        />
      )}
    </div>
  );
};

export default Paginator;
