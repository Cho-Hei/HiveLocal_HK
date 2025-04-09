import { Spinner } from "@heroui/react";

const LoadingSpinner = () => {
    return (
        <div>
            <Spinner classNames={{ label: "text-foreground mt-4" }} variant='simple' />
        </div>
    );
};

export default LoadingSpinner;
