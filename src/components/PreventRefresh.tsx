import { ReactNode, useEffect } from "react";

const PreventRefresh = ({
    children,
    exceptref,
}: {
    children: ReactNode;
    exceptref?: React.RefObject<HTMLElement | null>;
}) => {
    useEffect(() => {
        const disablePullToRefresh = (e: TouchEvent) => {
            // Prevent default action if the touch move is vertical
            if (exceptref) {
                if (exceptref.current && exceptref.current.contains(e.target as Node)) {
                    return; // Ignore touchmove if it originated within exceptref
                }
            }

            if (e.touches.length > 1 || e.touches[0].clientY > 0) {
                e.preventDefault();
            }
        };

        // Add event listener to the document
        document.addEventListener("touchmove", disablePullToRefresh, { passive: false });

        // Clean up the event listener on unmount
        return () => {
            document.removeEventListener("touchmove", disablePullToRefresh);
        };
    }, []);

    return <div style={{ touchAction: "pan-x" }}>{children}</div>;
};

export default PreventRefresh;
