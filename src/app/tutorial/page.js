'use client'

import { Autocomplete, Avatar, Container, IconButton, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ADD_NEW_PLAYER, DIFFICULTY_EASY, DIFFICULTY_HARD, HIRAKANA_ARRAY, SIDE_BAR_LEFT_LAP_HEADERS, SIDE_BAR_LEFT_LAP_TABLE, SIDE_BAR_LEFT_STREAK_HEADERS, SIDE_BAR_LEFT_STREAK_TABLE } from "../constants";
import { CREATE_HISTORY_TABLE_DATA, stringAvatar } from "../components/main/mainFunctions";
import AddnewPlayerModal from "../components/modal/AddNewPlayerModal";
import LibraryModal from "../components/modal/LibraryModal";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Stopwatch from "../components/main/sidebar-left/stopwatch-left";
import ReplayIcon from '@mui/icons-material/Replay';
import { MainSidebarRight } from "../components/main/sidebar-right/sidebar-right";
import YesNoModal from "../components/modal/YesNoModal";
import { HistoryTable } from "../components/main/sidebar-left/historyTable";

export default function Tutorial() {

  const [difficulty, setDifficulty] = useState(0);
  const [difficultyDisplay, setDifficultyDisplay] = useState(-1);

  const [selectedUser, setSelectedUser] = useState({ username: 'Alyssa' });
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const inputRef = useRef();
  const isLibraryPressed = useRef(false);
  const isHintPressed = useRef(false);
  const hintButtonRef = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [isLibraryModalOpen, setLibraryModalOpen] = useState(false);
  const [isHintClicked, setIsHintClicked] = useState(false);
  const [displayInputBorder, setValueDisplayInputBorder] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const borderTimeoutRef = useRef(null);

  const stopwatchStartTimeRef = useRef(null);
  const stopwatchElapsedTimeRef = useRef(0);
  const isGameStartedRef = useRef(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [restartToggled, setIsRestartToggled] = useState(false);

  const [isRestartModalOpen, setRestartModalOpen] = useState(false);
  const [trackerTableRows, setTrackerTableRows] = useState(historyTableData);

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState(SIDE_BAR_LEFT_LAP_TABLE);
  const [tableHeaders, setTableHeaders] = useState(SIDE_BAR_LEFT_LAP_HEADERS);

  const hintOpacity = isHintClicked
    || difficulty != DIFFICULTY_EASY
    ? 'opacity-100' : 'opacity-50';

  const hintColor = isHintClicked
    || difficulty != DIFFICULTY_EASY
    ? '' : 'warning';

  const hintToolTip =
    isHintClicked
      ? 'Hint Used'
      : difficulty !== DIFFICULTY_EASY
        ? 'Hint Disabled'
        : '[2] Hint';

  const libraryOpacity = difficulty == DIFFICULTY_HARD ? 'opacity-100' : 'opacity-50'
  const libraryToolTip = difficulty == DIFFICULTY_HARD ? 'Library Disabled' : '[1] Library'
  const libraryColor = difficulty == DIFFICULTY_HARD ? '' : 'info'

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    isLibraryPressed.current = isLibraryModalOpen
  }, [isLibraryModalOpen])

  useEffect(() => {
    isHintPressed.current = isHintClicked
  }, [isHintClicked])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsStopwatchRunning(false);
      } else if (isGameStartedRef.current) {
        setIsStopwatchRunning(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setUserTableData();
  }, [selectedTable])

  // ------------------------------- FUNCTIONS --------------------------------------------------  

  function displayInputBorderFadeOutTimer() {
    setValueDisplayInputBorder(true);

    if (borderTimeoutRef.current) {
      clearTimeout(borderTimeoutRef.current);
    }

    borderTimeoutRef.current = setTimeout(() => {
      setValueDisplayInputBorder(false);
      borderTimeoutRef.current = null;
    }, 1500);
  }

  function restartTab_1() {
    isGameStartedRef.current = false;
    setIsStopwatchRunning(false);
    setIsRestartToggled(true);
    setIsHintClicked(false);
    setInputValue('')
  }

  function temporarilyClearTrackerTableRows() {
    setTrackerTableRows([]);

    setTimeout(() => {
      setTrackerTableRows(historyTableData);
    }, 3000);
  }

  function setUserTableData() {
    if (selectedTable == SIDE_BAR_LEFT_LAP_TABLE) {
      setTableData(lapHistoryData);
      setTableHeaders(SIDE_BAR_LEFT_LAP_HEADERS);
    }
    else if (selectedTable == SIDE_BAR_LEFT_STREAK_TABLE) {
      setTableData(streakHistoryData);
      setTableHeaders(SIDE_BAR_LEFT_STREAK_HEADERS);
    }
  }

  // ------------------------- HANDLE FUNCTIONS --------------------------------------------------  

  // ------------------------- DIFFICULTY --------------------------------------------------------

  const onChangeDifficulty = (e) => {
    const value = e.target.value;

    if (value == -1) {
      setDifficultyDisplay(-1);
      setDifficulty(0);
      return;
    }

    setDifficulty(value)
    setDifficultyDisplay(value);
  }

  // ------------------------- PLAYER ------------------------------------------------------------

  const playerOnChange = (event, newValue) => {
    if (newValue.username === ADD_NEW_PLAYER) {
      setIsAddPlayerModalOpen(true);
      return;
    }
    setSelectedUser(newValue);
  }

  const closeAddNewPlayerModal = () => {
    setIsAddPlayerModalOpen(false);
  }

  // ------------------------- COUNT --------------------------------------------------------------

  // ------------------------- MAIN TEXT ----------------------------------------------------------

  // ------------------------- INPUT BOX ----------------------------------------------------------

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!/^[a-zA-Z]*$/.test(value)) {
      return;
    }

    setIsHintClicked(false);
    setInputValue(value);
  };

  const handleKeyDown = (e) => {
    // LIBRARY AND HINT BUTTON HOTKEY
    if (e.key == '1' && !isLibraryPressed.current) {
      onLibraryClickLocal();
    }
    else if (e.key == '2' && !isHintPressed.current && !isLibraryPressed.current) {
      hintButtonRef.current.click();
    }
    else if (e.key == '3') {
      openRestartYesNoModal();
    }
  }

  const handleOnEnter = () => {

    const value = inputValue.trim();
    const character = HIRAKANA_ARRAY[23];
    let isCorrect = false;

    if (value && value.toLowerCase() === character[1].toLowerCase()) {
      isCorrect = true;
    }

    setIsHintClicked(false);
    displayInputBorderFadeOutTimer();
    setIsCorrect(isCorrect)

    isGameStartedRef.current = true;
    setIsStopwatchRunning(true);
    setIsRestartToggled(false);
  }

  // ------------------------- LIBRARY MODAL -------------------------------------------------------

  const onLibraryClickLocal = () => {
    setLibraryModalOpen(true);
  }

  const onLibraryClose = () => {
    setLibraryModalOpen(false);

    setTimeout(() => {
      inputRef.current.focus();
    }, 10);
  }

  // ------------------------- HINT BUTTON ----------------------------------------------------------

  const onHintClickLocal = () => {
    const romaji = HIRAKANA_ARRAY[23][1];
    const firstLetter = romaji[0];

    setInputValue(firstLetter);
    setIsHintClicked(true);
    inputRef.current.focus();
  }

  // ------------------------- RESTART MODAL --------------------------------------------------------

  const openRestartYesNoModal = () => {
    setRestartModalOpen(true);
  }

  const closeRestartYesNoModal = () => {
    setRestartModalOpen(false);
  }

  const handleRestartOnYesClick = () => {
    stopwatchStartTimeRef.current = 0;
    stopwatchElapsedTimeRef.current = 0;

    temporarilyClearTrackerTableRows();

    restartTab_1();
    closeRestartYesNoModal();
  }

  // ------------------------- RECORDS TABLE --------------------------------------------------------

  const handleOnSwitchTables = () => {
    setSelectedTable(!selectedTable)
  }

  return (
    <div className="d-flex app-bar-margin">

      {/* MODALS */}
      <AddnewPlayerModal isModalOpen={isAddPlayerModalOpen} handleYesOnClick={closeAddNewPlayerModal} handleNoOnClick={closeAddNewPlayerModal} />
      <LibraryModal isModalOpen={isLibraryModalOpen} handleNoOnClick={onLibraryClose} />
      <YesNoModal title='Reset ?' isModalOpen={isRestartModalOpen} handleYesOnClick={handleRestartOnYesClick} handleNoOnClick={closeRestartYesNoModal} />

      <Container maxWidth="lg">
        <h1 className="mt-5 fw-bold">Game Mechanics</h1>
        <h2 className="mt-5 fw-bold">Hirakana</h2>
        <p className="text-justify px-1 pt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum consectetur mauris, vel imperdiet justo nisl nec metus. Aenean ut sapien eget felis tristique lacinia. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in neque nec elit malesuada sodales nec ac eros. Duis ac semper nunc. Phasellus non lacus fringilla, egestas ligula non, efficitur ipsum.
        </p>

        {/* 1. Selecting a difficulty */}
        <div className="d-flex flex-column px-1 pb-3" style={{ maxWidth: 500 }}>
          <h4 className="pt-4">1. Selecting a difficulty</h4>
          <span className="opacity-50 ps-2 pb-1 pt-1">Difficulty</span>
          <Select
            style={{ minWidth: '10rem', maxHeight: '57px', minHeight: '57px' }}
            value={difficulty}
            onChange={(e) => onChangeDifficulty(e)}
          >
            <MenuItem value={-1} className="opacity-50">Select Difficulty</MenuItem>
            <MenuItem value={0}>Easy</MenuItem>
            <MenuItem value={1}>Medium</MenuItem>
            <MenuItem value={2}>Hard</MenuItem>
          </Select>
        </div>

        {/* DIFFICULTY DEFINITION */}
        <div className="d-flex flex-column flex-lg-row" style={{ minHeight: 180 }}>
          {/* EASY */}
          <div className={`${difficultyDisplay == -1 || difficultyDisplay == 0 ? 'd-block' : 'd-none'}`}>
            <h5 className="ps-1 pt-2 m-0 fw-bolder text-success">Easy</h5>
            <p className="text-justify px-1 pt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
            </p>
          </div>

          {/* MEDIUM */}
          <div className={`${difficultyDisplay == -1 || difficultyDisplay == 1 ? 'd-block' : 'd-none'}`}>
            <h5 className="ps-1 pt-2 m-0 fw-bolder text-warning">Medium</h5>
            <p className="text-justify px-1 pt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
            </p>
          </div>

          {/* HARD */}
          <div className={`${difficultyDisplay == -1 || difficultyDisplay == 2 ? 'd-block' : 'd-none'}`}>
            <h5 className="ps-1 pt-2 m-0 fw-bolder text-danger">Hard</h5>
            <p className="text-justify px-1 pt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
            </p>
          </div>
        </div>

        {/* 2. Adding a Player */}
        <div>
          <h4 className="pt-4">2. Adding a Player  </h4>
          <div className="d-flex flex-row align-items-center px-1" style={{ maxWidth: 500 }}>
            <div className="pt-3 pe-3">
              <Avatar
                {...stringAvatar(selectedUser?.username || 'NP')}
              />
            </div>
            <div className="col d-flex flex-fill pt-4">
              <Autocomplete
                value={selectedUser}
                onChange={playerOnChange}
                fullWidth
                {...defaultProps}
                id="disable-clearable"
                disableClearable
                renderInput={(params) => (
                  <TextField {...params} label="" variant="standard" />
                )}
              />
            </div>
          </div>
          <p className="text-justify px-1 pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 3. Total Characters Answered */}
        <div>
          <h4 className="pt-4">3. Total Characters Answered</h4>
          <div className='col flex-fill d-flex pt-3 ps-5' style={{ maxWidth: 500 }}>
            <p className="m-0 opacity-50 fs-5">
              {1} / {HIRAKANA_ARRAY.length}
            </p>
          </div>
          <p className="text-justify px-1 pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 4. Text Character Display */}
        <div>
          <h4 className="pt-4">4. Text Character Display</h4>
          <div className='col flex-fill d-flex' style={{ maxWidth: 500, lineHeight: 1 }}>
            <span className='col fw-bold' style={{ fontSize: '11em' }}>
              {HIRAKANA_ARRAY[23][0]}
            </span>
          </div>
          <p className="text-justify px-1 pt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 5. Text Input Box */}
        <div>
          <h4 className="pt-4">5. Text Input Box</h4>
          <div style={{ maxWidth: 500 }}>
            <div className='col flex-fill d-flex align-items-center px-4 pb-3 pt-5 position-relative'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOnEnter();
                }}
                className="position-relative">
                <Tooltip className="position-absolute p-0" style={{ top: '-1.9rem', left: '0.3rem', zIndex: 5 }} title={libraryToolTip} placement='right-start'>
                  <span>
                    <IconButton className="p-0" onClick={onLibraryClickLocal} disabled={difficulty == DIFFICULTY_HARD}>
                      <MenuBookIcon className={libraryOpacity} color={libraryColor} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip className="position-absolute p-0" style={{ top: '-1.9rem', right: '0.3rem', zIndex: 5 }} title={hintToolTip} placement='right-start'>
                  <span>
                    <IconButton ref={hintButtonRef} className="p-0" onClick={onHintClickLocal} disabled={isHintClicked || difficulty != DIFFICULTY_EASY}>
                      <EmojiObjectsIcon className={hintOpacity} color={hintColor} />
                    </IconButton>
                  </span>
                </Tooltip>
                <input
                  ref={inputRef}
                  className='w-100'
                  type="text"
                  placeholder="入力してください"
                  onChange={handleInputChange}
                  value={inputValue}
                  style={{
                    textAlign: 'center',
                    height: '80px',
                    fontSize: '2rem',
                    border: '2px solid black',
                    borderRadius: '7px',
                    boxShadow: displayInputBorder
                      ? isCorrect
                        ? 'inset 0 0 0 15px green'
                        : 'inset 0 0 0 15px red'
                      : 'none'
                  }}
                />
                <div className="d-flex justify-content-center pt-2">
                  <p className="m-0 ps-3 text-muted">
                    Press <kbd className="bg-light px-2 py-1 border rounded text-black fw-bold fs-6">ENTER</kbd> to submit.
                  </p>
                </div>
              </form>
            </div>
          </div>
          <p className="text-justify px-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 6. Library Helper */}
        <div>
          <h4 className="pt-4">6. Library Helper</h4>
          <div className="d-flex flex-row align-items-center">
            <Tooltip className="" style={{ top: '-1.9rem', left: '0.3rem', zIndex: 5 }} title={libraryToolTip} placement='right-start'>
              <span className="ps-4">
                <IconButton className="p-0 ps-1" onClick={onLibraryClickLocal} disabled={difficulty == DIFFICULTY_HARD}>
                  <MenuBookIcon className={libraryOpacity} color={libraryColor} style={{ height: '5em', width: '5em' }} />
                </IconButton>
              </span>
            </Tooltip>
            <p className="m-0 ps-3 text-muted">
              Press <kbd className="bg-light px-2 py-1 border rounded text-black fw-bold fs-6">1</kbd> to open library.
            </p>
          </div>
          <p className="text-justify px-1 pt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 7. Hint Helper */}
        <div>
          <h4 className="pt-4">7. Hint Helper</h4>
          <div className="d-flex flex-row align-items-center">
            <Tooltip className="" style={{ top: '-1.9rem', left: '0.3rem', zIndex: 5 }} title={libraryToolTip} placement='right-start'>
              <span className="p-0 ps-4">
                <IconButton ref={hintButtonRef} className="p-0 ps-1" onClick={onHintClickLocal} disabled={isHintClicked || difficulty != DIFFICULTY_EASY}>
                  <EmojiObjectsIcon className={hintOpacity} color={hintColor} style={{ height: '5em', width: '5em' }} />
                </IconButton>
              </span>
            </Tooltip>
            <p className="m-0 ps-3 text-muted">
              Press <kbd className="bg-light px-2 py-1 border rounded text-black fw-bold fs-6">2</kbd> to use hint.
            </p>
          </div>
          <p className="text-justify px-1 pt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 8. Stopwatch */}
        <div>
          <h4 className="pt-4">8. Stopwatch</h4>
          <div className="d-flex flex-column ps-4" style={{ maxWidth: 500 }}>
            <Stopwatch
              startTimeRef={stopwatchStartTimeRef}
              elapsedRef={stopwatchElapsedTimeRef}
              isRunning={isStopwatchRunning}
              setIsRunning={setIsStopwatchRunning}
              reset={restartToggled}
              paddingY=""
              justify=""
            />
            <div className="d-flex ps-5">
              <p className="m-0 ps-3 text-muted">
                <kbd className="bg-light px-2 py-1 border rounded text-black fw-bold fs-6">TAP</kbd> to {isStopwatchRunning ? 'Pause' : 'Resume'}.
              </p>
            </div>
          </div>
          <p className="text-justify px-1 pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 9. History Tracker */}
        <dv>
          <h4 className="pt-4">9. History Tracker</h4>
          <div className="px-2" style={{ maxWidth: 500 }}>
            <MainSidebarRight
              rows={trackerTableRows}
              openRestartYesNoModal={openRestartYesNoModal}
              isRestartModalOpen={isRestartModalOpen}
              handleRestartOnYesClick={handleRestartOnYesClick}
              closeRestartYesNoModal={closeRestartYesNoModal}
              paddingTop="pt-2"
              paddingBottom=""
              historyTableOverflowY="overflow-y-scroll"
              historyTableMinHeight="260px"
            />
          </div>
          <p className="text-justify px-1 pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </dv>

        {/* 10. Restart Game */}
        <div>
          <h4 className="pt-4">10. Restart Game</h4>
          <div className="d-flex flex-row align-items-center">
            <Tooltip className='' title='Restart' placement='left-start'>
              <span className="p-0 ps-4">
                <IconButton onClick={openRestartYesNoModal} className="p-0">
                  <ReplayIcon color="primary" className="opacity-75 me-lg-2" style={{ height: '5em', width: '5em' }} />
                </IconButton>
              </span>
            </Tooltip>
            <p className="m-0 ps-3 text-muted">
              Press <kbd className="bg-light px-2 py-1 border rounded text-black fw-bold fs-6">3</kbd> to use hint.
            </p>
          </div>
          <p className="text-justify px-1 pt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </div>

        {/* 11. Records Table */}
        <dv>
          <h4 className="pt-4">11. Records Table</h4>
          <div className="px-2" style={{ maxWidth: 500 }}>
            <HistoryTable
              tableHeaders={tableHeaders}
              tableData={tableData}
              height={260}
              handleOnSwitchTables={handleOnSwitchTables}
            />
          </div>
          <p className="text-justify px-1 pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent facilisis, orci at malesuada viverra, neque turpis ultricies justo, sit amet scelerisque eros nisl id justo. Curabitur lacinia, nisl eu pretium tincidunt, magna ipsum.
          </p>
        </dv>

      </Container >
    </div >
  );
}

