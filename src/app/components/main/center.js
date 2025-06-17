import { IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useEffect, useRef, useState } from "react";
import { DIFFICULTY_EASY, DIFFICULTY_HARD } from "@/app/constants";
import LibraryModal from "../modal/LibraryModal";

export const CenterContent = ({
    isDifficultyDisabled = true,
    difficulty = 0,
    onDifficultyChange = () => console.error("onDifficultyChange is not set"),
    tracker = new Set(),
    selectedCharacter = null,
    hirakanaArray = [],
    handleOnEnter = () => console.error("handleOnEnter is not set"),
    isHintClicked = false,
    isGameEnded = true,
    inputRef = null,
    handleInputChange = () => console.error("handleInputChange is not set"),
    inputValue = '',
    displayInputBorder = false,
    isCorrect = false,
    handleOnHintClick = () => console.error("handleOnHintClick is not set"),

}) => {

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
                : '[2] Hint';

    const libraryOpacity = difficulty == DIFFICULTY_HARD ? 'opacity-100' : 'opacity-50'
    const libraryToolTip = difficulty == DIFFICULTY_HARD ? 'Library Disabled' : '[1] Library'
    const libraryColor = difficulty == DIFFICULTY_HARD ? '' : 'info'

    const [isLibraryModalOpen, setLibraryModalOpen] = useState(false);
    const isLibraryPressed = useRef(false);
    const isHintPressed = useRef(false);
    const hintButtonRef = useRef(null);

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

    // ------------------------- HANDLE FUNCTIONS --------------------------------------------------  

    const handleKeyDown = (e) => {
        // LIBRARY AND HINT BUTTON HOTKEY
        if (e.key == '1' && !isLibraryPressed.current) {
            onLibraryClickLocal();
        }
        else if (e.key == '2' && !isHintPressed.current && !isLibraryPressed.current) {
            hintButtonRef.current.click();
        }
    }

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
            inputRef.current.focus();
        }, 10);
    }

    return (
        <div className='col order-1 order-xl-2 d-flex flex-column pb-xl-4 pb-xxl-2 pt-4'>

            {/* MODALS */}
            <LibraryModal isModalOpen={isLibraryModalOpen} handleNoOnClick={onLibraryClose} />

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
            {/* COUNT */}
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
                            <IconButton ref={hintButtonRef} className="p-0" onClick={onHintClickLocal} disabled={isHintClicked || difficulty != DIFFICULTY_EASY || isGameEnded}>
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
                </form>
            </div>

        </div>
    );
}