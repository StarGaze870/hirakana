import { useRef, useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { formatTime } from './mainFunctions';

export default function Stopwatch({

    startTimeRef = null,
    elapsedRef = null,
    isRunning = false,
    reset = false,
    setIsRunning = () => { console.error('setIsRunning is empty') }

}) {

    const [displayTime, setDisplayTime] = useState(0);
    const animationRef = useRef(null);

    useEffect(() => {
        if (reset && !isRunning) {
            setDisplayTime(0);
            cancelAnimationFrame(animationRef.current);
        }

    }, [reset, isRunning])

    useEffect(() => {
        if (isRunning) {
            if (startTimeRef.current === null) {
                startTimeRef.current = performance.now();
            }
            animationRef.current = requestAnimationFrame(update);
        } else if (startTimeRef.current != null) {
            pause();
        }

        return () => cancelAnimationFrame(animationRef.current);
    }, [isRunning]);

    const update = () => {
        const now = performance.now();

        if (!startTimeRef.current) {
            startTimeRef.current = now;
        }

        const elapsed = now - startTimeRef.current + (elapsedRef.current || 0);
        setDisplayTime(elapsed);

        animationRef.current = requestAnimationFrame(update);
    };

    const start = () => {
        if (!startTimeRef.current) {
            startTimeRef.current = performance.now();
            animationRef.current = requestAnimationFrame(update);
            setIsRunning(true);
        }
    };

    const pause = () => {
        elapsedRef.current += performance.now() - startTimeRef.current;
        startTimeRef.current = null;

        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
    }

    const handlePause = () => {
        if (isRunning && startTimeRef.current != null) {
            pause();
            setIsRunning(false);
        }
    };

    const handleToggle = () => {
        isRunning ? handlePause() : start();
    };

    const disableButton = displayTime == 0;

    return (
        <Button onClick={handleToggle} disabled={disableButton}>
            <Tooltip title="Pause / Resume" placement="auto">
                <div className="d-flex justify-content-center align-items-center flex-row py-5 gap-3">
                    <h1 className="m-0 text-black opacity-50" style={{ fontSize: '3.5rem', fontFamily: 'monospace' }}>
                        {formatTime(displayTime)}
                    </h1>
                    {isRunning ? (
                        <PauseIcon className="opacity-75" color="error" />
                    ) : (
                        <PlayArrowIcon className="opacity-75" color={disableButton ? 'disabled' : 'success'} />
                    )}
                </div>
            </Tooltip>
        </Button>
    );
}