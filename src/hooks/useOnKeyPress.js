import { useEffect } from "react";

export const useOnKeyPress = (callback, target) => {
    useEffect(() => {

        const keyPressHandler = (event) => {
            if (event.key === target) {
                callback();
            }
        }
        window.addEventListener("keydown", keyPressHandler);
        return () => {
            window.removeEventListener("keydown", keyPressHandler);
        }
    }, [callback, target]);
}