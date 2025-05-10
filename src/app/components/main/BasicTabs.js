'use client'

import { HirakanaBasic } from '../Tabs/Hirakana-Basic'
import { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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