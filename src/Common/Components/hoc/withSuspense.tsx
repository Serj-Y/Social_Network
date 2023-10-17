import React, { Suspense } from "react";
import Preloader from "../Preloader/Preloader";

export const widthSuspense = (Component: any) => {
  return (props: any) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