const players = [
  { username: "New Player" },
  { username: "Alyssa" },
  { username: "Pablo" },
  { username: "Juan" },
  { username: "Patico" },
]

const defaultProps = {
  options: players,
  getOptionLabel: (option) => option.username,
};

const historyTableData = [
  CREATE_HISTORY_TABLE_DATA(true, 'ね', 'ne'),
  CREATE_HISTORY_TABLE_DATA(false, 'こ', 'ko'),
  CREATE_HISTORY_TABLE_DATA(true, 'ネ', 'ne'),
  CREATE_HISTORY_TABLE_DATA(false, 'コ', 'ko'),
];

const streakHistoryData = [
  { streak: 9, date: 'March 20, 8:26 PM' },
  { streak: 1, date: 'June 4, 11:17 AM' },
  { streak: 2, date: 'July 19, 12:30 AM' },
  { streak: 6, date: 'August 2, 6:31 PM' },
  { streak: 4, date: 'Septemper 12, 7:40 PM' },
];

const lapHistoryData = [
  { lap: '03:03:61', date: 'March 20, 8:26 PM' },
  { lap: '05:27:39', date: 'June 4, 11:17 AM' },
  { lap: '08:11:78', date: 'July 19, 12:30 AM' },
  { lap: '12:49:22', date: 'August 2, 6:31 PM' },
  { lap: '23:43:34', date: 'Septemper 12, 7:40 PM' },
];
