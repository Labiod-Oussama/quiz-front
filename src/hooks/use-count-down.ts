import { useCallback, useEffect, useRef, useState } from "react";

type ReturnSecondsType = {
    counting: boolean;
    countdown: number;
    startCountdown: VoidFunction;
    resetCountdown: VoidFunction;
};

export function useCountdownSeconds(initCountdown: number = 0): ReturnSecondsType {
    const [countdown, setCountdown] = useState(initCountdown);
    const intervalId = useRef<number | null>(null); // Store interval ID

    useEffect(() => {
        // Reset countdown when the initial countdown changes
        setCountdown(initCountdown);
        return () => clearIntervalIfRunning(); // Cleanup on unmount
    }, [initCountdown]);

    const clearIntervalIfRunning = () => {
        if (intervalId.current !== null) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    const startCountdown = useCallback(() => {
        if (countdown === 0 || intervalId.current !== null) return;

        let remainingSeconds = countdown;

        intervalId.current = window.setInterval(() => {
            remainingSeconds -= 1;
            setCountdown(remainingSeconds);

            if (remainingSeconds === 0) {
                clearIntervalIfRunning();
            }
        }, 1000);
    }, [countdown]);

    const resetCountdown = useCallback(() => {
        clearIntervalIfRunning();
        setCountdown(initCountdown);
    }, [initCountdown]);

    const counting = countdown < initCountdown && countdown > 0;

    return { counting, countdown, startCountdown, resetCountdown };
}
