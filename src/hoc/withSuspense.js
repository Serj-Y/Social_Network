import React, {Suspense} from "react";
import Preloader from "../components/Common/Preloader/Preloader";

export const widthSuspense = (Component) => {
    return (props) => {
        return <Suspense fallback={<Preloader />}>
            <Component {...props} />
        </Suspense>
    }
}