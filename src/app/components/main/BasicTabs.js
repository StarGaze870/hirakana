import { HirakanaBasic } from '../Tabs/Hirakana-Basic'
import { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function BasicTabs({
    // LEFT
    stopwatchStartTimeRef,
    stopwatchElapsedTimeRef,
    isStopwatchRunning,
    setIsStopwatchRunning,
    restartToggled,
    isGameEnded,

    // CENTER
    hirakanaArray = [],
    tracker = new Set(),
    selectedCharacter = null,
    inputValue = '',
    isCorrect = null,
    rows = [],
    displayInputBorder = false,
    handleInputChange,
    handleOnEnter,
    handleOnHintClick,
    difficulty,
    onDifficultyChange,
    isDifficultyDisabled,

    // RIGHT
    openRestartYesNoModal,
    isRestartModalOpen,
    handleRestartOnYesClick,
    closeRestartYesNoModal,
    isHintClicked = false,

}) {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs centered value={tabValue} onChange={handleTabChange}
                    slotProps={{
                        indicator: {
                            style: { backgroundColor: 'red' }
                        }
                    }}
                    textColor='inherit'
                    aria-label="basic tabs example">
                    <Tab label="Hirakana" sx={{ color: tabValue == 0 ? 'red' : '' }} {...a11yProps(0)} />
                    <Tab label="Advance Hirakana" sx={{ color: tabValue == 1 ? 'red' : '' }} {...a11yProps(1)} />
                    <Tab label="Kanji" sx={{ color: tabValue == 2 ? 'red' : '' }} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
                <HirakanaBasic
                    // LEFT
                    stopwatchStartTimeRef={stopwatchStartTimeRef}
                    stopwatchElapsedTimeRef={stopwatchElapsedTimeRef}
                    isStopwatchRunning={isStopwatchRunning}
                    setIsStopwatchRunning={setIsStopwatchRunning}
                    restartToggled={restartToggled}
                    isGameEnded={isGameEnded}

                    // CENTER
                    hirakanaArray={hirakanaArray}
                    tracker={tracker}
                    selectedCharacter={selectedCharacter}
                    inputValue={inputValue}
                    isCorrect={isCorrect}
                    rows={rows}
                    displayInputBorder={displayInputBorder}
                    handleInputChange={handleInputChange}
                    handleOnEnter={handleOnEnter}
                    handleOnHintClick={handleOnHintClick}
                    isHintClicked={isHintClicked}
                    difficulty={difficulty}
                    onDifficultyChange={onDifficultyChange}
                    isDifficultyDisabled={isDifficultyDisabled}

                    // RIGHT
                    openRestartYesNoModal={openRestartYesNoModal}
                    isRestartModalOpen={isRestartModalOpen}
                    handleRestartOnYesClick={handleRestartOnYesClick}
                    closeRestartYesNoModal={closeRestartYesNoModal}
                />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <h1 className='m-0'>もうすぐ公開...</h1>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
                <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <h1 className='m-0'>もうすぐ公開...</h1>
                </div>
            </CustomTabPanel>
        </Box>
    );
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};