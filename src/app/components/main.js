'use client'

import { useEffect, useState } from 'react'
import { HirakanaBasic } from './Tabs/Hirakana-Basic'
import { Hiragana } from '../texts/Hiragana'
import { Katakana } from '../texts/Katakana'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css'

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
                <div className="col-1 d-none d-lg-block bg-danger">
                    <img
                        src="https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABdIFYfkylotuQsosH1WlGXHoouJSR59IKXL-xHz1EBGnDra3h7PiJ0E7Oe8wZzKk0hpHSKQGHi7VrGSs64kozAD0u9dXXKO-T4SM.jpg?r=33e"
                        alt="Ad Banner"
                        className="img-fluid w-100 h-100 object-fit-cover"
                    />
                </div>

                {/* MAIN CONTENT */}
                <div className="col d-flex">
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
                <div className="col-1 d-none d-lg-block bg-warning">
                    <img
                        src="https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABdIFYfkylotuQsosH1WlGXHoouJSR59IKXL-xHz1EBGnDra3h7PiJ0E7Oe8wZzKk0hpHSKQGHi7VrGSs64kozAD0u9dXXKO-T4SM.jpg?r=33e"
                        alt="Ad Banner"
                        className="img-fluid w-100 h-100 object-fit-cover"
                    />
                </div>
            </div>
        </div>
    );
}

function createData(isCorrect, japanese, romaji) {
    const icon = isCorrect ? <CheckCircleIcon color='success' /> : <DangerousIcon color='error' />;
    return { isCorrect: icon, japanese, romaji };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className={`h-100 ${value != index ? 'd-none' : 'd-flex'}`}
            role='tabpanel'
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div className='d-flex flex-grow-1'>{children}</div>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({
    hirakanaArray = [],
    tracker = new Set(),
    selectedCharacter = null,
    inputValue = '',
    isCorrect = null,
    rows = [],
    displayInputBorder = false,
    handleInputChange = () => { },
    handleOnEnter = () => { },

}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs centered value={value} onChange={handleChange}
                    slotProps={{
                        indicator: {
                            style: { backgroundColor: 'red' }
                        }
                    }}
                    textColor='inherit'
                    aria-label="basic tabs example">
                    <Tab label="Hirakana" sx={{ color: value == 0 ? 'red' : '' }} {...a11yProps(0)} />
                    <Tab label="Advance Hirakana" sx={{ color: value == 1 ? 'red' : '' }} {...a11yProps(1)} />
                    <Tab label="Kanji" sx={{ color: value == 2 ? 'red' : '' }} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <HirakanaBasic
                    hirakanaArray={hirakanaArray}
                    tracker={tracker}
                    selectedCharacter={selectedCharacter}
                    inputValue={inputValue}
                    isCorrect={isCorrect}
                    rows={rows}
                    displayInputBorder={displayInputBorder}
                    handleInputChange={handleInputChange}
                    handleOnEnter={handleOnEnter}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <h1 className='m-0'>もうすぐ公開...</h1>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <h1 className='m-0'>もうすぐ公開...</h1>
                </div>
            </CustomTabPanel>
        </Box>
    );
}