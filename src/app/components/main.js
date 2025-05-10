'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Hiragana } from '../texts/Hiragana'
import { Katakana } from '../texts/Katakana'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import BasicTabs from './main/BasicTabs'

const hirakanaArray = Hiragana.concat(Katakana);

export const MainContent = () => {

    const [trackerCounter, setTrackerCounter] = useState(new Set());
    const [trackerTableRows, setTrackerTableRows] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [displayInputBorder, setValueDisplayInputBorder] = useState(false);

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

        setTrackerTableRows([createData(isCorrect, character[0], character[1]), ...trackerTableRows])
    }

    return (
        <div className="d-flex flex-grow-1">
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
                <div className="col d-flex pt-1">
                    <BasicTabs
                        hirakanaArray={hirakanaArray}
                        tracker={trackerCounter}
                        selectedCharacter={selectedCharacter}
                        inputValue={inputValue}
                        isCorrect={isCorrect}
                        rows={trackerTableRows}
                        displayInputBorder={displayInputBorder}
                        handleInputChange={handleInputChange}
                        handleOnEnter={handleOnEnter}
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