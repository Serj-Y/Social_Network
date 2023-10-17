import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Preloader = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
    </div>
  );
};

export default Preloader;
