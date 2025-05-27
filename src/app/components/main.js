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

    // SIDEBAR RIGHT
    const [isRestartModalOpen, setRestartModalOpen] = useState(false);

    useEffect(() => {
        generateUniqueCharacter();
    }, [])

    // PAUSE STOPWATCH WHEN PAGE IS HIDDEN
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsStopwatchRunning(false);
            } else if (trackerCounter.size > 1 || isGameStartedRef.current) {
                setIsStopwatchRunning(true);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);


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
        generateUniqueCharacter();
        setIsRestartToggled(true);
        setIsHintClicked(false);
        setInputValue('')

        setTrackerTableRows([{}])
    }

    // ------------------------- HANDLE FUNCTIONS --------------------------------------------------  

    // CENTER
    const handleInputChange = (e) => {

        if (trackerCounter.size == hirakanaArray.length) {
            return
        }
        setInputValue(e.target.value);
    }

    const handleOnEnter = () => {

        const value = inputValue.trim();
        if (value.length == 0) {
            return;
        }

        if (trackerCounter.size == hirakanaArray.length) {
            // TODO: SAVE LAP TIME
            return
        }

        const character = hirakanaArray[selectedCharacter];
        let isCorrect = false;

        if (difficulty == DIFFICULTY_EASY) {

            if (value && value.toLowerCase() === character[1].toLowerCase()) {
                setTrackerTableRows([createData(true, character[0], character[1]), ...trackerTableRows])
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

            setTrackerTableRows([createData(isCorrect, character[0], character[1]), ...trackerTableRows])
        }

        isGameStartedRef.current = true;
        setIsStopwatchRunning(true);
        setIsRestartToggled(false);
        setIsDifficultyDisabled(true);
        displayInputBorderFadeOutTimer();
        setIsCorrect(() => isCorrect);
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
    }

    const handleRestartOnYesClick = () => {
        stopwatchStartTimeRef.current = 0;
        stopwatchElapsedTimeRef.current = 0;

        restartTab_1();
        closeRestartYesNoModal();
    }

    // TODO: SAVE
    // ACTUAL TIME STAMP WHEN PAUSED
    // console.log(formatTime(stopwatchElapsedTimeRef.current))

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