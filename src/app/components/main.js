'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState } from 'react'
import { Hiragana } from '../texts/Hiragana'
import { Katakana } from '../texts/Katakana'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import BasicTabs from './main/BasicTabs'
import { formatTime } from './main/mainFunctions'
import { DIFFICULTY_EASY, DIFFICULTY_HARD, DIFFICULTY_MEDIUM } from '../constants'

const hirakanaArray = Hiragana.concat(Katakana);

export const MainContent = () => {

    // LEFT
    const stopwatchStartTimeRef = useRef(null);
    const stopwatchElapsedTimeRef = useRef(0);
    const isGameStartedRef = useRef(false);
    const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
    const [restartToggled, setIsRestartToggled] = useState(false);

    // CENTER
    const [trackerCounter, setTrackerCounter] = useState(new Set());
    const [trackerTableRows, setTrackerTableRows] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [displayInputBorder, setValueDisplayInputBorder] = useState(false);
    const [isHintClicked, setIsHintClicked] = useState(false);
    const [difficulty, setDifficulty] = useState(0);
    const [isDifficultyDisabled, setIsDifficultyDisabled] = useState(false);
    const [isGameEnded, setIsGameEnded] = useState(false);

    // SIDEBAR RIGHT
    const [isRestartModalOpen, setRestartModalOpen] = useState(false);

    // PAUSE STOPWATCH WHEN PAGE IS HIDDEN
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsStopwatchRunning(false);
            } else if (isGameStartedRef.current && !isGameEnded) {
                setIsStopwatchRunning(true);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {

        if (!isStopwatchRunning && isGameEnded) {
            saveLapTime();
        }

    }, [isStopwatchRunning])

    useEffect(() => {
        if (trackerCounter.size === 0) {
            generateUniqueCharacter();
        }
    }, [trackerCounter]);

    // ------------------------------ FUNCTIONS --------------------------------------------------  

    function displayInputBorderFadeOutTimer() {
        setValueDisplayInputBorder(true);
        const timeout = setTimeout(() => {
            setValueDisplayInputBorder(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }

    function generateCharacter() {
        return Math.floor(Math.random() * hirakanaArray.length);
    }

    function generateUniqueCharacter() {
        let randomCharacterNum;

        if (trackerCounter.size == hirakanaArray.length) {
            return
        }

        do {
            randomCharacterNum = generateCharacter();
        } while (trackerCounter.has(randomCharacterNum));

        setSelectedCharacter(randomCharacterNum);
        setTrackerCounter(prev => prev.add(randomCharacterNum));
    }

    function createData(isCorrect, japanese, romaji) {
        const icon = isCorrect ? <CheckCircleIcon color='success' /> : <DangerousIcon color='error' />;
        return { isCorrect: icon, japanese, romaji };
    }

    function restartTab_1() {
        isGameStartedRef.current = false;
        setIsDifficultyDisabled(false);
        setTrackerCounter(new Set());
        setIsStopwatchRunning(false);
        setIsRestartToggled(true);
        setIsHintClicked(false);
        setIsGameEnded(false);
        setInputValue('')

        setTrackerTableRows([])
    }

    function gameEndSetup() {
        isGameStartedRef.current = false;
        displayInputBorderFadeOutTimer();
        setIsStopwatchRunning(false);
        setIsGameEnded(true);
    }

    function saveLapTime() {

        const totalTime = formatTime(stopwatchElapsedTimeRef.current);
        const date = new Date();

        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const timeStamp = `${month} ${day}, ${time}`;

        console.log()

    }

    // ------------------------- HANDLE FUNCTIONS --------------------------------------------------  

    // CENTER
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnEnter = () => {

        const value = inputValue.trim();
        if (value.length == 0 || isGameEnded) {
            return;
        }

        const character = hirakanaArray[selectedCharacter];
        var trackerTemp = trackerTableRows;
        let isCorrect = false;

        if (difficulty == DIFFICULTY_EASY) {

            if (value && value.toLowerCase() === character[1].toLowerCase()) {
                trackerTemp = [createData(true, character[0], character[1]), ...trackerTableRows];
                generateUniqueCharacter();
                setIsHintClicked(false);
                setInputValue('')

                isCorrect = true;
            }

        }
        else if (difficulty == DIFFICULTY_MEDIUM || difficulty == DIFFICULTY_HARD) {

            if (value && value.toLowerCase() === character[1].toLowerCase()) {
                isCorrect = true;
            }

            setInputValue('')
            generateUniqueCharacter();
            setIsHintClicked(false);

            trackerTemp = [createData(isCorrect, character[0], character[1]), ...trackerTableRows];
        }

        // ---------------- GAME ENDED ----------------
        if (trackerTemp.length == hirakanaArray.length) {
            const totalTime = formatTime(stopwatchElapsedTimeRef.current);
            console.log(totalTime)
            setTrackerTableRows(trackerTemp);
            gameEndSetup();
            return;
        }

        setTrackerTableRows(trackerTemp);
        displayInputBorderFadeOutTimer();
        isGameStartedRef.current = true;
        setIsCorrect(() => isCorrect);
        setIsDifficultyDisabled(true);
        setIsStopwatchRunning(true);
        setIsRestartToggled(false);
    }

    const handleOnHintClick = () => {
        if (isHintClicked) return;

        const romaji = hirakanaArray[selectedCharacter][1];
        const firstLetter = romaji[0];

        setIsStopwatchRunning(true);
        setInputValue(firstLetter);
        setIsHintClicked(true);
    };

    const onDifficultyChange = (e) => {
        setDifficulty(e.target.value)
    }

    // RIGHT
    const openRestartYesNoModal = () => {
        setRestartModalOpen(true);
    }

    const closeRestartYesNoModal = () => {
        setRestartModalOpen(false);
        const totalTime = formatTime(stopwatchElapsedTimeRef.current);
        console.log(totalTime)
    }

    const handleRestartOnYesClick = () => {
        stopwatchStartTimeRef.current = 0;
        stopwatchElapsedTimeRef.current = 0;

        restartTab_1();
        closeRestartYesNoModal();
    }

    return (
        <div className="d-flex app-bar-margin flex-grow-1">
            <div className='d-flex flex-row w-100'>

                {/* LEFT SIDEBAR */}
                <div className="col-1 d-none d-lg-block">
                    <img
                        src="https://blog.sakura.co/wp-content/uploads/2022/10/sakuraco_momiji-thumbnail.png"
                        alt="Ad Banner"
                        className="img-fluid w-100 h-100 object-fit-cover"
                    />
                </div>

                {/* MAIN CONTENT */}
                <div className="col d-flex pt-1 flex-column">
                    <BasicTabs
                        // LEFT
                        stopwatchStartTimeRef={stopwatchStartTimeRef}
                        stopwatchElapsedTimeRef={stopwatchElapsedTimeRef}
                        isStopwatchRunning={isStopwatchRunning}
                        setIsStopwatchRunning={setIsStopwatchRunning}
                        restartToggled={restartToggled}

                        // CENTER
                        hirakanaArray={hirakanaArray}
                        tracker={trackerCounter}
                        selectedCharacter={selectedCharacter}
                        inputValue={inputValue}
                        isCorrect={isCorrect}
                        displayInputBorder={displayInputBorder}
                        handleInputChange={handleInputChange}
                        handleOnEnter={handleOnEnter}
                        handleOnHintClick={handleOnHintClick}
                        isHintClicked={isHintClicked}
                        difficulty={difficulty}
                        onDifficultyChange={onDifficultyChange}
                        isDifficultyDisabled={isDifficultyDisabled}

                        // RIGHT
                        rows={trackerTableRows}
                        openRestartYesNoModal={openRestartYesNoModal}
                        isRestartModalOpen={isRestartModalOpen}
                        handleRestartOnYesClick={handleRestartOnYesClick}
                        closeRestartYesNoModal={closeRestartYesNoModal}
                    />
                </div>
                {/* RIGHT SIDEBAR */}
                <div className="col-1 d-none d-lg-block">
                    <img
                        src="https://blog.sakura.co/wp-content/uploads/2022/10/sakuraco_momiji-thumbnail.png"
                        alt="Ad Banner"
                        className="img-fluid w-100 h-100 object-fit-cover"
                    />
                </div>
            </div>
        </div>
    );
}