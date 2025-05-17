'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState } from 'react'
import { Hiragana } from '../texts/Hiragana'
import { Katakana } from '../texts/Katakana'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import BasicTabs from './main/BasicTabs'

const hirakanaArray = Hiragana.concat(Katakana);

export const MainContent = () => {

    // LEFT
    const stopwatchStartTimeRef = useRef(null);
    const stopwatchElapsedTimeRef = useRef(0);
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

    // SIDEBAR RIGHT
    const [isRestartModalOpen, setRestartModalOpen] = useState(false);

    useEffect(() => {
        generateUniqueCharacter();
    }, [])

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
        setTrackerCounter(new Set());
        setInputValue('')
        generateUniqueCharacter();
        setIsHintClicked(false);
        setIsRestartToggled(true);

        setTrackerTableRows([{}])
    }

    // ------------------------- HANDLE FUNCTIONS --------------------------------------------------  

    const handleInputChange = (e) => {

        if (trackerCounter.size == hirakanaArray.length) {
            return
        }
        setInputValue(e.target.value);
    }

    const handleOnEnter = () => {

        if (trackerCounter.size == hirakanaArray.length) {
            return
        }

        const character = hirakanaArray[selectedCharacter];
        const value = inputValue;
        let isCorrect = false;

        // EASY MODE, DOESN'T GO NEXT WHEN WRONG

        // if (value && value.toLowerCase() === hirakanaArray[selectedCharacter][1].toLowerCase()) {
        //     generateUniqueCharacter();
        //     setInputValue('')
        //     displayInputBorderFadeOutTimer(true)
        //     setIsCorrect(true);
        //     return;
        // }

        // displayInputBorderFadeOutTimer(false)
        // setIsCorrect(() => false);

        if (value && value.toLowerCase() === character[1].toLowerCase()) {
            isCorrect = true;
        }

        setInputValue('')
        generateUniqueCharacter();
        displayInputBorderFadeOutTimer();
        setIsCorrect(() => isCorrect);
        setIsHintClicked(false);
        setIsStopwatchRunning(true);
        setIsRestartToggled(false);

        setTrackerTableRows([createData(isCorrect, character[0], character[1]), ...trackerTableRows])
    }

    const handleOnHintClick = () => {
        if (isHintClicked) return;

        const romaji = hirakanaArray[selectedCharacter][1];
        const firstLetter = romaji[0];

        setInputValue(prev => prev + firstLetter);
        setIsHintClicked(true);
    };

    const openRestartYesNoModal = () => {
        setRestartModalOpen(true);
    }
    const closeRestartYesNoModal = () => {
        setRestartModalOpen(false);
    }
    const handleRestartOnYesClick = () => {
        stopwatchStartTimeRef.current = 0;
        stopwatchElapsedTimeRef.current = 0;
        setIsStopwatchRunning(false);

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