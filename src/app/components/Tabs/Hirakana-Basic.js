import { IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import { MainSidebarRight } from "../main/sidebar-right";
import { MainSidebarLeft } from "../main/sidebar-left";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryModal from "../modal/LibraryModal";
import { useEffect, useRef, useState } from "react";
import { DIFFICULTY_EASY, DIFFICULTY_HARD } from "@/app/constants";

export const HirakanaBasic = ({
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
    handleInputChange = () => { console.error('handleInputChange is not set') },
    handleOnEnter = () => { console.error('handleOnEnter is not set') },
    handleOnHintClick = () => { console.error('handleOnHintClick is not set') },
    difficulty = 0,
    isDifficultyDisabled = false,
    onDifficultyChange = () => { console.error('onDifficultyChange is not set') },

    // RIGHT
    openRestartYesNoModal,
    isRestartModalOpen,
    handleRestartOnYesClick,
    closeRestartYesNoModal,
    isHintClicked = false,

}) => {

    const inputRef = useRef();

    const hintOpacity = isHintClicked
        || difficulty != DIFFICULTY_EASY
        || isGameEnded 
        ? 'opacity-100' : 'opacity-50';

    const hintColor = isHintClicked
        || difficulty != DIFFICULTY_EASY
        || isGameEnded
        ? '' : 'warning';

    const hintToolTip =
        isHintClicked
            ? 'Hint Used'
            : difficulty !== DIFFICULTY_EASY
                ? 'Hint Disabled'
                : 'Hint';

    const libraryOpacity = difficulty == DIFFICULTY_HARD ? 'opacity-100' : 'opacity-50'
    const libraryToolTip = difficulty == DIFFICULTY_HARD ? 'Library Disabled' : 'Library'
    const libraryColor = difficulty == DIFFICULTY_HARD ? '' : 'info'

    const [isLibraryModalOpen, setLibraryModalOpen] = useState(false);

    // AUTO FOCUS TO INPUT BOX WHEN CHANGING TABS
    useEffect(() => {

        inputRef.current.focus();
        const handleVisibilityChange = () => {
            if (document.hidden) {
                inputRef.current.focus();
            } else {
                inputRef.current.focus();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const onHintClickLocal = () => {
        handleOnHintClick();
        inputRef.current.focus();
    }

    const onLibraryClickLocal = () => {
        setLibraryModalOpen(true);
    }

    const onLibraryClose = () => {
        setLibraryModalOpen(false);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 10);
    }

    return (

        <div className='d-flex flex-grow-1'>

            {/* MODALS */}
            <LibraryModal isModalOpen={isLibraryModalOpen} handleNoOnClick={onLibraryClose} />

            <div className='d-flex flex-fill flex-column flex-xl-row px-3 px-xl-5'>

                {/* LEFT SIDE  */}
                <div className="col d-flex order-3 order-xl-1 pt-4">
                    <MainSidebarLeft
                        stopwatchStartTimeRef={stopwatchStartTimeRef}
                        stopwatchElapsedTimeRef={stopwatchElapsedTimeRef}
                        isStopwatchRunning={isStopwatchRunning}
                        setIsStopwatchRunning={setIsStopwatchRunning}
                        restartToggled={restartToggled}
                        isGameEnded={isGameEnded}
                    />
                </div>

                {/* CENTER */}
                <div className='col order-1 order-xl-2 d-flex flex-column pb-xl-4 pb-xxl-2 pt-4'>
                    {/* DIFFICULTY */}
                    <div className="d-flex flex-column px-4">
                        <span className="opacity-50 ps-2 pb-1 pt-1">Difficulty</span>
                        <Select
                            style={{ minWidth: '10rem', maxHeight: '57px', minHeight: '57px' }}
                            disabled={isDifficultyDisabled}
                            fullWidth
                            value={difficulty}
                            onChange={onDifficultyChange}
                        >
                            <MenuItem value={0}>Easy</MenuItem>
                            <MenuItem value={1}>Medium</MenuItem>
                            <MenuItem value={2}>Hard</MenuItem>
                        </Select>
                    </div>
                    {/* SCORE */}
                    <div className='col flex-fill d-flex pt-4 justify-content-center'>
                        <p className="m-0 opacity-25 fs-5 pt-xl-2">
                            {tracker.size < 1 ? 1 : tracker.size} / {hirakanaArray.length}
                        </p>
                    </div>
                    {/* TEXT */}
                    <div className='col flex-fill d-flex justify-content-center align-items-center flex-column'>
                        <span className='col fw-bold text-center' style={{ fontSize: '11em' }}>
                            {selectedCharacter != null ? hirakanaArray[selectedCharacter][0] : '. . .'}
                        </span>
                    </div>
                    {/* INPUT */}
                    <div className='col flex-fill d-flex justify-content-center align-items-center px-4 pb-3position-relative'>
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
                                    <IconButton className="p-0" onClick={onHintClickLocal} disabled={isHintClicked || difficulty != DIFFICULTY_EASY || isGameEnded}>
                                        <EmojiObjectsIcon className={hintOpacity} color={hintColor} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <input
                                onClick={() => console.log('boxclicl')}
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
                                    border: displayInputBorder ? isCorrect ? '15px solid green' : '15px solid red' : '',
                                    borderRadius: '7px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </form>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col order-2 order-xl-3 d-flex">
                    <MainSidebarRight
                        rows={rows}
                        openRestartYesNoModal={openRestartYesNoModal}
                        isRestartModalOpen={isRestartModalOpen}
                        handleRestartOnYesClick={handleRestartOnYesClick}
                        closeRestartYesNoModal={closeRestartYesNoModal}
                    />
                </div>

            </div>
        </div >
    );
}